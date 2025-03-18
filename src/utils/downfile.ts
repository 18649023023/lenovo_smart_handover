import { ElMessage, ElLoading } from "element-plus";
import url from "@/http/url";
const getCookieValue = (cookieName: any) => {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === cookieName) {
      return cookie[1];
    }
  }
  return null;
};
const { baseURL } = url;
const downloadFile = (filePath: any, suffix: any = "", filename: any = "") => {
  const loadingInstance1 = ElLoading.service({
    fullscreen: true,
    text: "下载中...",
  });
  fetch(`${baseURL}/qa-doc${filePath}`, {})
    .then((response) => {
      console.log("blobbbbb", response);

      if (response.status == 200) {
        return response.blob();
      } else {
        ElMessage({
          message: "下载失败，请联系管理员！",
          type: "warning",
        });
      }
    })
    .then((blob) => {
      // 创建一个临时的URL对象
      const url = window.URL.createObjectURL(blob);
      // console.log("下载",url)
      // 创建一个a标签并设置其href属性为临时URL
      const a = document.createElement("a");
      a.href = url;
      // let fileurl = filename?filename+'.'+suffix:url.substring(url.lastIndexOf('/'))+'.'+suffix
      // console.log("filenameaaaa",fileurl)
      // 设置下载的文件名
      // a.download = filePath.substring(filePath.lastIndexOf('/') + 1)+'.cdx';
      a.download = filename
        ? filename + "." + suffix
        : url.substring(url.lastIndexOf("/")) + "." + suffix;

      // 模拟点击a标签进行下载
      a.click();

      // 释放临时URL对象
      window.URL.revokeObjectURL(url);
      loadingInstance1.close();
    })
    .catch((error) => {
      console.error("文件下载失败:", error);
      loadingInstance1.close();
    });
};

// 调用downloadFile函数并传入文件路径
//   downloadFile('http://example.com/path/to/file.pdf');
export default {
  downloadFile,
};
