// 1. websocket连接：判断浏览器是否兼容，获取websocket url并连接，这里为了方便本地生成websocket url
// 2. 连接websocket，向websocket发送数据，实时接收websocket返回数据
// 3. 处理websocket返回数据为浏览器可以播放的音频数据
// 4. 播放音频数据
// ps: 该示例用到了es6中的一些语法，建议在chrome下运行

//APPID，APISecret，APIKey在控制台-我的应用-语音合成（流式版）页面获取

const APPID = "84873a5d";
const API_SECRET = "MjE0ZDU4MDVjMjA5NmEwODg5NzZlZmFm";
const API_KEY = "decb8c9b34bf0710d0a8b79eeeb77edd";

import CryptoJS from "crypto-js";
import { Base64 } from "js-base64";

let base64url = [];
let completeBase64 = "";
let isrun = false;

const transWorker = new Worker(
  new URL("./transcode.worker.js", import.meta.url)
);

function getWebsocketUrl() {
  return new Promise((resolve, reject) => {
    var apiKey = API_KEY;
    var apiSecret = API_SECRET;
    var url = "wss://tts-api.xfyun.cn/v2/tts";
    var host = "tts-api.xfyun.cn";
    var date = new Date().toGMTString();
    var algorithm = "hmac-sha256";
    var headers = "host date request-line";
    var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/tts HTTP/1.1`;
    var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
    var signature = CryptoJS.enc.Base64.stringify(signatureSha);
    var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    var authorization = btoa(authorizationOrigin);
    url = `${url}?authorization=${authorization}&date=${encodeURIComponent(date)}&host=${host}`;
    console.log('url', url);

    resolve(url);
  });
}
export default class TTSRecorder {
  constructor({
    speed = 50,
    voice = 50,
    pitch = 50,
    voiceName = "x4_yezi",
    appId = APPID,
    text = "",
    tte = "UTF8",
    defaultText = "请输入您要合成的文本",
  } = {}) {
    this.speed = speed;
    this.voice = voice;
    this.pitch = pitch;
    this.voiceName = voiceName;
    this.text = text;
    this.tte = tte;
    this.defaultText = defaultText;
    this.appId = appId;
    this.audioData = [];
    this.rawAudioData = [];
    this.audioDataOffset = 0;
    this.status = "init";
    transWorker.onmessage = (e) => {
      this.audioData.push(...e.data.data);
      this.rawAudioData.push(...e.data.rawAudioData);
    };
  }
  // 修改录音听写状态
  setStatus(status) {
    this.onWillStatusChange && this.onWillStatusChange(this.status, status);
    this.status = status;
  }
  // 设置合成相关参数
  setParams({ speed, voice, pitch, text, voiceName, tte }) {
    speed !== undefined && (this.speed = speed);
    voice !== undefined && (this.voice = voice);
    pitch !== undefined && (this.pitch = pitch);
    text && (this.text = text);
    tte && (this.tte = tte);
    voiceName && (this.voiceName = voiceName);
    this.resetAudio();
  }
  // 连接websocket
  connectWebSocket() {
    // this.setStatus("ttsing");
    console.log("isrun>>>>>>>>>>", isrun);

    return getWebsocketUrl().then((url) => {
      let ttsWS;
      if (isrun === false) { }

      console.log("链接websocket");
      if ("WebSocket" in window) {
        console.log("11111");

        ttsWS = new WebSocket(url);
      } else if ("MozWebSocket" in window) {
        console.log("22222");

        ttsWS = new MozWebSocket(url);
      } else {
        alert("浏览器不支持WebSocket");
        return;
      }

      console.log("ttsWS", ttsWS);

      this.ttsWS = ttsWS;
      ttsWS.onopen = (e) => {
        console.log('onopen', e);

        this.playTimeout = setTimeout(() => {
          this.webSocketSend();
          // this.audioPlay();
        }, 1000);
      };
      ttsWS.onmessage = (e) => {
        console.log('onmessage', e);
        this.result(e.data);
      };
      ttsWS.onerror = (e) => {
        console.log('onerror', e);

        clearTimeout(this.playTimeout);
        this.setStatus("errorTTS");
        // alert('WebSocket报错，请f12查看详情')
        // console.error("WebSocket报错，请f12查看详情");
        // console.error(
        //   `详情查看：${encodeURI(url.replace("wss:", "https:"))}`
        // );
      };
      ttsWS.onclose = (e) => {
        console.log('onclose', e);
        // Websocket closed，重新请求
        if(e.code == '1000'){
          this.connectWebSocket()
        }
      };
    });
  }
  // 处理音频数据
  transToAudioData(audioData) { }
  // websocket发送数据
  webSocketSend() {
    isrun = true;
    var params = {
      common: {
        app_id: this.appId, // APPID
      },
      business: {
        aue: "lame",
        sfl: 0,
        auf: "audio/L16;rate=16000",
        vcn: "x4_xiaoyuan",
        speed: 50,
        volume: 50,
        pitch: 50,
        bgs: 0,
        tte: "UTF8",
      },
      data: {
        status: 2,
        text: this.encodeText(this.text, ""),
      },
    };
    console.log("send", JSON.stringify(params));
    this.ttsWS.send(JSON.stringify(params));
  }
  encodeText(text, encoding) {
    switch (encoding) {
      case "utf16le": {
        let buf = new ArrayBuffer(text.length * 4);
        let bufView = new Uint16Array(buf);
        for (let i = 0, strlen = text.length; i < strlen; i++) {
          bufView[i] = text.charCodeAt(i);
        }
        return buf;
      }
      case "buffer2Base64": {
        let binary = "";
        let bytes = new Uint8Array(text);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }
      case "base64&utf16le": {
        return this.encodeText(
          this.encodeText(text, "utf16le"),
          "buffer2Base64"
        );
      }
      default: {
        return Base64.encode(text);
        // const encoder = new TextEncoder();
        // const bytes = encoder.encode(text);
        // return btoa(String.fromCharCode.apply(null, bytes));
      }
    }
  }
  // websocket接收数据的处理
  result(resultData) {
    let jsonData = JSON.parse(resultData);
    console.log("合成", jsonData);
    // 合成失败
    if (jsonData.code !== 0) {
      // alert(`合成失败: ${jsonData.code}:${jsonData.message}`);
      console.error(`${jsonData.code}:${jsonData.message}`);
      this.resetAudio();
      return;
    }

    // if (jsonData.data && jsonData.data.audio) {
    //   base64url.push(jsonData.data.audio);
    // }

    transWorker.postMessage({
      type: "base64",
      data: jsonData.data.audio,
    });

    if (jsonData.code === 0 && jsonData.data.status === 2) {
      completeBase64 = jsonData.data.audio;
      isrun = false;
      // console.log("ttsRecorder.base64url", completeBase64);
      this.ttsWS.close();
    } else {
      // isrun = false;
    }
  }
  // 重置音频数据
  resetAudio() {
    this.audioStop();
    this.setStatus("init");
    this.audioDataOffset = 0;
    this.audioData = [];
    this.rawAudioData = [];
    this.ttsWS && this.ttsWS.close();
    clearTimeout(this.playTimeout);
  }
  // 音频初始化
  audioInit() {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      this.audioContext = new AudioContext();
      this.audioContext.resume();
      this.audioDataOffset = 0;
    }
  }

  // 音频播放
  audioPlay() {
    this.setStatus("play");
    let audioData = this.audioData.slice(this.audioDataOffset);

    this.audioDataOffset += audioData.length;
    let audioBuffer = this.audioContext.createBuffer(
      1,
      audioData.length,
      22050
    );
    let nowBuffering = audioBuffer.getChannelData(0);
    if (audioBuffer.copyToChannel) {
      audioBuffer.copyToChannel(new Float32Array(audioData), 0, 0);
    } else {
      for (let i = 0; i < audioData.length; i++) {
        nowBuffering[i] = audioData[i];
      }
    }

    let bufferSource = (this.bufferSource =
      this.audioContext.createBufferSource());
    bufferSource.buffer = audioBuffer;
    bufferSource.connect(this.audioContext.destination);
    this.audioContext.createMediaStreamDestination();
    // bufferSource.start();
    bufferSource.onended = (event) => {
      if (this.status !== "play") {
        return;
      }
      if (this.audioDataOffset < this.audioData.length) {
        // this.audioPlay();
      } else {
        // this.audioStop();
      }
    };
  }

  IsRuns() {
    return isrun;
  }
  SetRuns() {
    isrun = false;
  }

  //清空Base64
  setbasefile() {
    completeBase64 = "";
    return completeBase64;
  }
  //返回Base64
  basefile() {
    // console.log('completeBase64', completeBase64)
    return completeBase64;
  }
  // 音频播放结束
  audioStop() {
    this.setStatus("endPlay");
    console.log('playTimeout', this.playTimeout)
    clearTimeout(this.playTimeout);
    this.audioDataOffset = 0;
    console.log('bufferSource', this.bufferSource)

    if (this.bufferSource) {
      try {
        this.bufferSource.stop();
      } catch (e) {
        console.log(e);
      }
    }
  }
  start() {
    // console.log("start", this.audioData);
    // if (this.audioData.length) {
    //   this.audioPlay();
    // } else {
    //   if (!this.audioContext) {
    //     this.audioInit();
    //   }
    //   if (!this.audioContext) {
    //     alert("该浏览器不支持webAudioApi相关接口");
    //     return;
    //   }
    //   this.connectWebSocket();
    // }
    this.connectWebSocket();
  }
  stop() {
    this.audioStop();
  }
}
