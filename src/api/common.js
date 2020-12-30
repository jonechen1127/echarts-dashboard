import $axios from '../axios/$axios';
// 登录
export const toLogin = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/common/login/toLogin', params).then(resolve).catch(reject);
  });
};
// 获取验证码
export const getKaptcha = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/common/kaptcha/getKaptcha', params).then(resolve).catch(reject);
  });
};
// 获取验证码
export const toResetPwd = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/common/login/toResetPwd', params).then(resolve).catch(reject);
  });
};
// 重新发送验证码
export const toResetPwdAgain = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/common/login/toResetPwdAgain', params).then(resolve).catch(reject);
  });
};
// 重置密码
export const resetPwd = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/common/login/resetPwd', params).then(resolve).catch(reject);
  });
};
// 查询省
export const getAllProvince = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/common/area/getAllProvince', params).then(resolve).catch(reject);
  });
}
// 查询市
export const getCityByProvinceCode = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/common/area/getCityByProvinceCode', params).then(resolve).catch(reject);
  });
}
// 查询区
export const getTownByCityCode = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/common/area/getTownByCityCode', params).then(resolve).catch(reject);
  });
}
// 查询小区，根据小区
export const getUnitsByTownCode = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/common/area/getUnitsByTownCode', params).then(resolve).catch(reject);
  });
}
// 查询小区，根据市
export const getUnitsByCityCode = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/common/area/getUnitsByCityCode', params).then(resolve).catch(reject);
  });
}
export const getQiniuToken = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/common/qiniu/getQiniuToken', params).then(resolve).catch(reject);
  });
}

