/* 图表提示信息 */
import {
  getTips
} from './tips.js'
// 图表数据处理
import { thousandBitSeparator } from './dataprocess'

function getDataIndex(dataIndex, length, poll, time = 0) {
  let result = (dataIndex + 1) % length
  return poll[result] ? result : (time < length ? getDataIndex(result, length, poll, ++time) : 0)
}

const highlightCache = new WeakMap()
function setHighlightTimer(instance) {
  return instance && setInterval((instance) => {
    let options = highlightCache.get(instance)
    if (!options.canRun || !options.poll.some(item => item)) {
      return
    }
    instance.dispatchAction({
      type: 'downplay',
      dataIndex: options.dataIndex
    })
    options.dataIndex = getDataIndex(options.dataIndex, options.length, options.poll)
    instance.dispatchAction({
      type: 'highlight',
      dataIndex: options.dataIndex
    })
  }, 2000, instance)
}
/** ***** 自动高亮 ******* **/
function autoChartHighlight(instance, length) {
  if (!instance || !instance.chart) {
    return
  }
  let options = highlightCache.get(instance)
  if (!options) {
    options = {
      dataIndex: -1,
      length,
      poll: new Array(length).fill(true),
      interval: null,
      canRunTimer: null,
      canRun: true
    }
    instance.chart.on('legendselectchanged', (params) => {
      instance.dispatchAction({
        type: 'downplay',
        dataIndex: options.dataIndex
      })
      options.dataIndex = -1
      options.poll = Object.values((params && params.selected) || {})
    })
    instance.chart.on('mouseover', (params) => {
      if (options.canRun) {
        options.canRun = false
        instance.dispatchAction({
          type: 'downplay',
          dataIndex: options.dataIndex
        })
      }
      clearTimeout(options.canRunTimer)
    })
    instance.chart.on('mouseout', (params) => {
      if (!options.canRun) {
        clearTimeout(options.canRunTimer)
        options.canRunTimer = setTimeout(() => {
          options.canRun = true
        }, 1000)
      }
    })
    highlightCache.set(instance, options)
  } else {
    options.dataIndex = -1
    options.length = length
    options.poll = new Array(length).fill(true)
    clearTimeout(options.canRunTimer)
    options.canRunTimer = null
    options.canRun = true
  }
  clearInterval(options.interval)
  options.interval = setHighlightTimer(instance)
}
/** 清除highlight定时器 */
function clearChartHighlight(instance) {
  if (!instance) {
    return
  }
  let options = highlightCache.get(instance)
  if (options && options.interval) {
    clearInterval(options.interval)
    highlightCache.delete(instance)
  }
}

const toolTipCache = new WeakMap()
function setTooltipTimer(instance) {
  return instance && setInterval((instance) => {
    let options = toolTipCache.get(instance)

    if (!options.canRun || !options.poll.some(item => item)) {
      return
    }
    instance.dispatchAction({
      type: 'hideTip',
      dataIndex: options.dataIndex
    })
    options.dataIndex = getDataIndex(options.dataIndex, options.length, options.poll)
    instance.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: options.dataIndex
    })
  }, 2000, instance)
}

/** ***** 自动显示tooltip ******* **/
function atuoShowTooltip(instance, length) {
  if (!instance || !instance.chart) {
    return
  }
  let options = toolTipCache.get(instance)
  if (!options) {
    options = {
      dataIndex: -1,
      length,
      poll: new Array(length).fill(true),
      interval: null,
      canRunTimer: null,
      canRun: true
    }
    instance.chart.on('legendselectchanged', (params) => {
      instance.dispatchAction({
        type: 'hideTip',
        dataIndex: options.dataIndex
      })
      options.dataIndex = -1
      options.poll = Object.values((params && params.selected) || {})
      instance.chart.setOption({
        tooltip: {
          alwaysShowContent: options.poll.some(item => item) // 默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。
        }
      })
    })
    instance.chart.on('mouseover', (params) => {
      if (options.canRun) {
        options.canRun = false
        instance.dispatchAction({
          type: 'hideTip',
          dataIndex: options.dataIndex
        })
      }
      clearTimeout(options.canRunTimer)
    })
    instance.chart.on('mouseout', (params) => {
      if (!options.canRun) {
        clearTimeout(options.canRunTimer)
        options.canRunTimer = setTimeout(() => {
          options.canRun = true
        }, 1000)
      }
    })
    toolTipCache.set(instance, options)
  } else {
    options.dataIndex = -1
    options.length = length
    options.poll = new Array(length).fill(true)
    clearTimeout(options.canRunTimer)
    options.canRunTimer = null
    options.canRun = true
  }
  clearInterval(options.interval)
  options.interval = setTooltipTimer(instance)
}
/** 清除showtip定时器 */
function clearShowTooltip(instance) {
  if (!instance) {
    return
  }
  let options = toolTipCache.get(instance)
  if (options && options.interval) {
    clearInterval(options.interval)
    toolTipCache.delete(instance)
  }
}

/** ****** 首页 ****** **/
// 预警分析图形
// const warningAnalysisPie = (xdata, ydata, labelColor, dataColor) => {
//   return xdata && xdata.length ? {
//     tooltip: {
//       trigger: 'item',
//       formatter: '{b}: {c} ({d}%)'
//     },
//     legend: {
//       bottom: 4,
//       itemGap: 12,
//       itemWidth: 12,
//       itemHeight: 12,
//       formatter: '{name}',
//       textStyle: {
//         color: labelColor
//       },
//       data: xdata
//     },
//     series: [{
//       name: '预警分析',
//       type: 'pie',
//       radius: ['35%', '50%'],
//       center: ['50%', '45%'],
//       color: dataColor,
//       avoidLabelOverlap: false,
//       hoverOffset: 8,
//       top: 0,
//       itemStyle: {
//         emphasis: {
//           // 设置扇形的阴影
//           shadowBlur: 20,
//           shadowOffsetX: 0,
//           shadowColor: 'rgba(0, 0, 0, 0.5)'
//         }
//       },
//       label: {
//         normal: {
//           show: true,
//           formatter: '{b}' + '\n\n' + '{d}%',
//           padding: [0, -50, 0, -50],
//           textStyle: {
//             color: labelColor,
//             fontSize: 12,
//             fontFamily: 'Microsoft YaHei'
//           }
//         }
//         // emphasis: {
//         //   show: true,
//         // formatter: function (params) {
//         //   return '{a|' + params.value + '}{b|%}\n{c|' + params.name + '}'
//         // },
//         // textStyle: {
//         //   color: labelColor,
//         //   fontFamily: 'Microsoft YaHei'
//         // },
//         // rich: {
//         //   a: {
//         //     fontSize: 18,
//         //     lineHeight: 24
//         //   },
//         //   b: {
//         //     fontSize: 12,
//         //     padding: [0, 0, 4, 2]
//         //   },
//         //   c: {
//         //     fontSize: 12
//         //   }
//         // }
//         // }
//       },
//       labelLine: {
//         normal: {
//           show: true,
//           length: 25,
//           length2: 50,
//           lineStyle: {
//             type: 'dashed',
//             color: '#9e9e9e'
//           }
//         }
//       },
//       data: ydata
//     }]
//   } : getTips()
// }
// 车行通道运营分析
const VehiAccessPie = (data, color = [], orient = 'horizontal', icon = 'rect', unit = '', legendPosition, showLegend = true, isOneLabel = false, radius = ['35%', '50%']) => {
  let userData = data
  data.map(item => { item.selected = true })
  let dataLegend = data.map(item => ({
    name: item.name,
    icon: icon === 'roundRect'
  }))
  return data && data.length ? {
    title: {
      zlevel: 0,
      top: 'center',
      left: '36%',
      textAlign: 'center',
      textStyle: {
        rich: {
          value: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold',
            lineHeight: 12
          },
          name: {
            color: '#EFE872',
            lineHeight: 20
          }
        }
      }
    },
    tooltip: {
      trigger: 'item',
      alwaysShowContent: false, // 默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。
      // formatter: (params) => {
      //   return `${params.name}<br/>数量：{c} (${params.percent}%)`
      // }
      formatter: '{b} <br/> 数量：{c} ({d}%)'
    },
    legend: {
      type: 'scroll',
      left: orient === 'horizontal' ? 'center' : 'auto',
      right: 20,
      top: orient === 'horizontal' ? 'auto' : 'center',
      bottom: orient === 'horizontal' ? 10 : 'auto',
      orient: orient,
      itemGap: orient === 'horizontal' ? 6 : 8,
      center: 0,
      itemWidth: 8,
      itemHeight: 8,
      data: dataLegend,
      formatter: function (item) {
        let data = userData;
        let total = 0;
        let tarValue;
        let undisposed;
        for (var i = 0, l = data.length; i < l; i++) {
          total += data[i].value;
          if (data[i].name === item) {
            tarValue = data[i].value;
            undisposed = data[i].undisposed
          }
        }
        if (item.length > 4) {
          if (!undisposed) {
            return item.substr(0, 2) + '...' + item.substring(item.length - 2) + ' ' + tarValue;
          } else {
            return item.substr(0, 2) + '...' + item.substring(item.length - 2) + ' ' + tarValue + '  ' + '(' + '待处理' + ' ' + undisposed + ')';
          }
        }
        if (!undisposed) {
          return item + ' ' + tarValue;
        } else {
          return item + ' ' + tarValue + '  ' + '(' + '待处理' + ' ' + undisposed + ')';
        }
      },
      textStyle: {
        color: '#ffffff',
        fontSize: 12,
        padding: [3, 0, 0, 0]
      },
      pageButtonItemGap: 0,
      pageFormatter: '{current}',
      pageIconSize: 12,
      pageIconColor: '#ffffff',
      pageIconInactiveColor: '#aaaaaa',
      pageTextStyle: {
        color: '#ffffff'
      }
    },
    series: [
      {
        type: 'pie',
        radius: radius,
        center: orient === 'horizontal' ? ['40%', '50%'] : ['38%', '50%'],
        color: color,
        silent: false,
        avoidLabelOverlap: false,
        selectedOffset: 1,
        hoverOffset: 5,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: false,
            formatter: '{b}' + '\n' + '{d}%'
            // formatter: function (params) {
            //   let arr = [
            //     '{a|' + params.name + '232}',
            //     '{c|' + params.percent + '%}'
            //   ]
            //   return arr.join('\n')
            // },
            // rich: {
            //   a: {
            //     color: '#ffffff',
            //     fontSize: 12,
            //     lineHeight: 20
            //   },
            //   b: {
            //     fontSize: 16,
            //     color: '#ffd200',
            //     fontWeight: 'bold'
            //   },
            //   c: {
            //     fontSize: 10,
            //     color: '#ffd200',
            //     fontWeight: 'bold',
            //     padding: [0, 0, 2, 0]
            //   }
            // }
          }
        },
        labelLine: {
          normal: {
            show: true,
            length: 5,
            length2: 5,
            lineStyle: {
              type: 'dashed',
              color: '#9e9e9e'
            }
          }
        },
        itemStyle: {
          opacity: 1
        },
        data: data
      }
    ]
  } : getTips()
}
// 设备巡检实时任务
const EquipmentPie = (xdata, ydata, labelColor, dataColor, numbers, Ntitles) => {
  return xdata.length && ydata.length ? {
    title: {
      zlevel: 0,
      text: [
        '{name|' + Ntitles + '}',
        '{value|' + numbers + '}'
      ].join('\n'),
      top: 'center',
      left: '36%',
      textAlign: 'center',
      textStyle: {
        rich: {
          value: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold',
            lineHeight: 12
          },
          name: {
            color: '#EFE872',
            lineHeight: 20
          }
        }
      }
    },
    tooltip: {
      trigger: 'item',
      alwaysShowContent: true, // 默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。
      formatter: '{b} <br/> {c} ({d}%)'
    },
    legend: {
      orient: '',
      y: 'center',
      right: '2%',
      center: 0,
      itemGap: 3,
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        color: labelColor,
        fontSize: 12
      },
      data: xdata,
      formatter: function (item) {
        var data = ydata;
        var total = 0;
        var tarValue;
        var price;
        for (var i = 0, l = data.length; i < l; i++) {
          total += data[i].value;
          if (data[i].name === item) {
            tarValue = data[i].value;
          }
        }
        if (total === 0) {
          price = 0.00
        } else {
          price = Math.round(tarValue / total * 10000) / 100.00
        }
        if (item.length > 4) {
          return item.substr(0, 2) + '...' + item.substring(item.length - 2) + ' ' + tarValue + '  ' + '(' + price + '%' + ')';
        }
        return item + ' ' + tarValue + '  ' + '(' + price + '%' + ')';
      }
    },
    series: [{
      name: '物防数据',
      type: 'pie',
      radius: ['60%', '75%'],
      center: ['38%', '50%'],
      color: dataColor,
      hoverOffset: 5,
      avoidLabelOverlap: false,
      itemStyle: {
        emphasis: {
          // 设置扇形的阴影
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false, // true,
          formatter: '{b}' + '\n' + '{d}%',
          textStyle: {
            color: labelColor,
            fontSize: 12,
            fontFamily: 'Microsoft YaHei'
          }
        }
      },
      labelLine: {
        normal: {
          show: true,
          length: 5,
          length2: 5,
          lineStyle: {
            type: 'dashed',
            color: '#9e9e9e'
          }
        }
      },
      data: ydata
    }]
  } : getTips()
}

