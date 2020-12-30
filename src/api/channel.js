import $axios from '../axios/$axios';
export const getChannelList = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/cloud/channel/list', params).then(resolve).catch(reject);
  });
};
export const createChannel = params => {
  return new Promise((resolve, reject) => {
    $axios.post('/outapi/cloud/channel/create', params).then(resolve).catch(reject);
  });
};
export const enableChannel = params => {
  return new Promise((resolve, reject) => {
    $axios.post('/outapi/cloud/channel/enable', params).then(resolve).catch(reject);
  });
};
export const disableChannel = params => {
  return new Promise((resolve, reject) => {
    $axios.post('/outapi/cloud/channel/disable', params).then(resolve).catch(reject);
  });
};
export const deleteChannel = params => {
  return new Promise((resolve, reject) => {
    $axios.post('/outapi/cloud/channel/delete', params).then(resolve).catch(reject);
  });
};
export const getNextId = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/cloud/channel/getNextId', params).then(resolve).catch(reject);
  });
};
export const getChannelUnitList = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/cloud/channel/getChannelUnitList', params).then(resolve).catch(reject);
  });
};
export const enableChannelUnit = params => {
  return new Promise((resolve, reject) => {
    $axios.post('/outapi/cloud/channel/enableChannelUnit', params).then(resolve).catch(reject);
  });
};
export const disableChannelUnit = params => {
  return new Promise((resolve, reject) => {
    $axios.post('/outapi/cloud/channel/disableChannelUnit', params).then(resolve).catch(reject);
  });
};
export const enableAllChannelUnit = params => {
  return new Promise((resolve, reject) => {
    $axios.post('/outapi/cloud/channel/enableAllChannelUnit', params).then(resolve).catch(reject);
  });
};
export const disableAllChannelUnit = params => {
  return new Promise((resolve, reject) => {
    $axios.post('/outapi/cloud/channel/disableAllChannelUnit', params).then(resolve).catch(reject);
  });
};
