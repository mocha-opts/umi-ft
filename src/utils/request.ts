import axios from "axios";

const service = axios.create({
  baseURL: "/api",
  timeout: 15 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

// http request 拦截器
service.interceptors.request.use(
  (config) => {
        console.log(config);

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // if (error.response) {
    //     switch (error.response.status) {
    //         case 400:
    //         case 401:
    //             break;
    //         case 404:
    //             break;
    //         case 405:
    //             break;
    //         case 500:
    //             break;
    //         default:
    //             ;
    //     }
    // } else {}
    // alert('请求接口失败，请联系管理员');
    return Promise.reject(error); // 返回接口返回的错误信息
  }
);

export default service;
