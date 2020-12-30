import $axios from '../axios/$axios';
// 用户注册
export const userRegister = params => {
  return new Promise((resolve, reject) => {
    $axios.post('/outapi/ncov/pass/web/register', params).then(resolve).catch(reject);
  });
};
// 创建通行证
export const addPass = params => {
  return new Promise((resolve, reject) => {
    $axios.post('/outapi/ncov/pass/h5/web/addPass', params).then(resolve).catch(reject);
  });
};