// 车行事件实时任务
const GaragePie = (data, color = [], Ntitles, totals, totalUD, orient = 'horizontal', icon = 'rect', unit = '', legendPosition, showLegend = true, isOneLabel = false, radius = ['70%', '89%']) => {
  let userData = data
  data.map(item => { item.selected = true })
  let dataLegend = data.map(item => ({
    name: item.name,
    icon: icon === 'roundRect'
  }))
  return data && data.length ? {
    title: {
      zlevel: 0,
      text: [
        '{name|' + Ntitles + '}',
        '{value|' + totals + '/' + totalUD + '}'
      ].join('\n'),
      top: 'center',
      left: '36%',
      textAlign: 'center',
      textStyle: {
        rich: {
          value: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold',
            lineHeight: 12
          },
          name: {
            color: '#EFE872',
            lineHeight: 20
          }
        }
      }
    },
    tooltip: {
      trigger: 'item',
      alwaysShowContent: true, // 默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。
      // formatter: (params) => {
      //   return `${params.name}<br/>数量：{c} (${params.percent}%)`
      // }
      formatter: '{b} <br/> 数量：{c} ({d}%)'
    },
    legend: {
      type: 'scroll',
      left: orient === 'horizontal' ? 'center' : 'auto',
      right: orient === 'horizontal' ? 'auto' : 2,
      top: orient === 'horizontal' ? 'auto' : 'center',
      bottom: orient === 'horizontal' ? 10 : 'auto',
      orient: orient,
      itemGap: orient === 'horizontal' ? 6 : 8,
      y: 'center',
      center: 0,
      itemWidth: 8,
      itemHeight: 8,
      data: dataLegend,
      formatter: function (item) {
        let data = userData;
        let total = 0;
        let tarValue;
        let undisposed;
        for (var i = 0, l = data.length; i < l; i++) {
          total += data[i].value;
          if (data[i].name === item) {
            tarValue = data[i].value;
            undisposed = data[i].undisposed
          }
        }
        if (item.length > 4) {
          return item.substr(0, 2) + '...' + item.substring(item.length - 2) + ' ' + tarValue + '  ' + '(' + '待处理' + ' ' + undisposed + ')';
        }
        return item + ' ' + tarValue + '  ' + '(' + '待处理' + ' ' + undisposed + ')';
      },
      textStyle: {
        color: '#ffffff',
        fontSize: 12,
        padding: [3, 0, 0, 0]
      },
      pageButtonItemGap: 0,
      pageFormatter: '{current}',
      pageIconSize: 12,
      pageIconColor: '#ffffff',
      pageIconInactiveColor: '#aaaaaa',
      pageTextStyle: {
        color: '#ffffff'
      }
    },
    series: [
      {
        type: 'pie',
        radius: radius,
        center: orient === 'horizontal' ? ['40%', '50%'] : ['38%', '50%'],
        color: color,
        silent: false,
        avoidLabelOverlap: false,
        selectedOffset: 1,
        hoverOffset: 5,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: false,
            formatter: '{b}' + '\n' + '{d}%'
            // formatter: function (params) {
            //   let arr = [
            //     '{a|' + params.name + '232}',
            //     '{c|' + params.percent + '%}'
            //   ]
            //   return arr.join('\n')
            // },
            // rich: {
            //   a: {
            //     color: '#ffffff',
            //     fontSize: 12,
            //     lineHeight: 20
            //   },
            //   b: {
            //     fontSize: 16,
            //     color: '#ffd200',
            //     fontWeight: 'bold'
            //   },
            //   c: {
            //     fontSize: 10,
            //     color: '#ffd200',
            //     fontWeight: 'bold',
            //     padding: [0, 0, 2, 0]
            //   }
            // }
          }
        },
        labelLine: {
          normal: {
            show: true,
            length: 5,
            length2: 5,
            lineStyle: {
              type: 'dashed',
              color: '#9e9e9e'
            }
          }
        },
        itemStyle: {
          opacity: 1
        },
        data: data
      }
    ]
  } : getTips()
}
// 人行时间实时任务
const peoplePie = (xdata, ydata, Ntitles, totals, totalUD, labelColor, dataColor, orient = 'horizontal', icon = 'rect', unit = '', legendPosition, showLegend = true, isOneLabel = false, radius = ['70%', '89%']) => {
  // legendPosition = legendPosition || { right: grid[1], top: 0 } // 图例位置
  return xdata.length && ydata.length ? {
    title: {
      zlevel: 0,
      text: [
        '{name|' + Ntitles + '}',
        '{value|' + totals + '/' + totalUD + '}'
      ].join('\n'),
      top: 'center',
      left: '36%',
      textAlign: 'center',
      textStyle: {
        rich: {
          value: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold',
            lineHeight: 12
          },
          name: {
            color: '#EFE872',
            lineHeight: 20
          }
        }
      }
    },
    tooltip: {
      trigger: 'item',
      alwaysShowContent: true, // 默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。
      formatter: '{b}<br/> {c} ({d}%)',
      position: 'right'
    },
    toolbox: {
      show: false
    },
    calculable: true,

    legend: {
      x: 'center',
      // y : 'bottom',
      type: 'scroll',
      left: orient === 'horizontal' ? 'center' : 'auto',
      right: orient === 'horizontal' ? 'auto' : 2,
      top: orient === 'horizontal' ? 'auto' : 'center',
      bottom: orient === 'horizontal' ? 10 : 'auto',
      orient: orient,
      itemGap: orient === 'horizontal' ? 6 : 8,
      y: 'center',
      center: 0,
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        color: labelColor,
        fontSize: 12
      },
      data: xdata,
      formatter: function (item) {
        let data = ydata;
        let total = 0;
        let tarValue;
        let undisposed;
        for (var i = 0, l = data.length; i < l; i++) {
          total += data[i].value;
          if (data[i].name === item) {
            tarValue = data[i].value;
            undisposed = data[i].undisposed
          }
        }
        if (item.length > 4) {
          return item.substr(0, 2) + '...' + item.substring(item.length - 2) + ' ' + tarValue + '  ' + '(' + '待处理' + ' ' + undisposed + ')';
        }
        return item + ' ' + tarValue + '  ' + '(' + '待处理' + ' ' + undisposed + ')';
      },
      // textStyle: {
      //   color: '#ffffff',
      //   fontSize: 12,
      //   padding: [3, 0, 0, 0]
      // },
      pageButtonItemGap: 0,
      pageFormatter: '{current}',
      pageIconSize: 12,
      pageIconColor: '#ffffff',
      pageIconInactiveColor: '#aaaaaa',
      pageTextStyle: {
        color: '#ffffff'
      }
    },
    series: [{
      name: '物防数据',
      // // roseType: 'radius',
      // x: '50%', // for funnel
      // max: 40, // for funnel
      sort: 'ascending', // for funn
      type: 'pie',
      radius: radius,
      center: orient === 'horizontal' ? ['40%', '50%'] : ['38%', '50%'],
      color: dataColor,
      silent: false,
      avoidLabelOverlap: false,
      selectedOffset: 1,
      hoverOffset: 5,
      itemStyle: {
        emphasis: {
          // 设置扇形的阴影
          shadowBlur: 15,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false, // true,
          formatter: '{b}' + '\n' + '{d}%',
          // padding: [0, 8, 0, 8],
          textStyle: {
            color: labelColor,
            fontSize: 12,
            fontFamily: 'Microsoft YaHei'
          }
        }
      },
      lableLine: {
        normal: {
          show: false,
          length: 10,
          length2: 10,
          lineStyle: {
            type: 'dashed',
            color: '#9e9e9e'
          }
        },
        emphasis: {
          show: true
        }
      },
      data: ydata
    }]
  } : getTips()
}
// const peoplePie = (xdata, ydata, Ntitles, totals, totalUD, labelColor, dataColor, orient = 'horizontal', icon = 'rect', unit = '', legendPosition, showLegend = true, isOneLabel = false, radius = ['70%', '89%']) => {
//   // legendPosition = legendPosition || { right: grid[1], top: 0 } // 图例位置
//   return xdata.length && ydata.length ? {
//     title: {
//       zlevel: 0,
//       text: [
//         '{name|' + Ntitles + '}',
//         '{value|' + totals + '/' + totalUD + '}'
//       ].join('\n'),
//       top: 'center',
//       left: '36%',
//       textAlign: 'center',
//       textStyle: {
//         rich: {
//           value: {
//             color: '#fff',
//             fontSize: 12,
//             fontWeight: 'bold',
//             lineHeight: 12
//           },
//           name: {
//             color: '#EFE872',
//             lineHeight: 20
//           }
//         }
//       }
//     },
//     tooltip: {
//       trigger: 'item',
//       alwaysShowContent: true, // 默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。
//       formatter: '{b}<br/> {c} ({d}%)',
//       position: 'right'
//     },
//     toolbox: {
//       show: false
//     },
//     calculable: true,
//     legend: {
//       x: 'center',
//       // y : 'bottom',
//       type: 'scroll',
//       left: orient === 'horizontal' ? 'center' : 'auto',
//       right: orient === 'horizontal' ? 'auto' : 2,
//       top: orient === 'horizontal' ? 'auto' : 'center',
//       bottom: orient === 'horizontal' ? 10 : 'auto',
//       orient: orient,
//       itemGap: orient === 'horizontal' ? 6 : 8,
//       y: 'center',
//       center: 0,
//       itemWidth: 8,
//       itemHeight: 8,
//       textStyle: {
//         color: labelColor,
//         fontSize: 12
//       },
//       data: xdata,
//       formatter: function (item) {
//         let data = ydata;
//         let total = 0;
//         let tarValue;
//         let undisposed;
//         for (var i = 0, l = data.length; i < l; i++) {
//           total += data[i].value;
//           if (data[i].name === item) {
//             tarValue = data[i].value;
//             undisposed = data[i].undisposed
//           }
//         }
//         if (item.length > 4) {
//           return item.substr(0, 2) + '...' + item.substring(item.length - 2) + ' ' + tarValue + '  ' + '(' + '待处理' + ' ' + undisposed + ')';
//         }
//         return item + ' ' + tarValue + '  ' + '(' + '待处理' + ' ' + undisposed + ')';
//       },
//       // textStyle: {
//       //   color: '#ffffff',
//       //   fontSize: 12,
//       //   padding: [3, 0, 0, 0]
//       // },
//       pageButtonItemGap: 0,
//       pageFormatter: '{current}',
//       pageIconSize: 12,
//       pageIconColor: '#ffffff',
//       pageIconInactiveColor: '#aaaaaa',
//       pageTextStyle: {
//         color: '#ffffff'
//       }
//     },
//     series: [{
//       name: '物防数据',
//       type: 'pie',
//       radius: radius,
//       center: ['0', '50%'],
//       // roseType: 'radius',
//       x: '50%', // for funnel
//       max: 40, // for funnel
//       sort: 'ascending', // for funn
//       color: dataColor,
//       hoverOffset: 5,
//       avoidLabelOverlap: false,
//       itemStyle: {
//         emphasis: {
//           // 设置扇形的阴影
//           shadowBlur: 15,
//           shadowOffsetX: 0,
//           shadowColor: 'rgba(0, 0, 0, 0.5)'
//         }
//       },
//       label: {
//         normal: {
//           show: false
//         },
//         emphasis: {
//           show: false, // true,
//           formatter: '{b}' + '\n' + '{d}%',
//           // padding: [0, 8, 0, 8],
//           textStyle: {
//             color: labelColor,
//             fontSize: 12,
//             fontFamily: 'Microsoft YaHei'
//           }
//         }
//       },
//       lableLine: {
//         normal: {
//           show: false,
//           length: 10,
//           length2: 10,
//           lineStyle: {
//             type: 'dashed',
//             color: '#9e9e9e'
//           }
//         },
//         emphasis: {
//           show: true
//         }
//       },
//       data: ydata
//     }]
//   } : getTips()
// }
// 工单实时任务
const WorkorderPie = (xdata, ydata, Ntitles, totals, totalUD, labelColor, dataColor, orient = 'horizontal', icon = 'rect', unit = '', legendPosition, showLegend = true, isOneLabel = false, radius = ['70%', '89%']) => {
  // legendPosition = legendPosition || { right: grid[1], top: 0 } // 图例位置
  return xdata.length && ydata.length ? {
    title: {
      zlevel: 0,
      text: [
        '{name|' + Ntitles + '}',
        '{value|' + totals + '/' + totalUD + '}'
      ].join('\n'),
      top: 'center',
      left: '36%',
      textAlign: 'center',
      textStyle: {
        rich: {
          value: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold',
            lineHeight: 12
          },
          name: {
            color: '#EFE872',
            lineHeight: 20
          }
        }
      }
    },
    tooltip: {
      trigger: 'item',
      alwaysShowContent: true, // 默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。
      formatter: '{b}<br/> {c} ({d}%)',
      position: 'right'
    },
    legend: {
      type: 'scroll',
      left: orient === 'horizontal' ? 'center' : 'auto',
      right: orient === 'horizontal' ? 'auto' : 4,
      top: orient === 'horizontal' ? 'auto' : 'center',
      bottom: orient === 'horizontal' ? 10 : 'auto',
      orient: orient,
      itemGap: orient === 'horizontal' ? 6 : 8,
      y: 'center',
      center: 0,
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        color: labelColor,
        fontSize: 12
      },
      data: xdata,
      formatter: function (item) {
        let data = ydata;
        let total = 0;
        let tarValue;
        let undisposed;
        for (var i = 0, l = data.length; i < l; i++) {
          total += data[i].value;
          if (data[i].name === item) {
            tarValue = data[i].value;
            undisposed = data[i].undisposed
          }
        }
        if (item.length > 4) {
          return item.substr(0, 2) + '...' + item.substring(item.length - 2) + ' ' + tarValue + '  ' + '(' + '待处理' + ' ' + undisposed + ')';
        }
        return item + ' ' + tarValue + ' ' + '  ' + '(' + '待处理' + ' ' + undisposed + ')';
      },
      pageButtonItemGap: 0,
      pageFormatter: '{current}',
      pageIconSize: 12,
      pageIconColor: '#ffffff',
      pageIconInactiveColor: '#aaaaaa',
      pageTextStyle: {
        color: '#ffffff'
      }
    },
    series: [{
      name: '技防数据',
      type: 'pie',
      radius: radius,
      center: orient === 'horizontal' ? ['40%', '50%'] : ['38%', '50%'],
      hoverOffset: 5,
      color: dataColor,
      avoidLabelOverlap: false,
      itemStyle: {
        emphasis: {
          // 设置扇形的阴影
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0,0, .5)'
        }
      },
      label: {
        normal: {
          show: false,
          padding: [0, -40, 0, -40]
        },
        emphasis: {
          show: false, // true,
          formatter: '{b}' + '\n' + '{d}%',
          padding: [-8, 0, 0, -8],
          textStyle: {
            color: labelColor,
            fontSize: 12,
            fontFamily: 'Microsoft YaHei'
          }
        }
      },
      labelLine: {
        normal: {
          show: true,
          length: 15,
          length2: 15,
          lineStyle: {
            type: 'dashed',
            color: '#9e9e9e'
          }
        }
      },
      data: ydata
    }]
  } : getTips()
}
// 物防数据图形
const materialPie = (xdata, ydata, labelColor, dataColor) => {
  return xdata.length && ydata.length ? {
    tooltip: {
      trigger: 'item',
      alwaysShowContent: true, // 默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: '',
      y: 'center',
      right: '9%',
      center: 0,
      itemGap: 4,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: labelColor,
        fontSize: 12
      },
      data: xdata,
      formatter: function (item) {
        if (item.length > 4) {
          return item.substr(0, 2) + '...' + item.substring(item.length - 2)
        }
        return item
      }
    },
    series: [{
      name: '物防数据',
      type: 'pie',
      roseType: 'radius',
      radius: ['20%', '65%'],
      center: ['38%', '50%'],
      color: dataColor,
      hoverOffset: 5,
      avoidLabelOverlap: false,
      itemStyle: {
        emphasis: {
          // 设置扇形的阴影
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false, // true,
          formatter: '{b}' + '\n' + '{d}%',
          // padding: [0, 8, 0, 8],
          textStyle: {
            color: labelColor,
            fontSize: 12,
            fontFamily: 'Microsoft YaHei'
          }
        }
      },
      labelLine: {
        normal: {
          show: true,
          length: 10,
          length2: 10,
          lineStyle: {
            type: 'dashed',
            color: '#9e9e9e'
          }
        }
      },
      data: ydata
    }]
  } : getTips()
}
// 技防数据图形
const technicalPie = (xdata, ydata, labelColor, dataColor) => {
  return xdata.length && ydata.length ? {
    tooltip: {
      trigger: 'item',
      alwaysShowContent: true, // 默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。
      formatter: '{b}<br/> {c} ({d}%)'
    },
    legend: {
      orient: '',
      y: 'center',
      right: '6%',
      center: 0,
      itemGap: 6,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: labelColor,
        fontSize: 12
      },
      data: xdata,
      formatter: function (item) {
        let data = ydata;
        let total = 0;
        let tarValue;
        let undisposed;
        for (var i = 0, l = data.length; i < l; i++) {
          total += data[i].value;
          if (data[i].name === item) {
            tarValue = data[i].value;
            undisposed = data[i].undisposed
          }
        }
        if (item.length > 4) {
          return item.substr(0, 2) + '...' + item.substring(item.length - 2) + ' ' + tarValue + '  ' + '(' + '待处理' + ' ' + undisposed + ')';
        }
        return item + ' ' + tarValue;
      }
      // formatter: function (item) {
      //   if (item.length > 6) {
      //     return item.substr(0, 2) + '...' + item.substring(item.length - 2)
      //   }
      //   return item
      // }
    },
    series: [{
      name: '技防数据',
      type: 'pie',
      radius: ['40%', '65%'],
      center: ['38%', '52%'],
      hoverOffset: 4,
      color: dataColor,
      avoidLabelOverlap: false,
      itemStyle: {
        emphasis: {
          // 设置扇形的阴影
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0,0, .5)'
        }
      },
      label: {
        normal: {
          show: false,
          padding: [0, -40, 0, -40]
        },
        emphasis: {
          show: false, // true,
          formatter: '{b}' + '\n' + '{d}%',
          padding: [-8, 0, 0, -8],
          textStyle: {
            color: labelColor,
            fontSize: 12,
            fontFamily: 'Microsoft YaHei'
          }
        }
      },
      labelLine: {
        normal: {
          show: true,
          length: 15,
          length2: 15,
          lineStyle: {
            type: 'dashed',
            color: '#9e9e9e'
          }
        }
      },
      data: ydata
    }]
  } : getTips()
}

