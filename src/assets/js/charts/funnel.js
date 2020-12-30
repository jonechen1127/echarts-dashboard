import {
  getTips
} from './tips.js'

/**
  图表名称：基础漏斗图
  参数说明：
  - data：图表数据，数据格式为[{name:'触发事件', amount: 230},{name:'已指派事件', amount: 210}, {name:'已处置事件', amount: 156}]
  - options : {
    - color：图例颜色，数据格式为['#ffd800', '#ff9376', '#ff9000', '#01c0dd', '#0183ff', '#3051ff', '#ea405a']
    - icon：图例标签图标, 取值为rect（矩形）、ring（圆环）,
    - unit：数量单位,
  }
**/
const funnelBasic = (data = [], { color = [], icon = 'ring', unit = '' }) => {
  data.map(item => { item.selected = true })
  let iconRing = 'path://M8.000,16.000 C3.582,16.000 -0.000,12.418 -0.000,8.000 C-0.000,3.582 3.582,-0.000 8.000,-0.000 C12.418,-0.000 16.000,3.582 16.000,8.000 C16.000,12.418 12.418,16.000 8.000,16.000 ZM8.000,3.000 C5.239,3.000 3.000,5.239 3.000,8.000 C3.000,10.761 5.239,13.000 8.000,13.000 C10.761,13.000 13.000,10.761 13.000,8.000 C13.000,5.239 10.761,3.000 8.000,3.000 Z'
  let dataLegend = data.map(item => ({
    name: item.name,
    icon: icon === 'ring' ? iconRing : 'roundRect'
  }))
  let max = data.reduce((max, item) => Math.max(item.amount, max), 0)
  data = (data || []).map((item, index, arr) => {
    let level = arr.length
    let eveny = 100 / level
    item.value = 100 - index * eveny
    item.per = max === 0 ? 0 : (item.amount / max * 100).toFixed(2)
    return item
  })
  return data && data.length ? {
    tooltip: {
      trigger: 'item',
      formatter: (param) => {
        let { data } = param
        return `${data.name}<br/>${data.amount}${unit}(${data.per}%)`
      },
      backgroundColor: 'rgba(0, 0, 0, .4)',
      padding: [6, 10, 6, 10],
      extraCssText: 'line-height: 20px; border-radius: 10px; text-align: left; margin-top: 10px;border:1px solid #d9d9d9;color:#9e9e9e;'
    },
    legend: {
      type: 'scroll',
      left: 'center',
      right: 'auto',
      top: 'auto',
      bottom: 10,
      orient: 'horizontal',
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 18,
      data: dataLegend,
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      },
      pageIconColor: '#fff',
      pageIconInactiveColor: '#aaa',
      pageTextStyle: {
        color: '#fff'
      }
    },
    series: [{
      type: 'funnel',
      color,
      min: 0,
      max: 100,
      minSize: '10%',
      maxSize: '100%',
      sort: 'ascending',
      gap: 2,
      label: {
        show: true,
        fontSize: 14,
        position: 'inside',
        formatter: (param) => {
          let { data } = param
          return `${data.name}\n${data.amount}${unit}`
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 0
      },
      data
    }]
  } : getTips()
}

export default {
  funnelBasic
}
