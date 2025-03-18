import axios from "axios";
import url from "@/http/url";

const { baseURL1 } = url;
const instance = axios.create({
  baseURL: `${baseURL1}`,
  // baseURL: `/tts`,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对普通响应内容不做处理
    return response.data;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default instance;