/** ****** 首页end ****** **/

/** ****** 项目数据信息 ****** **/
const houseDataPie = (xdata = [], ydata = [], labelColor, dataColor) => {
  return xdata.length && ydata.length ? {
    tooltip: {
      trigger: 'item',
      alwaysShowContent: true, // 默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。
      formatter: '{b} : {c}<br/> ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: '20%',
      itemWidth: 10,
      itemHeight: 10,
      borderRadius: 0,
      textStyle: {
        color: labelColor,
        fontSize: 12
      },
      top: 'center',
      data: xdata
    },
    series: [{
      name: '项目数据',
      type: 'pie',
      radius: '80%',
      label: {
        show: false
      },
      color: dataColor,
      center: ['30%', '51%'],
      data: ydata,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          formatter: '{b} : {c}<br/> ({d}%)'
        }
      }
    }]
  } : getTips()
}
const sexDataPie = (xdata = [], ydata = [], labelColor, dataColor) => {
  return xdata.length && ydata.length ? {
    tooltip: {
      trigger: 'item',
      alwaysShowContent: true, // 默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。
      formatter: '{b}: {c}人 <br/>({d}%)'
    },
    legend: {
      x: 'center',
      y: 'bottom',
      itemWidth: 10,
      itemHeight: 10,
      data: xdata,
      textStyle: {
        color: labelColor
      }
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      color: dataColor,
      itemStyle: {
        emphasis: {
          // 设置扇形的阴影
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        normal: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: ydata
    }]
  } : getTips()
}
const defenseDataPie = (xdata = [], ydata = [], labelColor, dataColor) => {
  return xdata.length && ydata.length ? {
    tooltip: {
      trigger: 'item',
      alwaysShowContent: true, // 默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。
      formatter: '{b}: {c}人 <br/>({d}%)'
    },
    legend: {
      x: 'center',
      y: 'bottom',
      itemWidth: 10,
      itemHeight: 10,
      data: xdata,
      textStyle: {
        color: labelColor
      }
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      color: dataColor,
      itemStyle: {
        emphasis: {
          // 设置扇形的阴影
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        normal: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: ydata
    }]
  } : getTips()
}
const ageDataPie = (xdata = [], ydata = [], labelColor, dataColor) => {
  return xdata.length && ydata.length ? {
    tooltip: {
      trigger: 'item',
      alwaysShowContent: true, // 默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。
      formatter: '{b}: {c}人'
    },
    legend: {
      x: 'center',
      y: 'bottom',
      itemWidth: 10,
      itemHeight: 10,
      data: xdata,
      textStyle: {
        color: labelColor
      }
    },
    series: [{
      type: 'pie',
      radius: '68%',
      center: ['50%', '40%'],
      avoidLabelOverlap: false,
      color: dataColor,
      itemStyle: {
        emphasis: {
          // 设置扇形的阴影
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        normal: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: ydata
    }]
  } : getTips()
}
/** **** 项目数据信息end ****** **/

/** **** 房屋 ********/
// 房屋用途
const houseUsagePie = (xdata, ydata, labelColor, dataColor) => {
  return xdata && xdata.length ? {
    legend: {
      type: 'scroll',
      left: 'center',
      bottom: 5,
      itemWidth: 16,
      itemHeight: 16,
      itemGap: 20,
      selectedMode: false,
      data: xdata,
      textStyle: {
        color: '#ffffff',
        fontSize: 14,
        lineHeight: 22
      },
      pageIconColor: '#fff',
      pageIconInactiveColor: '#aaa',
      pageTextStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['35%', '50%'],
        center: ['50%', '45%'],
        color: dataColor,
        avoidLabelOverlap: true,
        hoverOffset: 10,
        itemStyle: {
          emphasis: {
            // 设置扇形的阴影
            shadowBlur: 12,
            shadowOffsetX: 0,
            shadowColor: 'rgba(10, 42, 89, 0.34)'
          }
        },
        label: {
          normal: {
            show: true,
            formatter: function (params) {
              let arr = [
                '{a|' + params.name + '}',
                '{b|' + params.percent + '%}'
              ]
              return arr.join('\n')
            },
            padding: [0, -32, 0, -32],
            textStyle: {
              rich: {
                a: {
                  color: '#ffffff',
                  fontSize: 14,
                  lineHeight: 20
                },
                b: {
                  color: '#ffffff',
                  fontSize: 14,
                  lineHeight: 24
                }
              }
            }
          }
        },
        labelLine: {
          normal: {
            show: true,
            length: 28,
            length2: 42,
            lineStyle: {
              type: 'dashed',
              color: '#c8e3fc'
            }
          }
        },
        data: ydata
      },
      {
        type: 'pie',
        radius: ['35%', '50%'],
        center: ['50%', '45%'],
        color: dataColor,
        avoidLabelOverlap: false,
        hoverOffset: 10,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            formatter: function (params) {
              return '{a|' + params.name + '}\n{b|' + params.value + '}{c|套}'
            },
            rich: {
              a: {
                color: '#ffffff',
                fontSize: 14,
                lineHeight: 20
              },
              b: {
                fontSize: 18,
                color: '#ffd200',
                fontWeight: 'bold'
              },
              c: {
                fontSize: 12,
                color: '#ffd200',
                fontWeight: 'bold',
                padding: [0, 0, 2, 0]
              }
            }
          }
        },
        data: ydata
      }
    ]
  } : getTips()
}
// 区域占比
const regionalPie = (xdata, ydata, labelColor, dataColor) => {
  return xdata.length && ydata.length ? {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: '',
      top: '20%',
      right: '9%',
      itemGap: 10,
      itemWidth: 14,
      itemHeight: 14,
      textStyle: {
        color: labelColor,
        fontSize: 14
      },
      data: xdata
    },
    series: [{
      name: '区域占比',
      type: 'pie',
      radius: ['40%', '55%'],
      center: ['38%', '42%'],
      // roseType: 'radius',
      color: dataColor,
      hoverOffset: 5,
      avoidLabelOverlap: false,
      itemStyle: {
        emphasis: {
          // 设置扇形的阴影
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: true,
          formatter: '{b}' + '\n\n' + '{d}%',
          padding: [-10, -50, -10, -50],
          textStyle: {
            color: labelColor,
            fontSize: 14,
            fontFamily: 'Microsoft YaHei'
          }
        }
      },
      labelLine: {
        normal: {
          show: true,
          length: 30,
          length2: 70,
          lineStyle: {
            type: 'dashed',
            color: '#9e9e9e'
          }
        }
      },
      data: ydata
    }]
  } : getTips()
}
/** ****** 房屋信息end ****** **/

