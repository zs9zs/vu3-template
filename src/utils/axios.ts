import axios from "axios";
import { ElMessage } from "element-plus";

// 1、创建axios实例
const instance = axios.create({
  baseURL: "/api",
  timeout: 50000,
});

// 2、请求拦截
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (err) => Promise.reject(err),
);

// 3、响应拦截
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    ElMessage({
      message: err.response.data.message || "服务异常",
      type: "error",
    });
    return Promise.reject(err);
  },
);

export default instance;
