import {
  getTips
} from './tips.js'
// 周边设备
const nearlyChart = (xdata = [], ydata = [], color, datacolor) => {
  let colors = {}
  xdata.forEach((value, index) => {
    colors[`b${index}`] = {
      color: datacolor[index],
      fontWeight: 'bold'
    }
    value.dataIndex = index
  })
  return xdata.length && ydata.length ? {
    calculable: true,
    polar: [{
      indicator: xdata,
      radius: '82%',
      center: ['50%', '48%'],
      startAngle: 22.5,
      axisLine: {
        lineStyle: {
          color: '#018bcb'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#018bcb'
        }
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(0,43,95,0)', 'rgba(1,146,184,0.3)']
        }
      },
      nameGap: 8,
      name: {
        formatter: (a, b) => {
          return `{a|${a}}{b${b.dataIndex}|(${ydata[b.dataIndex]})}`
        },
        rich: {
          a: {
            fontSize: 12,
            color: color
          },
          ...colors
        }
      }
    }],
    series: [{
      data: [{
        value: ydata,
        name: '周边设备'
      }],
      type: 'radar',
      itemStyle: {
        normal: {
          color: 'cdf1ff',
          fontSize: 12,
          areaStyle: {
            type: 'default',
            color: '#6ec7d7',
            opacity: 0.8
          },
          lineStyle: {
            color: '#6ec7d7'
          }
        }
      }

    }]
  } : getTips()
}

/**
  图表名称：基础雷达图
  参数说明：
  - data：图表数据，数据格式为[{name:'教育',value:8},{name:'金融',value:8},{name:'医疗',value:8},{name:'交通',value:8},{name:'商业',value:8},{name:'娱乐',value:8},{name:'政府',value:8},{name:'其他',value:10}]
  - color：图例颜色，数据格式为['#66bb80', '#0084ff', '#01c0dc', '#ea405a', '#ffd800', '#ff9000', '#bc86d4', '#3051ff']
**/
const radarBasic = (data = [], color = []) => {
  let dataLegend = data.map(item => ({ name: item.name, icon: 'rect' }))
  let maxvalue = Math.max(...data.map(item => item.value))
  return data.length ? {
    legend: {
      type: 'scroll',
      right: 10,
      top: 'center',
      orient: 'vertical',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 5,
      selectedMode: false,
      data: dataLegend,
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      }
    },
    radar: [
      {
        indicator: data.map(item => ({ name: `${item.name}(${item.value})`, max: maxvalue })),
        center: ['50%', '50%'],
        radius: '62%',
        shape: 'polygon',
        startAngle: 112.5,
        name: {
          color: '#cdf1ff',
          fontSize: 12
        },
        nameGap: 12,
        splitArea: {
          show: true,
          areaStyle: {
            color: [
              'transparent',
              'rgba(0, 181, 249, 0.2)',
              'transparent',
              'rgba(0, 181, 249, 0.2)',
              'transparent'
            ]
          }
        },
        splitLine: {
          lineStyle: {
            width: 1,
            color: '#00b5f9'
          }
        },
        axisLine: {
          lineStyle: {
            width: 1,
            color: '#00b5f9'
          }
        }
      }
    ],
    polar: {
      center: ['50%', '50%'],
      radius: '62%'
    },
    angleAxis: {
      type: 'category',
      startAngle: 112.5,
      clockwise: false,
      data: data.map(item => item.name),
      boundaryGap: false,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      },
      splitArea: {
        show: false
      }
    },
    radiusAxis: {
      type: 'value',
      max: 10,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      },
      splitArea: {
        show: false
      }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: data.map(item => item.value),
            itemStyle: {
              normal: {
                opacity: 0
              }
            },
            lineStyle: {
              normal: {
                opacity: 0
              }
            },
            areaStyle: {
              normal: {
                color: 'rgba(1, 192, 220, 0.88)'
              }
            }
          },
          ...data.map(item => ({ name: item.name, value: [] }))
        ]
      },
      {
        type: 'scatter',
        coordinateSystem: 'polar',
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: {
          normal: {
            color: function (params) {
              return color[params.dataIndex]
            },
            borderColor: '#ffffff',
            borderWidth: 1
          }
        },
        data: data.map((item, index) => ([item.value, index]))
      }
    ]
  } : getTips()
}
export default {
  nearlyChart,
  radarBasic
}
