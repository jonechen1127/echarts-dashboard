import axios from 'axios';
import Cookies from 'js-cookie';
import router from '../router/index';
// 创建axios实例
const $axios = axios.create({
  timeout: 30000,
  // 允许跨域带token
  withCredentials: true,
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});
// 设置缓存时间 和缓存请求数组
var requestUrl = [],
  saveTime = 1000;
// request拦截器
$axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).token;
    if (token) {
      if (config.method === 'post') {
        config.data = Object.assign({}, config.data, { token });
        let nowTime = new Date().getTime();
        requestUrl = requestUrl.filter(item => {
          return item.setTime + saveTime > nowTime;
        });
        let sessionUrl = requestUrl.filter(item => {
          return item.url === config.url;
        });
        if (sessionUrl.length > 0) {
          // console.log(config.url + '请求重复 中断请求!');
          return;
        }
        let item = { url: config.url, setTime: new Date().getTime() };
        requestUrl.push(item);
      } else if (config.method === 'get') {
        config.params = Object.assign({}, config.params, { token });
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response拦截器
$axios.interceptors.response.use(
  response => {
    if (response.data.code === '403') {
      // 401, token失效
      localStorage.removeItem('userInfo');
      Cookies.remove('token');
      router.push('/login');
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default $axios;
