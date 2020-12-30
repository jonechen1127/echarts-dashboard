import $axios from '../axios/$axios';
export const getMaterialList = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/cloud/material/loadData', params).then(resolve).catch(reject);
  });
};
export const getCertByMaterialId = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/cloud/material/getCertByMaterialId', params).then(resolve).catch(reject);
  });
};
export const getMaterialById = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/cloud/material/getMaterialById', params).then(resolve).catch(reject);
  });
};
export const getAllChecks = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/cloud/material/getAllChecks', params).then(resolve).catch(reject);
  });
};
export const checkMaterialBatch = params => {
  return new Promise((resolve, reject) => {
    $axios.post('/outapi/cloud/material/checkMaterialBatch', params).then(resolve).catch(reject);
  });
};
export const checkMaterial = params => {
  return new Promise((resolve, reject) => {
    $axios.post('/outapi/cloud/material/checkMaterial', params).then(resolve).catch(reject);
  });
};
// 获取下拉渠道
export const getMaterialChannels = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/cloud/stastics/getAllChannels', params).then(resolve).catch(reject);
  });
};
export const getStasticsSummay = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/cloud/stastics/loadStasticsData', params).then(resolve).catch(reject);
  });
};
export const getStasticsSubdivision = params => {
  return new Promise((resolve, reject) => {
    $axios.get('/outapi/cloud/stastics/loadStasticsDetailData', params).then(resolve).catch(reject);
  });
};
