<template>
  <button @click="play">播放</button>
  {{ audiourl }}
  <audio
    controls="controls"
    ref="audioElement"
    controlsList="nodownload noplaybackrate"
  >
    <source :src="audiourl" />
  </audio>
</template>

<script>
import TTSRecorder from "@/utils/TTSRecorder.js";

const ttsRecorder = new TTSRecorder();
export default {
  name: "warning-notice",
  components: {},
  data() {
    return {
      audiourl: "",
    };
  },
  mounted() {
    this.audioPlay();
  },
  methods: {
    // 播放音频
    audioPlay() {
      let text = `事项清单:总览:进行中[n2]84条，已审核未关闭[n2]13条，上昼夜已审核未关闭[n2]0条，关闭事项[n2]0条。目前超期事项[n2]27条，临期事项[n2]0条。部门推进情况:\n战略科技部，超期事项[n2]9条。\n市场经营部，超期事项[n2]8条。\n软件研发产品线，超期事项[n2]4条。\n安环管理部，超期事项[n2]3条。\nIT服务产品线，超期事项两条。\n客户关系部，超期事项[n2]1条。`;
      ttsRecorder.setParams({
        text: text,
      });
      if (["init", "endPlay", "errorTTS"].indexOf(ttsRecorder.status) > -1) {
        ttsRecorder.start();
      } else {
        // ttsRecorder.stop();
      }
    },

    play() {
      if (ttsRecorder.basefile()) {
        console.log("执行结束");
        this.$refs.audioElement.load();
        this.$refs.audioElement.play();
        this.audiourl = `data:audio/mp3;base64,${ttsRecorder.basefile()}`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.danger {
  color: #f56c6c;
}
.warning {
  color: #e6a23c;
}
.primary {
  color: #409eff;
}
.success {
  color: #67c23a;
}
.dialog-content {
  padding: 0 20px;
  transform: translateY(-15px);
  ul {
    li {
      position: relative;
      overflow: hidden;
      padding: 20px 0;
      &::before {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        content: "";
        z-index: 1;
        border-radius: 15px;
        border-bottom: 0.5px solid;
        border-image: linear-gradient(
            -154deg,
            #ffffff 28%,
            rgba(224, 244, 253, 0) 84%
          )
          0.5 0.5;
      }
      &::after {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 2;
        height: 2px;
        content: "";
        width: 10px;
        background: #fff;
        border-radius: 100px;
      }
      p {
        &:first-of-type {
          .left {
            .index {
              font: 400 16px/22px PingFang SC, PingFang SC-5;
              color: #bdc2d0;
            }
            .time {
              font: 400 16px/22px PingFang SC, PingFang SC-5;
              color: #ffffff;
            }
          }
          .right {
            font: 400 14px/20px PingFang SC, PingFang SC-5;
            color: #ffffff;
          }
        }
        &:last-of-type {
          font: 400 12px/17px PingFang SC, PingFang SC-5;
          color: #bdc2d0;
        }
      }
    }
  }
}
</style>