/** ****** 车辆管理 ****** **/
// 车辆区域分布
const vehicleRatePie = (ydata, labelColor, dataColor) => {
  let circle = 'path://M8.000,16.000 C3.582,16.000 -0.000,12.418 -0.000,8.000 C-0.000,3.582 3.582,-0.000 8.000,-0.000 C12.418,-0.000 16.000,3.582 16.000,8.000 C16.000,12.418 12.418,16.000 8.000,16.000 ZM8.000,3.000 C5.239,3.000 3.000,5.239 3.000,8.000 C3.000,10.761 5.239,13.000 8.000,13.000 C10.761,13.000 13.000,10.761 13.000,8.000 C13.000,5.239 10.761,3.000 8.000,3.000 Z'
  let xdata = ydata.map(item => ({ name: item.name, icon: circle }))
  return ydata && ydata.length ? {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      bottom: 4,
      itemGap: 12,
      itemWidth: 12,
      itemHeight: 12,
      formatter: '{name}',
      textStyle: {
        color: labelColor
      },
      data: xdata
    },
    series: [{
      name: '预警分析',
      type: 'pie',
      radius: ['35%', '50%'],
      center: ['45%', '44%'],
      color: dataColor,
      avoidLabelOverlap: false,
      hoverOffset: 5,
      top: 0,
      itemStyle: {
        emphasis: {
          // 设置扇形的阴影
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        normal: {
          show: true,
          formatter: '{b}' + '\n\n' + '{d}%',
          padding: [0, -50, 0, -50],
          textStyle: {
            color: labelColor,
            fontSize: 14,
            fontFamily: 'Microsoft YaHei'
          }
        }
      },
      labelLine: {
        normal: {
          show: true,
          length: 25,
          length2: 60,
          lineStyle: {
            type: 'dashed',
            color: '#9e9e9e'
          }
        }
      },
      data: ydata
    }]
  } : getTips()
}
/** ****** 车辆管理end ****** **/

/**
  图表名称：基础饼图
  参数说明：
  - data：图表数据，数据格式为[{value:15,name:'12岁以下'},{value:15,name:'12-20岁'},{value:25,name:'20-30岁'},{value:15,name:'30-40岁'},{value:10,name:'40-50岁'},{value:10,name:'50-60岁'},{value:10,name:'60岁以上'}]
  - color：图例颜色，数据格式为['#ffd800', '#ff9376', '#ff9000', '#01c0dd', '#0183ff', '#3051ff', '#ea405a']
  - orient：图例布局，取值为horizontal（水平布局）、vertical（垂直布局）
  - unit：计量单位
**/
const pieBasic = (data = [], color = [], orient = 'horizontal', unit) => {
  data.map(item => { item.selected = true })
  let dataLegend = data.map(item => ({
    name: item.name,
    icon: 'roundRect'
  }))
  return data && data.length ? {
    tooltip: {
      trigger: 'item',
      formatter: `{b}<br/>{c}${unit}（{d}%）`,
      backgroundColor: 'rgba(0, 0, 0, .4)',
      padding: [6, 10, 6, 10],
      extraCssText: 'line-height: 18px; border-radius: 8px; text-align: left;'
    },
    legend: {
      type: 'scroll',
      left: orient === 'horizontal' ? 'center' : 'auto',
      right: orient === 'horizontal' ? 'auto' : 10,
      top: orient === 'horizontal' ? 'auto' : 'center',
      bottom: orient === 'horizontal' ? 10 : 'auto',
      orient: orient,
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
    series: [
      {
        type: 'pie',
        radius: [0, '50%'],
        center: ['50%', '50%'],
        color: color,
        selectedOffset: 1,
        hoverOffset: 8,
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  } : getTips()
}

/**
  图表名称：玫瑰饼图
  参数说明：
  - data：图表数据，数据格式为[{value:40,name:'催泪器'},{value:35,name:'警棍'},{value:30,name:'警绳'},{value:25,name:'警盾'},{value:20,name:'防刺背心'},{value:15,name:'防刺手套'},{value:10,name:'铁叉'},{value:5,name:'防爆盔'}]
  - color：图例颜色，数据格式为['#fed565', '#00dbfc', '#71e6f1', '#0084ff', '#01fcff', '#fdff4f', '#107dbe', '#40f4c3']
  - roseType：是否展示成南丁格尔玫瑰图
**/
const pieRose = (data = [], color = [], roseType = true) => {
  data.map(item => { item.selected = true })
  let dataLegend = data.map(item => ({
    name: item.name,
    icon: 'roundRect'
  }))
  return data && data.length ? {
    legend: {
      type: 'scroll',
      right: 10,
      top: 'center',
      orient: 'vertical',
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 8,
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
    series: [
      {
        type: 'pie',
        radius: ['25%', '50%'],
        center: ['38%', '50%'],
        color: color,
        silent: true,
        avoidLabelOverlap: true,
        selectedOffset: 1,
        hoverOffset: 12,
        roseType: roseType,
        label: {
          normal: {
            show: false,
            formatter: function (params) {
              let arr = [
                '{a|' + params.name + '}',
                '{b| }',
                '{c|' + params.percent + '%}'
              ]
              return arr.join('\n')
            },
            padding: [0, -48, 0, -48],
            textStyle: {
              rich: {
                a: {
                  color: '#ffffff',
                  fontSize: 12,
                  width: 48,
                  align: 'center'
                },
                b: {
                  lineHeight: 10
                },
                c: {
                  color: '#ffffff',
                  fontSize: 12,
                  width: 48,
                  align: 'center'
                }
              }
            }
          },
          emphasis: {
            show: true,
            formatter: function (params) {
              let arr = [
                '{a|' + params.name + '}',
                '{b| }',
                '{c|' + params.percent + '%}'
              ]
              return arr.join('\n')
            },
            padding: [0, -48, 0, -48],
            textStyle: {
              rich: {
                a: {
                  color: '#ffffff',
                  fontSize: 12,
                  width: 48,
                  align: 'center'
                },
                b: {
                  lineHeight: 10
                },
                c: {
                  color: '#ffffff',
                  fontSize: 12,
                  width: 48,
                  align: 'center'
                }
              }
            }
          }
        },
        labelLine: {
          normal: {
            show: true,
            length: 24,
            length2: 48,
            lineStyle: {
              type: 'dashed',
              color: '#c8e3fc'
            }
          }
        },
        data: data
      },
      {
        type: 'pie',
        radius: ['25%', '50%'],
        center: ['38%', '50%'],
        color: color,
        silent: true,
        avoidLabelOverlap: true,
        selectedOffset: 1,
        hoverOffset: 10,
        roseType: roseType,
        label: {
          normal: {
            show: false,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 12,
                height: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(0, 0, 0, .2)'
              }
            }
          },
          emphasis: {
            show: true,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 12,
                height: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(0, 0, 0, .2)'
              }
            }
          }
        },
        itemStyle: {
          opacity: 0
        },
        data: data
      },
      {
        type: 'pie',
        radius: ['25%', '50%'],
        center: ['38%', '50%'],
        color: color,
        silent: true,
        avoidLabelOverlap: true,
        selectedOffset: 1,
        hoverOffset: 10,
        roseType: roseType,
        label: {
          normal: {
            show: false,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#ffffff'
              }
            }
          },
          emphasis: {
            show: true,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#ffffff'
              }
            }
          }
        },
        itemStyle: {
          opacity: 0
        },
        data: data
      }
    ]
  } : getTips()
}

