// 地图
import ECharts from 'vue-echarts'
import { getTips } from './tips.js'
import axios from 'axios'

// 获取经纬度
function getLnglatByMap(mapData) {
  let coordinate = {}
  let features = mapData.features || []
  features.forEach(item => {
    coordinate[item.id] = item.properties.cp
  })
  return coordinate
}
// 地图缓存数据
let loadMap = {}
// 获取地图数据
const getMap = (area) => {
  return new Promise((resolve, reject) => {
    if (loadMap[area]) {
      resolve(loadMap[area])
    } else {
      axios.get(process.env.BASE_URL + "mapdata/" + area + ".json").then(response => {
        ECharts.registerMap(area, response.data)
        loadMap[area] = {
          mapData: response.data,
          coordinate: getLnglatByMap(response.data)
        }
        resolve(loadMap[area])
      }).catch((err) => {
        reject(err)
      })
    }
  })
}
// 地图错误提示信息
const getErrorTips = () => {
  return getTips('暂无该区域的地图')
}

/**
  图表名称：散点图地图
  参数说明：
  - area：行政区域编码，示例数据为370000
  - data：地图数据，数据格式为[[{series:'访客车',name:'烟台',value:[121.39,37.52],count:8,unit:'辆'},{series:'访客车',type:0,name:'东营',value:[118.49,37.46],count:16,unit:'辆'}],[{series:'访客',type:1,name:'菏泽',value:[115.480656,35.23375],count:8,unit:'人'},{series:'访客',type:1,name:'临沂',value:[118.35,35.05],count:16,unit:'人'}]]
  - color：散点颜色，数据格式为['#03fce2', '#f3c22b']
**/
const mapScatter = (area = '', data = [], color = [], showLabel) => {
  let dataLegend = []
  let minValue = 0
  let maxValue = 0
  let mapdata = []
  data.forEach((item, index) => {
    if (item.length) {
      dataLegend.push({ name: item[0].seriesName, icon: 'rect' })
      if (!index) {
        minValue = maxValue = item[0].count
      }
    }
    item.length && item.forEach(dataitem => {
      if (minValue > dataitem.count) {
        minValue = dataitem.count
      }
      if (maxValue < dataitem.count) {
        maxValue = dataitem.count
      }
    })
  })
  let scatterSetting = !showLabel
    ? [{ size: 24, opacity: 0.14 }, { size: 16, opacity: 0.22 }, { size: 8, opacity: 1 }] : [
      { size: 32, opacity: 0.14 }, { size: 28, opacity: 0.22 }, { size: 24, opacity: 1, label: true }
    ]
  data.forEach((item, index) => {
    mapdata = mapdata.concat(scatterSetting.map(setting => {
      let label = setting.label ? { label: { show: true, formatter: (item) => { return item.data.count } } } : {}
      return {
        name: item.length ? item[0].seriesName : '',
        type: 'scatter',
        coordinateSystem: 'geo',
        hoverAnimation: true,
        ...label,
        symbolSize: function (value, params) {
          if (minValue === maxValue) {
            return setting.size
          } else {
            return setting.size + (params.data.count - minValue) / (maxValue - minValue) * setting.size
          }
        },
        itemStyle: {
          color: color[index],
          opacity: setting.opacity
        },
        data: item
      }
    }))
  })
  return {
    tooltip: {
      padding: [4, 8],
      trigger: 'item',
      formatter: function (params) {
        return `${params.name}：${params.data.count}${params.data.unit}`
      },
      backgroundColor: 'rgba(5, 31, 73, .84)',
      textStyle: {
        fontSize: 14
      },
      extraCssText: 'border-radius: 6px; box-shadow: 0 0 24px rgba(1, 20, 36, 38);'
    },
    legend: {
      type: 'scroll',
      left: 30,
      bottom: 30,
      orient: 'vertical',
      itemWidth: 16,
      itemHeight: 16,
      itemGap: 16,
      // selectedMode: false,
      data: dataLegend,
      textStyle: {
        color: '#ffffff',
        fontSize: 14
      }
    },
    geo: {
      map: area,
      roam: true,
      zoom: 1.2,
      scaleLimit: { min: 1 },
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#00528b',
          borderColor: '#93cdff',
          borderWidth: 2,
          shadowColor: 'rgba(0, 53, 86, 24)',
          shadowBlur: 32
        },
        emphasis: {
          areaColor: '#2788cd'
        }
      }
    },
    series: mapdata
  }
}

// 导出函数
export default {
  getMap,
  getErrorTips,
  mapScatter
}
