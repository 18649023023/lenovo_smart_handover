import axios from "axios";
import url from "@/http/url";

const { baseURL } = url;

const instance = axios.create({
  // baseURL: `${baseURL}`,
  baseURL: `/LKApi/`,
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
    console.log("结果", response);
    return response.data;
  },
  (error) => {
    console.error("错误", error);
    return Promise.reject(error);
  }
);

export default instance;