/**
  图表名称：甜甜圈饼图
  参数说明：
  - data：图表数据，数据格式为[{value:6692,name:'自住'},{value:754,name:'出租'},{value:2128,name:'商用'},{value:652,name:'空置'},{value:2418,name:'其他'}]
  - color：图例颜色，数据格式为['#73bbff', '#5cd8ea', '#fecd72', '#197ab8', '#dff1e4']
  - orient：图例布局，取值为horizontal（水平布局）、vertical（垂直布局）
  - icon：图例标签图标, 取值为rect（矩形）、ring（圆环）,
  - unit：数量单位,
  - isOneLabel：是否只显示一个标签
  - radius : 图形的半径
**/
const pieDoughnut = (data = [], color = [], orient = 'horizontal', icon = 'rect', unit = '', isOneLabel = false, radius = ['35%', '50%']) => {
  data.map(item => { item.selected = true })
  let iconRing = 'path://M8.000,16.000 C3.582,16.000 -0.000,12.418 -0.000,8.000 C-0.000,3.582 3.582,-0.000 8.000,-0.000 C12.418,-0.000 16.000,3.582 16.000,8.000 C16.000,12.418 12.418,16.000 8.000,16.000 ZM8.000,3.000 C5.239,3.000 3.000,5.239 3.000,8.000 C3.000,10.761 5.239,13.000 8.000,13.000 C10.761,13.000 13.000,10.761 13.000,8.000 C13.000,5.239 10.761,3.000 8.000,3.000 Z'
  let dataLegend = data.map(item => ({
    name: item.name,
    icon: icon === 'ring' ? iconRing : 'roundRect'
  }))
  return data && data.length ? {
    tooltip: {
      trigger: 'item',
      confine: true,
      alwaysShowContent: false, // 默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。
      formatter: (params) => {
        return `${params.name}<br/>${params.percent}%<br/>${thousandBitSeparator(params.value)}${unit}`
      },
    },

    legend: {
      type: 'scroll',
      left: orient === 'horizontal' ? 'center' : 'auto',
      right: orient === 'horizontal' ? 'auto' : 10,
      top: orient === 'horizontal' ? 'auto' : 'center',
      bottom: orient === 'horizontal' ? 10 : 'auto',
      padding: [5, 25],
      orient: orient,
      itemWidth: icon == 'rect' ? 20 : 12,
      itemHeight: icon == 'rect' ? 6 : 12,
      itemGap: orient === 'horizontal' ? 8 : 16,
      data: dataLegend,
      textStyle: {
        color: '#ffffff',
        fontSize: 12,
        padding: [3, 0, 0, 0]
      },
      pageButtonItemGap: 0,
      pageFormatter: '{current}',
      pageIconSize: 12,
      pageIconColor: '#ffffff',
      pageIconInactiveColor: '#aaaaaa',
      pageTextStyle: {
        color: '#ffffff'
      }
    },
    series: [
      {
        type: 'pie',
        // startAngle: 180,
        radius: radius,
        center: orient === 'horizontal' ? ['50%', '45%'] : ['50%', '50%'],
        color: color,
        silent: false,
        avoidLabelOverlap: true,
        selectedOffset: 1,
        hoverOffset: 12,
        label: {
          normal: {
            show: false, // !isOneLabel,
            formatter: function (params) {
              let arr = [
                '{a|' + params.name + '}',
                '{b| }',
                '{c|' + params.percent + '%}'
              ]
              return arr.join('\n')
            },
            padding: [0, -48, 0, -48],
            textStyle: {
              rich: {
                a: {
                  color: '#ffffff',
                  fontSize: 12,
                  width: 48,
                  align: 'center'
                },
                b: {
                  lineHeight: 10
                },
                c: {
                  color: '#ffffff',
                  fontSize: 12,
                  width: 48,
                  align: 'center'
                }
              }
            }
          },
          emphasis: {
            show: false, // true,
            formatter: function (params) {
              let arr = [
                '{a|' + params.name + '}',
                '{b| }',
                '{c|' + params.percent + '%}'
              ]
              return arr.join('\n')
            },
            padding: [0, -48, 0, -48],
            textStyle: {
              rich: {
                a: {
                  color: '#ffffff',
                  fontSize: 12,
                  width: 48,
                  align: 'center'
                },
                b: {
                  lineHeight: 10
                },
                c: {
                  color: '#ffffff',
                  fontSize: 12,
                  width: 48,
                  align: 'center'
                }
              }
            }
          }
        },
        labelLine: {
          normal: {
            show: true,
            length: 24,
            length2: 48,
            lineStyle: {
              type: 'dashed',
              color: '#c8e3fc'
            }
          }
        },
        data: data
      },
      {
        type: 'pie',
        // startAngle: 180,
        radius: radius,
        center: orient === 'horizontal' ? ['50%', '45%'] : ['50%', '50%'],
        color: color,
        silent: false,
        avoidLabelOverlap: false,
        selectedOffset: 1,
        hoverOffset: 10,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: false,
            formatter: function (params) {
              let len = params.name.length
              let str = params.name
              let newstr = len > 7 ? str.substring(0, 4) + '...' + str.substring(len - 3, len) : str
              return '{a|' + newstr + '}\n{b|' + thousandBitSeparator(params.value) + '}{c|' + unit + '}'
            },
            rich: {
              a: {
                color: '#ffffff',
                fontSize: 12,
                lineHeight: 20
              },
              b: {
                fontSize: 16,
                color: '#ffd200',
                fontWeight: 'bold'
              },
              c: {
                fontSize: 10,
                color: '#ffd200',
                fontWeight: 'bold',
                padding: [0, 0, 2, 0]
              }
            }
          }
        },
        itemStyle: {
          opacity: 1
        },
        data: data
      },
      {
        type: 'pie',
        // startAngle: 180,
        radius: radius,
        center: orient === 'horizontal' ? ['50%', '45%'] : ['38%', '50%'],
        color: color,
        silent: true,
        avoidLabelOverlap: true,
        selectedOffset: 1,
        hoverOffset: 10,
        label: {
          normal: {
            show: false, //! isOneLabel,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 12,
                height: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(255, 255, 255, .2)'
              }
            }
          },
          emphasis: {
            show: false, // true,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 12,
                height: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(255, 255, 255, .2)'
              }
            }
          }
        },
        itemStyle: {
          opacity: 0
        },
        data: data
      },
      {
        type: 'pie',
        // startAngle: 180,
        radius: radius,
        center: orient === 'horizontal' ? ['50%', '45%'] : ['38%', '50%'],
        color: color,
        silent: true,
        avoidLabelOverlap: true,
        selectedOffset: 1,
        hoverOffset: 10,
        label: {
          normal: {
            show: false, //! isOneLabel,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#ffffff'
              }
            }
          },
          emphasis: {
            show: false, // true,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#ffffff'
              }
            }
          }
        },
        itemStyle: {
          opacity: 0
        },
        data: data
      }
    ]
  } : getTips()
}

