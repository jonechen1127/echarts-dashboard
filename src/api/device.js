import $axios from '../axios/$axios';
// 查询账号列表
export const getDeviceList = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/cloud/device/getDeviceList', params).then(resolve).catch(reject);
  });
};
// 可用设备列表
export const getAvailableDeviceList = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/cloud/device/getAvailableDeviceList', params).then(resolve).catch(reject);
  });
};
export const enableDevice = params => {
  return new Promise((resolve, reject) => {
    $axios.post('/outapi/cloud/device/enableDevice', params).then(resolve).catch(reject);
  });
};
export const disableDevice = params => {
  return new Promise((resolve, reject) => {
    $axios.post('/outapi/cloud/device/disableDevice', params).then(resolve).catch(reject);
  });
};
export const enableAll = params => {
  return new Promise((resolve, reject) => {
    $axios.post('/outapi/cloud/device/enableAll', params).then(resolve).catch(reject);
  });
};
export const disableAll = params => {
  return new Promise((resolve, reject) => {
    $axios.post('/outapi/cloud/device/disableAll', params).then(resolve).catch(reject);
  });
};
export const cpmConfig = params => {
  return new Promise((resolve, reject) => {
    $axios.post('/outapi/cloud/device/cpmConfig', params).then(resolve).catch(reject);
  });
};
export const deleteDevice = params => {
  return new Promise((resolve, reject) => {
    $axios.post('/outapi/cloud/device/delete', params).then(resolve).catch(reject);
  });
};
export const exportDevice = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/cloud/device/export', params).then(resolve).catch(reject);
  });
};