const pieDoughnutCall = (data = [], xdata, color = [], orient = 'horizontal', icon = 'rect', unit = '', isOneLabel = false, radius = ['35%', '50%'], Ntitles, numbers) => {
  data.map(item => { item.selected = true })
  let iconRing = 'path://M8.000,16.000 C3.582,16.000 -0.000,12.418 -0.000,8.000 C-0.000,3.582 3.582,-0.000 8.000,-0.000 C12.418,-0.000 16.000,3.582 16.000,8.000 C16.000,12.418 12.418,16.000 8.000,16.000 ZM8.000,3.000 C5.239,3.000 3.000,5.239 3.000,8.000 C3.000,10.761 5.239,13.000 8.000,13.000 C10.761,13.000 13.000,10.761 13.000,8.000 C13.000,5.239 10.761,3.000 8.000,3.000 Z'
  let dataLegend = data.map(item => ({
    name: item.name,
    icon: icon === 'ring' ? iconRing : 'roundRect'
  }))
  let userData = data
  let uData = xdata
  return data && data.length ? {
    title: {
      zlevel: 0,
      text: [
        '{name|' + Ntitles + '}',
        '{value|' + numbers + '}'
      ].join('\n'),
      top: 'center',
      left: '36%',
      textAlign: 'center',
      textStyle: {
        rich: {
          value: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold',
            lineHeight: 12
          },
          name: {
            color: '#EFE872',
            lineHeight: 20
          }
        }
      }
    },
    tooltip: {
      trigger: 'item',
      alwaysShowContent: true, // 默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。
      formatter: (params) => {
        return `${params.name}<br/>${params.percent}%<br/>${thousandBitSeparator(params.value)}${unit}`
      }
    },
    legend: {
      type: 'scroll',
      left: orient === 'horizontal' ? 'center' : 'auto',
      right: orient === 'horizontal' ? 'auto' : 10,
      top: orient === 'horizontal' ? 'auto' : 'center',
      bottom: orient === 'horizontal' ? 10 : 'auto',
      padding: [5, 25],
      orient: orient,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: orient === 'horizontal' ? 16 : 8,
      data: dataLegend,
      textStyle: {
        color: '#ffffff',
        fontSize: 12,
        padding: [3, 0, 0, 0]
      },
      pageButtonItemGap: 0,
      pageFormatter: '{current}',
      pageIconSize: 12,
      pageIconColor: '#ffffff',
      pageIconInactiveColor: '#aaaaaa',
      pageTextStyle: {
        color: '#ffffff'
      },
      formatter: function (item) {
        let data = userData;
        let xdata = uData
        let total = 0;
        let tarValue;
        let undisposed;
        for (var i = 0, l = data.length; i < l; i++) {
          total += data[i].value;
          if (data[i].name === item) {
            tarValue = data[i].value;
            undisposed = xdata[i].undisposed
          }
        }
        if (item.length > 0) {
          return item.substr(0, 3) + '...' + item.substring(item.length - 2) + ' ' + tarValue + '  ' + '(' + '待处理' + ' ' + undisposed + ')';
        }
        return item + ' ' + tarValue + '  ' + '(' + '待处理' + ' ' + undisposed + ')';
      }
    },
    series: [
      {
        type: 'pie',
        // startAngle: 180,
        radius: radius,
        center: orient === 'horizontal' ? ['50%', '45%'] : ['38%', '50%'],
        color: color,
        silent: false,
        avoidLabelOverlap: true,
        selectedOffset: 1,
        hoverOffset: 12,
        label: {
          normal: {
            show: false, // !isOneLabel,
            formatter: function (params) {
              let arr = [
                '{a|' + params.name + '}',
                '{b| }',
                '{c|' + params.percent + '%}'
              ]
              return arr.join('\n')
            },
            padding: [0, -48, 0, -48],
            textStyle: {
              rich: {
                a: {
                  color: '#ffffff',
                  fontSize: 12,
                  width: 48,
                  align: 'center'
                },
                b: {
                  lineHeight: 10
                },
                c: {
                  color: '#ffffff',
                  fontSize: 12,
                  width: 48,
                  align: 'center'
                }
              }
            }
          },
          emphasis: {
            show: false, // true,
            formatter: function (params) {
              let arr = [
                '{a|' + params.name + '}',
                '{b| }',
                '{c|' + params.percent + '%}'
              ]
              return arr.join('\n')
            },
            padding: [0, -48, 0, -48],
            textStyle: {
              rich: {
                a: {
                  color: '#ffffff',
                  fontSize: 12,
                  width: 48,
                  align: 'center'
                },
                b: {
                  lineHeight: 10
                },
                c: {
                  color: '#ffffff',
                  fontSize: 12,
                  width: 48,
                  align: 'center'
                }
              }
            }
          }
        },
        labelLine: {
          normal: {
            show: true,
            length: 24,
            length2: 48,
            lineStyle: {
              type: 'dashed',
              color: '#c8e3fc'
            }
          }
        },
        data: data
      },
      {
        type: 'pie',
        // startAngle: 180,
        radius: radius,
        center: orient === 'horizontal' ? ['50%', '45%'] : ['38%', '50%'],
        color: color,
        silent: false,
        avoidLabelOverlap: false,
        selectedOffset: 1,
        hoverOffset: 10,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: false,
            formatter: function (params) {
              let len = params.name.length
              let str = params.name
              let newstr = len > 7 ? str.substring(0, 4) + '...' + str.substring(len - 3, len) : str
              return '{a|' + newstr + '}\n{b|' + thousandBitSeparator(params.value) + '}{c|' + unit + '}'
            },
            rich: {
              a: {
                color: '#ffffff',
                fontSize: 12,
                lineHeight: 20
              },
              b: {
                fontSize: 16,
                color: '#ffd200',
                fontWeight: 'bold'
              },
              c: {
                fontSize: 10,
                color: '#ffd200',
                fontWeight: 'bold',
                padding: [0, 0, 2, 0]
              }
            }
          }
        },
        itemStyle: {
          opacity: 1
        },
        data: data
      },
      {
        type: 'pie',
        // startAngle: 180,
        radius: radius,
        center: orient === 'horizontal' ? ['50%', '45%'] : ['38%', '50%'],
        color: color,
        silent: true,
        avoidLabelOverlap: true,
        selectedOffset: 1,
        hoverOffset: 10,
        label: {
          normal: {
            show: false, //! isOneLabel,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 12,
                height: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(255, 255, 255, .2)'
              }
            }
          },
          emphasis: {
            show: false, // true,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 12,
                height: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(255, 255, 255, .2)'
              }
            }
          }
        },
        itemStyle: {
          opacity: 0
        },
        data: data
      },
      {
        type: 'pie',
        // startAngle: 180,
        radius: radius,
        center: orient === 'horizontal' ? ['50%', '45%'] : ['38%', '50%'],
        color: color,
        silent: true,
        avoidLabelOverlap: true,
        selectedOffset: 1,
        hoverOffset: 10,
        label: {
          normal: {
            show: false, //! isOneLabel,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#ffffff'
              }
            }
          },
          emphasis: {
            show: false, // true,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#ffffff'
              }
            }
          }
        },
        itemStyle: {
          opacity: 0
        },
        data: data
      }
    ]
  } : getTips()
}
// 设备告警分析
const pieDoughnuts = (data = [], xdata, color = [], orient = 'horizontal', icon = 'rect', unit = '', isOneLabel = false, radius = ['35%', '50%'], Ntitles, numbers) => {
  data.map(item => { item.selected = true })
  let iconRing = 'path://M8.000,16.000 C3.582,16.000 -0.000,12.418 -0.000,8.000 C-0.000,3.582 3.582,-0.000 8.000,-0.000 C12.418,-0.000 16.000,3.582 16.000,8.000 C16.000,12.418 12.418,16.000 8.000,16.000 ZM8.000,3.000 C5.239,3.000 3.000,5.239 3.000,8.000 C3.000,10.761 5.239,13.000 8.000,13.000 C10.761,13.000 13.000,10.761 13.000,8.000 C13.000,5.239 10.761,3.000 8.000,3.000 Z'
  let dataLegend = data.map(item => ({
    name: item.name,
    icon: icon === 'ring' ? iconRing : 'roundRect'
  }))
  let userData = data
  let uData = xdata
  return data && data.length ? {
    title: {
      zlevel: 0,
      text: [
        '{name|' + Ntitles + '}',
        '{value|' + numbers + '}'
      ].join('\n'),
      top: 'center',
      left: '36%',
      textAlign: 'center',
      textStyle: {
        rich: {
          value: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold',
            lineHeight: 12
          },
          name: {
            color: '#EFE872',
            lineHeight: 20
          }
        }
      }
    },
    tooltip: {
      trigger: 'item',
      alwaysShowContent: false, // 默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。
      formatter: (params) => {
        return `${params.name}<br/>${params.percent}%<br/>${thousandBitSeparator(params.value)}${unit}`
      }

    },
    legend: {
      type: 'scroll',
      left: orient === 'horizontal' ? 'center' : 'auto',
      right: orient === 'horizontal' ? 'center' : 10,
      top: orient === 'horizontal' ? 'auto' : 35,
      bottom: orient === 'horizontal' ? 10 : 'auto',
      padding: [5, 25],
      orient: orient,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: orient === 'horizontal' ? 16 : 8,
      data: dataLegend,
      textStyle: {
        color: '#ffffff',
        fontSize: 12,
        padding: [3, 0, 0, 0]
      },
      pageButtonItemGap: 0,
      pageFormatter: '{current}',
      pageIconSize: 12,
      pageIconColor: '#ffffff',
      pageIconInactiveColor: '#aaaaaa',
      pageTextStyle: {
        color: '#ffffff'
      },
      formatter: function (item) {
        let data = userData;
        let xdata = uData
        let total = 0;
        let tarValue;
        let undisposed;
        for (var i = 0, l = data.length; i < l; i++) {
          total += data[i].value;
          if (data[i].name === item) {
            tarValue = data[i].value;
            undisposed = xdata[i].undisposed
          }
        }
        if (item.length > 0) {
          return item.substr(0, 3) + '...' + item.substring(item.length - 2) + ' ' + tarValue + '  ' + '(' + '待处理' + ' ' + undisposed + ')';
        }
        return item + ' ' + tarValue + '  ' + '(' + '待处理' + ' ' + undisposed + ')';
      }
      // formatter: function (item) {
      //   if (item.length > 0) {
      //     return item.substr(0, 3) + '...' + item.substring(item.length - 3) + ' ';
      //   }
      // }
    },
    series: [
      {
        type: 'pie',
        // startAngle: 180,
        radius: radius,
        center: orient === 'horizontal' ? ['50%', '45%'] : ['38%', '50%'],
        color: color,
        silent: false,
        avoidLabelOverlap: true,
        selectedOffset: 1,
        hoverOffset: 12,
        label: {
          normal: {
            show: false, // !isOneLabel,
            formatter: function (params) {
              let arr = [
                '{a|' + params.name + '}',
                '{b| }',
                '{c|' + params.percent + '%}'
              ]
              return arr.join('\n')
            },
            padding: [0, -48, 0, -48],
            textStyle: {
              rich: {
                a: {
                  color: '#ffffff',
                  fontSize: 12,
                  width: 48,
                  align: 'center'
                },
                b: {
                  lineHeight: 10
                },
                c: {
                  color: '#ffffff',
                  fontSize: 12,
                  width: 48,
                  align: 'center'
                }
              }
            }
          },
          emphasis: {
            show: false, // true,
            formatter: function (params) {
              let arr = [
                '{a|' + params.name + '}',
                '{b| }',
                '{c|' + params.percent + '%}'
              ]
              return arr.join('\n')
            },
            padding: [0, -48, 0, -48],
            textStyle: {
              rich: {
                a: {
                  color: '#ffffff',
                  fontSize: 12,
                  width: 48,
                  align: 'center'
                },
                b: {
                  lineHeight: 10
                },
                c: {
                  color: '#ffffff',
                  fontSize: 12,
                  width: 48,
                  align: 'center'
                }
              }
            }
          }
        },
        labelLine: {
          normal: {
            show: true,
            length: 24,
            length2: 48,
            lineStyle: {
              type: 'dashed',
              color: '#c8e3fc'
            }
          }
        },
        data: data
      },
      {
        type: 'pie',
        // startAngle: 180,
        radius: radius,
        center: orient === 'horizontal' ? ['50%', '45%'] : ['38%', '50%'],
        color: color,
        silent: false,
        avoidLabelOverlap: false,
        selectedOffset: 1,
        hoverOffset: 10,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: false,
            formatter: function (params) {
              let len = params.name.length
              let str = params.name
              let newstr = len > 7 ? str.substring(0, 4) + '...' + str.substring(len - 3, len) : str
              return '{a|' + newstr + '}\n{b|' + thousandBitSeparator(params.value) + '}{c|' + unit + '}'
            },
            rich: {
              a: {
                color: '#ffffff',
                fontSize: 12,
                lineHeight: 20
              },
              b: {
                fontSize: 16,
                color: '#ffd200',
                fontWeight: 'bold'
              },
              c: {
                fontSize: 10,
                color: '#ffd200',
                fontWeight: 'bold',
                padding: [0, 0, 2, 0]
              }
            }
          }
        },
        itemStyle: {
          opacity: 1
        },
        data: data
      },
      {
        type: 'pie',
        // startAngle: 180,
        radius: radius,
        center: orient === 'horizontal' ? ['50%', '45%'] : ['38%', '50%'],
        color: color,
        silent: true,
        avoidLabelOverlap: true,
        selectedOffset: 1,
        hoverOffset: 10,
        label: {
          normal: {
            show: false, //! isOneLabel,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 12,
                height: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(255, 255, 255, .2)'
              }
            }
          },
          emphasis: {
            show: false, // true,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 12,
                height: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(255, 255, 255, .2)'
              }
            }
          }
        },
        itemStyle: {
          opacity: 0
        },
        data: data
      },
      {
        type: 'pie',
        // startAngle: 180,
        radius: radius,
        center: orient === 'horizontal' ? ['50%', '45%'] : ['38%', '50%'],
        color: color,
        silent: true,
        avoidLabelOverlap: true,
        selectedOffset: 1,
        hoverOffset: 10,
        label: {
          normal: {
            show: false, //! isOneLabel,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#ffffff'
              }
            }
          },
          emphasis: {
            show: false, // true,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#ffffff'
              }
            }
          }
        },
        itemStyle: {
          opacity: 0
        },
        data: data
      }
    ]
  } : getTips()
}
// 告警统计信息
const alarmPieDoughnut = (data = [], color = [], total, orient = 'horizontal', icon = 'rect', unit = '', isOneLabel = false, radius = ['35%', '50%']) => {
  data.map(item => { item.selected = true })
  let iconRing = 'path://M8.000,16.000 C3.582,16.000 -0.000,12.418 -0.000,8.000 C-0.000,3.582 3.582,-0.000 8.000,-0.000 C12.418,-0.000 16.000,3.582 16.000,8.000 C16.000,12.418 12.418,16.000 8.000,16.000 ZM8.000,3.000 C5.239,3.000 3.000,5.239 3.000,8.000 C3.000,10.761 5.239,13.000 8.000,13.000 C10.761,13.000 13.000,10.761 13.000,8.000 C13.000,5.239 10.761,3.000 8.000,3.000 Z'
  let dataLegend = data.map(item => ({
    name: item.name,
    icon: icon === 'ring' ? iconRing : 'roundRect'
  }))
  return data && data.length ? {
    tooltip: {
      trigger: 'item',
      alwaysShowContent: false, // 默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。
      formatter: (params) => {
        return `${params.name}<br/>${params.percent}%`
      }
    },
    legend: {
      orient: '',
      y: 'center',
      right: '5%',
      center: 0,
      itemGap: 4,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        // color: labelColor,
        color: '#ffffff',
        fontSize: 12
      },
      // data: xdata,
      data: dataLegend,
      formatter: function (item) {
        var arr1 = data.filter(function (item1, index, a) {
          return item1.name === item
        })
        return item + `  ${arr1[0].value}`
        // return item.name
      }
    },
    series: [
      // {
      //   type: 'pie',
      //   // startAngle: 180,
      //   radius: radius,
      //   // center: orient === 'horizontal' ? ['50%', '45%'] : ['38%', '50%'],
      //   center: ['25%', '50%'],
      //   color: color,
      //   silent: false,
      //   avoidLabelOverlap: true,
      //   selectedOffset: 1,
      //   hoverOffset: 12,
      //   label: {
      //     normal: {
      //       show: false, // !isOneLabel,
      //       formatter: function (params) {
      //         let arr = [
      //           '{a|' + params.name + '}',
      //           '{b| }',
      //           '{c|' + params.percent + '%}'
      //         ]
      //         return arr.join('\n')
      //       },
      //       padding: [0, -48, 0, -48],
      //       textStyle: {
      //         rich: {
      //           a: {
      //             color: '#ffffff',
      //             fontSize: 12,
      //             width: 48,
      //             align: 'center'
      //           },
      //           b: {
      //             lineHeight: 10
      //           },
      //           c: {
      //             color: '#ffffff',
      //             fontSize: 12,
      //             width: 48,
      //             align: 'center'
      //           }
      //         }
      //       }
      //     },
      //     emphasis: {
      //       show: false, // true,
      //       formatter: function (params) {
      //         let arr = [
      //           '{a|' + params.name + '}',
      //           '{b| }',
      //           '{c|' + params.percent + '%}'
      //         ]
      //         return arr.join('\n')
      //       },
      //       padding: [0, -48, 0, -48],
      //       textStyle: {
      //         rich: {
      //           a: {
      //             color: '#ffffff',
      //             fontSize: 12,
      //             width: 48,
      //             align: 'center'
      //           },
      //           b: {
      //             lineHeight: 10
      //           },
      //           c: {
      //             color: '#ffffff',
      //             fontSize: 12,
      //             width: 48,
      //             align: 'center'
      //           }
      //         }
      //       }
      //     }
      //   },
      //   labelLine: {
      //     normal: {
      //       show: true,
      //       length: 24,
      //       length2: 48,
      //       lineStyle: {
      //         type: 'dashed',
      //         color: '#c8e3fc'
      //       }
      //     }
      //   },
      //   data: data
      // },
      {
        type: 'pie',
        // startAngle: 180,
        radius: radius,
        // center: orient === 'horizontal' ? ['50%', '45%'] : ['38%', '50%'],
        center: ['25%', '50%'],
        color: color,
        silent: false,
        avoidLabelOverlap: false,
        selectedOffset: 1,
        hoverOffset: 10,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            formatter: function (params) {
              // let len = params.name.length
              // let str = params.name
              // let newstr = len > 7 ? str.substring(0, 4) + '...' + str.substring(len - 3, len) : str
              // return '{a|' + newstr + '}\n{b|' + thousandBitSeparator(params.value) + '}{c|' + unit + '}'
              // return '{a|' + params.name + '}\n{b|' + thousandBitSeparator(params.value) + '}{c|' + unit + '}'
              return '总计\n' + total
            },
            rich: {
              a: {
                color: '#ffffff',
                fontSize: 12,
                lineHeight: 20
              },
              b: {
                fontSize: 16,
                color: '#ffd200',
                fontWeight: 'bold'
              },
              c: {
                fontSize: 10,
                color: '#ffd200',
                fontWeight: 'bold',
                padding: [0, 0, 2, 0]
              }
            }
          }
        },
        itemStyle: {
          opacity: 1
        },
        data: data
      },
      {
        type: 'pie',
        // startAngle: 180,
        radius: radius,
        center: orient === 'horizontal' ? ['50%', '45%'] : ['38%', '50%'],
        color: color,
        silent: true,
        avoidLabelOverlap: true,
        selectedOffset: 1,
        hoverOffset: 10,
        label: {
          normal: {
            show: false, //! isOneLabel,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 12,
                height: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(255, 255, 255, .2)'
              }
            }
          },
          emphasis: {
            show: false, // true,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 12,
                height: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(255, 255, 255, .2)'
              }
            }
          }
        },
        itemStyle: {
          opacity: 0
        },
        data: data
      },
      {
        type: 'pie',
        // startAngle: 180,
        radius: radius,
        center: orient === 'horizontal' ? ['50%', '45%'] : ['38%', '50%'],
        color: color,
        silent: true,
        avoidLabelOverlap: true,
        selectedOffset: 1,
        hoverOffset: 10,
        label: {
          normal: {
            show: false, //! isOneLabel,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#ffffff'
              }
            }
          },
          emphasis: {
            show: false, // true,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#ffffff'
              }
            }
          }
        },
        itemStyle: {
          opacity: 0
        },
        data: data
      }
    ]
  } : getTips()
}

/**
  图表名称：嵌套饼图
  参数说明：
  - outdata：外环图表数据，数据格式为[{value:148773,name:'常住人口'},{value:74387,name:'流动人口'}]
  - outcolor：外环图例颜色，数据格式为nestedOutColor = ['#5cd8ea', '#f58e54']
  - indata：内环图表数据，数据格式为[{value:74387,name:'业主'},{value:74387,name:'家属'},{value:74387,name:'租客'}]
  - incolor：内环图例颜色，数据格式为['#73bbff', '#2f46f0', '#fed07c']
  - unit：计量单位
**/
const pieNested = (outdata = [], outcolor = [], indata = [], incolor = [], unit = '', orient = 'horizontal', labelLine = 48) => {
  outdata.map(item => { item.selected = true })
  indata = indata.filter(item => {
    return item.value > 0
  })
  indata.map(item => { item.selected = true })
  let data = [...outdata]
  let iconRing = 'path://M858.3 311.2C894 372.5 912 439.4 912 512s-17.9 139.5-53.7 200.8C822.5 774 774 822.6 712.8 858.3S584.6 912 512 912s-139.5-17.9-200.8-53.7c-61.2-35.7-109.7-84.2-145.6-145.6C129.9 651.5 112 584.6 112 512c0-72.5 17.9-139.4 53.7-200.8 35.7-61.2 84.2-109.7 145.6-145.6C372.5 130 439.4 112 512 112c72.5 0 139.4 17.9 200.8 53.7C774 201.5 822.5 250 858.3 311.2z m-204.1-44.4c-43.4-25.3-90.8-38-142.2-38s-98.8 12.7-142.2 38-77.8 59.7-103.1 103.1c-25.3 43.4-38 90.8-38 142.2s12.7 98.8 38 142.2c25.3 43.4 59.7 77.8 103.1 103.1 43.4 25.3 90.8 38 142.2 38s98.8-12.7 142.2-38c43.4-25.3 77.8-59.7 103.1-103.1 25.3-43.4 38-90.8 38-142.2s-12.7-98.8-38-142.2c-25.4-43.4-59.8-77.8-103.1-103.1z'
  let dataLegend = data.map(item => ({
    name: item.name,
    icon: iconRing
  }))
  return data && data.length ? {
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: `{b}<br/>{c}${unit}（{d}%）`,
      backgroundColor: 'rgba(0, 0, 0, .4)',
      padding: [6, 10, 6, 10],
      extraCssText: 'line-height: 18px; border-radius: 8px; text-align: left;'
    },
    legend: {
      type: 'scroll',
      orient: orient,
      itemHeight: 12,
      itemGap: 10,
      data: dataLegend,
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      },
      pageIconColor: '#fff',
      pageIconInactiveColor: '#aaa',
      pageTextStyle: {
        color: '#fff'
      },
      ...{ ...orient === 'horizontal' ? { x: 'center', bottom: 10 } : { right: 10, top: 'center' } }
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '50%'],
        center: ['50%', '50%'],
        color: outcolor,
        selectedOffset: 1,
        hoverOffset: 8,
        label: {
          normal: {
            show: false
          }
        },
        data: outdata
      },
      {
        type: 'pie',
        radius: [0, '25%'],
        center: ['50%', '50%'],
        color: incolor,
        selectedOffset: 1,
        hoverOffset: 8,
        itemStyle: {
          emphasis: {
            // 设置扇形的阴影
            shadowBlur: 12,
            shadowOffsetX: 0,
            shadowColor: 'rgba(10, 42, 89, 0.34)'
          }
        },
        label: {
          normal: {
            show: true,
            formatter: function (params) {
              let arr = [
                '{a|' + params.name + '}',
                '{b| }',
                '{c|' + params.percent + '%}'
              ]
              return arr.join('\n')
            },
            padding: [0, -48, 0, -48],
            textStyle: {
              rich: {
                a: {
                  color: '#ffffff',
                  fontSize: 12,
                  width: 48,
                  align: 'center'
                },
                b: {
                  lineHeight: 10
                },
                c: {
                  color: '#ffffff',
                  fontSize: 12,
                  width: 48,
                  align: 'center'
                }
              }
            }
          }
        },
        labelLine: {
          normal: {
            show: true,
            length: labelLine,
            length2: labelLine,
            lineStyle: {
              type: 'dashed',
              color: '#c8e3fc'
            }
          }
        },
        data: indata
      },
      {
        type: 'pie',
        radius: [0, '35%'],
        center: ['50%', '50%'],
        color: incolor,
        silent: true,
        avoidLabelOverlap: true,
        selectedOffset: 1,
        label: {
          normal: {
            show: true,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 12,
                height: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(255, 255, 255, .2)'
              }
            }
          }
        },
        itemStyle: {
          opacity: 0
        },
        data: indata
      },
      {
        type: 'pie',
        radius: [0, '35%'],
        center: ['50%', '50%'],
        color: incolor,
        silent: true,
        avoidLabelOverlap: true,
        selectedOffset: 1,
        label: {
          normal: {
            show: true,
            position: 'inside',
            formatter: '{a| }',
            rich: {
              a: {
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#ffffff'
              }
            }
          }
        },
        itemStyle: {
          opacity: 0
        },
        data: indata
      }
    ]
  } : getTips()
}

const vehiclesitua = (xdata, ydata, lData, healthIndex, labelColor, dataColor) => {
  let ChangeColor
  if (healthIndex <= 25) {
    ChangeColor = '#19e044'
  } else if (healthIndex > 26 || healthIndex < 50) {
    ChangeColor = '#1993e0'
  } else if (healthIndex > 51 || healthIndex < 75) {
    ChangeColor = '#b8e019'
  } else if (healthIndex >= 75) {
    ChangeColor = '#e03519'
  }
  return xdata.length && ydata.length ? {
    title: {
      text: ''
    },
    tooltip: {},
    legend: {
      orient: 'vertical',
      y: 'center',
      right: '9%',
      center: 0,
      itemGap: 8,
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        color: labelColor,
        fontSize: 12
      },
      data: xdata.name
    },
    radar: {
      startAngle: 80,
      radius: '82%',
      center: ['52%', '62%'],
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#063269',
          borderRadius: 5,
          padding: [3, 5]
        }
      },
      indicator: ydata.map(item => ({
        name: `${item.name}`,
        value: `${item.value}`,
        max: 100,
        axisLabel: {
          show: true,
          fontSize: 10,
          color: '#838D9E',
          showMaxLabel: false, // 不显示最大值，即外圈不显示数字30
          showMinLabel: false // 显示最小数字，即中心点显示0
        }
      })),
      splitArea: {
        show: false,
        areaStyle: {
          color: 'rgba(255,0,0,0)' // 图表背景的颜色
        }
      },
      splitNumber: 5, // 雷达图圈数设置
      // 设置雷达图中间射线的颜色
      axisLine: {
        lineStyle: {
          color: '#054C82',
          normal: {
            type: 'dashed'
          }
        }
      },
      //  圆圈线配置
      splitLine: {
        show: true,
        lineStyle: {
          color: '#06477E'
        }
      }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: lData,
            name: ['健康指数' + ' (' + healthIndex + '%)'],
            itemStyle: {
              normal: {
                color: ChangeColor,
                type: 'dashed'
              }
            }
          }
        ],
        itemStyle: {
          normal: {
            fontSize: 12,
            width: 1,
            areaStyle: {
              type: 'default',
              color: ChangeColor,
              opacity: 0.9
            }
          }
        },
        symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
        symbolSize: 5, // 拐点的大小
        areaStyle: {
          normal: {
            width: 1,
            opacity: 0.5
          }
        }
      }
    ]
  } : getTips()

}
/**
  -嵌套甜甜圈
  参数说明：
  - outdata：外环图表数据，数据格式为[{value:148773,name:'常住人口'},{value:74387,name:'流动人口'}]
  - outcolor：外环图例颜色，数据格式为nestedOutColor = ['#5cd8ea', '#f58e54']
  - indata：内环图表数据，数据格式为[{value:74387,name:'业主'},{value:74387,name:'家属'},{value:74387,name:'租客'}]
  - incolor：内环图例颜色，数据格式为['#73bbff', '#2f46f0', '#fed07c']
  - unit：计量单位
**/
const doughnutNest = (outdata = [], outcolor = [], indata = [], incolor = [], icon = 'ring', unit = '', vertical = 'vertical') => {
  let inSideData = [];
  let iconRing = 'path://M8.000,16.000 C3.582,16.000 -0.000,12.418 -0.000,8.000 C-0.000,3.582 3.582,-0.000 8.000,-0.000 C12.418,-0.000 16.000,3.582 16.000,8.000 C16.000,12.418 12.418,16.000 8.000,16.000 ZM8.000,3.000 C5.239,3.000 3.000,5.239 3.000,8.000 C3.000,10.761 5.239,13.000 8.000,13.000 C10.761,13.000 13.000,10.761 13.000,8.000 C13.000,5.239 10.761,3.000 8.000,3.000 Z'
  outdata.map(item => { item.selected = true })
  indata.map(item => {
    item.selected = true;
    let obj = {}
    obj.value = item.value
    inSideData.push(obj)
  })
  let data = [...outdata, ...indata]
  let dataLegend = data.map(item => ({
    name: item.name,
    icon: icon == 'ring' ? iconRing : 'rect'
  }))
  return data && data.length ? {
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: `{b}<br/>{c}${unit}（{d}%）`,
      backgroundColor: 'rgba(0, 0, 0, .4)',
      padding: [6, 10, 6, 10],
      extraCssText: 'line-height: 18px; border-radius: 8px; text-align: left;'
    },
    grid: {
      left: '2%',
      top: '14%',
      right: '4%',
      bottom: '20%',
      containLabel: true
    },
    legend: {
      orient: vertical,
      type: 'plain',
      right: '0',
      top: '30',
      height: '60%',
      itemWidth: icon == 'ring' ? 12 : 20,
      itemHeight: icon == 'ring' ? 12 : 20,
      itemGap: 18,
      data: dataLegend,
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '48%'],
        center: ['50%', '40%'],
        color: outcolor,
        selectedOffset: 1,
        hoverOffset: 8,
        label: {
          normal: {
            show: false
          }
        },
        data: outdata
      },
      {
        type: 'pie',
        radius: ['30%', '34%'],
        center: ['50%', '40%'],
        color: incolor,
        selectedOffset: 1,
        hoverOffset: 8,
        label: {
          normal: {
            show: false,
          }
        },
        data: indata
      },
      {
        type: 'pie',
        radius: ['20%', '25%'],
        center: ['50%', '40%'],
        color: '#09214f',
        selectedOffset: 1,
        hoverOffset: 8,
        label: {
          normal: {
            show: false,

          }
        },
        data: inSideData
      },
    ]
  } : getTips()
}


// 车场态势
const pieBasicDoughnut = (data = [], color = [], unit = '个', radius = ['50%', '50%']) => {
  // console.log(data)
  return data && data.length ? {
    tooltip: {
      trigger: 'item',
      confine: true,
      // alwaysShowContent: false, // 默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。
      formatter: (params) => {
        return `${params.name}<br/>${params.percent}%<br/>${thousandBitSeparator(params.value)}${unit}`
      },
    },

    series: [
      {
        type: 'pie',
        radius: radius,
        avoidLabelOverlap: false,
        center: ['50%', '45%'],
        color: color,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: false
          }
        },
        data: data
      }
    ]

  } : getTips()
}
// 阴影嵌套甜甜圈
const pieNestDoughnut = (data = [], color = [], unit = '', orient = 'vertical', icon = 'ring', radius = ['44%', '52%']) => {
  data.map(item => { item.selected = true })
  let iconRing = 'path://M8.000,16.000 C3.582,16.000 -0.000,12.418 -0.000,8.000 C-0.000,3.582 3.582,-0.000 8.000,-0.000 C12.418,-0.000 16.000,3.582 16.000,8.000 C16.000,12.418 12.418,16.000 8.000,16.000 ZM8.000,3.000 C5.239,3.000 3.000,5.239 3.000,8.000 C3.000,10.761 5.239,13.000 8.000,13.000 C10.761,13.000 13.000,10.761 13.000,8.000 C13.000,5.239 10.761,3.000 8.000,3.000 Z'
  let dataLegend = data.map(item => ({
    name: item.name,
    icon: icon == 'ring' ? iconRing : 'rect'
  }))
  let inData = [];
  data.forEach(item => {
    let obj = item.value;
    inData.push(obj)
  })
  return data && data.length ? {
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: `{b}<br/>{c}${unit}（{d}%）`,
      backgroundColor: 'rgba(0, 0, 0, .4)',
      padding: [6, 10, 6, 10],
      extraCssText: 'line-height: 18px; border-radius: 8px; text-align: left;'
    },
    legend: {
      orient: orient,
      type: 'scroll',
      left: orient === 'horizontal' ? 'center' : 'auto',
      right: orient === 'horizontal' ? 'auto' : 10,
      top: orient === 'horizontal' ? 'auto' : 'center',
      bottom: orient === 'horizontal' ? 10 : 'auto',
      padding: [5, 15],
      itemWidth: icon == 'ring' ? 12 : 20,
      itemHeight: icon == 'ring' ? 12 : 6,
      itemGap: 18,
      height: '80%',
      data: dataLegend,
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      },
      pageButtonItemGap: 0,
      pageFormatter: '{current}',
      pageIconSize: 12,
      pageIconColor: '#ffffff',
      pageIconInactiveColor: '#aaaaaa',
      pageTextStyle: {
        color: '#ffffff'
      }
    },
    series: [
      {
        type: 'pie',
        radius: radius,
        center: orient == 'horizontal' ? ['50%', '50%'] : ['50%', '55%'],
        color: color,
        selectedOffset: 1,
        hoverOffset: 8,
        label: {
          normal: {
            show: false
          }
        },
        data: data
      },
      {
        type: 'pie',
        radius: ['37%', '44%'],
        center: orient == 'horizontal' ? ['50%', '50%'] : ['50%', '55%'],
        color: '#0c1f4b',
        selectedOffset: 1,
        hoverOffset: 8,
        label: {
          normal: {
            show: false,

          }
        },
        itemStyle: {
          normal: {
            borderWidth: '2',
            borderColor: '#052144',
          }
        },
        data: inData
      },
    ]
  } : getTips()
}
// 自动切换tooptip并中间显示value饼图
const realPopulation = (data = [], color = [], unit = '个', orient = 'vertical', icon = 'ring', radius = ['40%', '50%'], lenPosition = 'center') => {
  let iconRing = 'path://M8.000,16.000 C3.582,16.000 -0.000,12.418 -0.000,8.000 C-0.000,3.582 3.582,-0.000 8.000,-0.000 C12.418,-0.000 16.000,3.582 16.000,8.000 C16.000,12.418 12.418,16.000 8.000,16.000 ZM8.000,3.000 C5.239,3.000 3.000,5.239 3.000,8.000 C3.000,10.761 5.239,13.000 8.000,13.000 C10.761,13.000 13.000,10.761 13.000,8.000 C13.000,5.239 10.761,3.000 8.000,3.000 Z'
  let dataLegend = data.map(item => ({
    name: item.name,
    icon: icon = 'ring' ? iconRing : 'rect'
  }))
  return data && data.length ? {
    tooltip: {
      show: true,
      trigger: 'item',
      confine: true,
      formatter: `{b}<br/>{c}${unit}（{d}%）`,
      backgroundColor: 'rgba(0, 0, 0, .4)',
      padding: [6, 10, 6, 10],
      extraCssText: 'line-height: 18px; border-radius: 8px; text-align: left;'
    },
    legend: {
      orient: orient,
      type: 'scroll',
      left: orient === 'horizontal' ? 'center' : 'auto',
      right: orient === 'horizontal' ? 'auto' : 10,
      top: orient === 'horizontal' ? 'auto' : lenPosition == 'center' ? 'center' : lenPosition,
      bottom: orient === 'horizontal' ? 10 : 'auto',
      padding: [5, 15],
      itemWidth: icon = 'ring' ? 12 : 20,
      itemHeight: icon = 'ring' ? 12 : 6,
      itemGap: 18,
      height: '80%',
      data: dataLegend,
      textStyle: {
        color: '#ffffff',
        fontSize: 12,
        padding: [4, 0, 0, 0]
      },
      pageButtonItemGap: 0,
      pageFormatter: '{current}',
      pageIconSize: 12,
      pageIconColor: '#ffffff',
      pageIconInactiveColor: '#aaaaaa',
      pageTextStyle: {
        color: '#ffffff'
      }
    },
    series: [
      {
        type: 'pie',
        radius: radius,
        center: orient == 'horizontal' ? ['50%', '50%'] : ['50%', '55%'],
        color: color,        
        avoidLabelOverlap: false,
        silent: true,
        label: {
          normal: {
            show: false,
            position: 'center',
          },
          emphasis: {
            show: true,
            formatter: function (params) {
              return '{a|' + params.value + '}{b|'+unit+'}\n{c|' + params.name + '}'
            },
            textStyle: {
              color: '#fff',
              fontFamily: 'Microsoft YaHei'
            },
            rich: {
              a: {
                fontSize: 18,
                lineHeight: 24
              },
              b: {
                fontSize: 12,
                padding: [0, 0, 4, 2]
              },
              c: {
                fontSize: 12
              }
            }
          },
        },        
        data: data
      }
    ]
  } : getTips()
}

const realPrice = (data = [], color = [], unit = '', orient = 'vertical', icon = 'ring', radius = ['40%', '50%'], lenPosition = 'center') => {
  let iconRing = 'path://M8.000,16.000 C3.582,16.000 -0.000,12.418 -0.000,8.000 C-0.000,3.582 3.582,-0.000 8.000,-0.000 C12.418,-0.000 16.000,3.582 16.000,8.000 C16.000,12.418 12.418,16.000 8.000,16.000 ZM8.000,3.000 C5.239,3.000 3.000,5.239 3.000,8.000 C3.000,10.761 5.239,13.000 8.000,13.000 C10.761,13.000 13.000,10.761 13.000,8.000 C13.000,5.239 10.761,3.000 8.000,3.000 Z'
  let dataLegend = data.map(item => ({
    name: item.name,
    icon: icon = 'ring' ? iconRing : 'rect'
  }))
  return data && data.length ? {
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: `{b}<br/>{c}${unit}（{d}%）`,
      backgroundColor: 'rgba(0, 0, 0, .4)',
      padding: [6, 10, 6, 10],
      extraCssText: 'line-height: 18px; border-radius: 8px; text-align: left;'
    },
    legend: {
      orient: orient,
      type: 'scroll',
      left:  'center'  ,
    
      top: 30,
      bottom: orient === 'horizontal' ? 10 : 'auto',
      padding: [5, 15],
      itemWidth: icon = 'ring' ? 12 : 20,
      itemHeight: icon = 'ring' ? 12 : 6,
      itemGap: 18,
      height: '80%',
      data: dataLegend,
      textStyle: {
        color: '#ffffff',
        fontSize: 12,
        padding: [4, 0, 0, 0]
      },
      pageButtonItemGap: 0,
      pageFormatter: '{current}',
      pageIconSize: 12,
      pageIconColor: '#ffffff',
      pageIconInactiveColor: '#aaaaaa',
      pageTextStyle: {
        color: '#ffffff'
      }
    },
    series: [
      {
        type: 'pie',
        radius: radius,
        center: orient == 'horizontal' ? ['50%', '50%'] : ['50%', '55%'],
        color: color,
        selectedOffset: 1,
        hoverOffset: 8,
        label: {
          normal: {
            show: false
          }
        },
        data: data
      }
    ]
  } : getTips()
}
export default {
  alarmPieDoughnut,
  autoChartHighlight,
  clearChartHighlight,
  atuoShowTooltip,
  clearShowTooltip,
  materialPie,
  technicalPie,
  houseDataPie,
  sexDataPie,
  defenseDataPie,
  ageDataPie,
  houseUsagePie,
  regionalPie,
  vehicleRatePie,
  pieBasic,
  pieRose,
  pieDoughnut,
  pieNested,
  // new
  EquipmentPie,
  GaragePie,
  peoplePie,
  WorkorderPie,
  vehiclesitua,
  pieDoughnuts,
  pieDoughnutCall,
  VehiAccessPie,
  pieBasicDoughnut,
  pieNestDoughnut,
  doughnutNest,
  realPopulation,
  realPrice
}
