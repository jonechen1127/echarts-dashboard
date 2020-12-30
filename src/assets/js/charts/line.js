import { getTips } from './tips.js'
import { ChangeStrToMinutes, ChangeStrToHourMinutes } from '@/assets/js/utils/dateUtil'
/** ****** 首页 ********/
// 已处置预警
/**
 * @param {*} xdata x轴
 * @param {*} ydata y轴
 * @param {*} areaColor 区域的渐变色值
 * @param {*} itemBorderColor 圆点的边框颜色
 */
const disposalChart = (xdata = [], ydata = [], areaColor, itemBorderColor, fontColor, dataZoomStyle) => {
  return xdata.length && ydata.length
    ? {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#ff9800',
            type: 'dotted'
          }
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xdata,
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisLabel: {
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        }
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        },
        splitLine: {
          // 分割线的颜色
          show: true,
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        }
      },
      grid: {
        left: '10',
        top: '30',
        right: '20',
        bottom: '54',
        containLabel: true
      },
      dataZoom: [
        {
          type: 'slider',
          xAxisIndex: 0,
          filterMode: 'empty',
          backgroundColor: dataZoomStyle.backgroundColor,
          borderColor: dataZoomStyle.borderColor,
          handleIcon: 'M8.2,13.6V3.9H6.3v9.7H3.1v14.9h3.3v9.7h1.8v-9.7h3.3V13.6H8.2z M9.7,24.4H4.8v-1.4h4.9V24.4z M9.7,19.1H4.8v-1.4h4.9V19.1z',
          handleStyle: {
            color: dataZoomStyle.handleStyle
          },
          fillerColor: dataZoomStyle.fillerColor,
          textStyle: {
            color: fontColor
          },
          left: 40,
          right: 50
        },
        {
          type: 'inside',
          xAxisIndex: 0,
          filterMode: 'empty'
        }
      ],
      series: [
        {
          data: ydata,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: areaColor[0]
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              color: fontColor,
              textStyle: {
                fontSize: 10
              }
            },
            emphasis: {
              color: '#ff9800'
            }
          },
          itemStyle: {
            normal: {
              color: '#fff',
              borderColor: itemBorderColor,
              borderWidth: 2
            },
            emphasis: {
              color: '#ff9800',
              borderColor: '#fff'
            }
          },
          areaStyle: {
            opacity: 1,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: areaColor[0] // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: areaColor[1] // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ]
    }
    : getTips()
}
// 车行记录
const lineTravel = (xdata = [], ydataA = [], ydataB = [], color = '') => {
  return xdata.length && ydataA.length && ydataB.length
    ? {
      color: ['#00c6ff', '#ff724c'],
      tooltip: {
        trigger: 'axis',
        // formatter: '时间：{b}<br/>人流量：{c0}<br/>车流量：{c1}',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#ff9800'
          }
        }
      },
      legend: {
        data: ['人', '车'],
        textStyle: {
          color: color
        },
        left: 0,
        top: -4,
        // itemWidth: 12,
        itemHeight: 10
      },
      grid: {
        left: 5,
        right: 20,
        top: 28,
        bottom: 0,
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: xdata,
          axisLine: {
            lineStyle: {
              color: '#999',
              opacity: 0.2
            }
          },
          axisLabel: {
            textStyle: {
              color: '#9e9e9e' // 坐标值得具体的颜色
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          minInterval: 1,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#d0d8df'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#9e9e9e' // 坐标值得具体的颜色
            }
          },
          splitLine: {
            // 分割线的颜色
            show: true,
            lineStyle: {
              color: '#fff',
              opacity: 0.1
            }
          }
        }
      ],
      series: [
        {
          name: '人',
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              borderWidth: 2,
              areaStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#ff7815' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#445b9c' // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                }
              },
              lineStyle: {
                normal: {
                  color: '#ff7815',
                  width: 1
                }
              }
            }
          },
          data: ydataA
        },
        {
          name: '车',
          type: 'line',
          smooth: true,
          opacity: 1,
          itemStyle: {
            normal: {
              borderWidth: 2,
              areaStyle: {
                normal: {
                  opacity: 1,
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#00c6ff' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#258eb4' // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                }
              },
              lineStyle: {
                normal: {
                  color: '#00c6ff',
                  width: 1
                }
              }
            }
          },
          data: ydataB
        }
      ]
    }
    : getTips()
}
/** ****** 首页end ********/
/** ****** 项目数据信息 ********/
// 人行记录
const peopleChart = (xdata = [], ydata = [], areaColor, itemBorderColor, fontColor, dataZoomStyle) => {
  return xdata.length && ydata.length
    ? {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xdata,
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisLabel: {
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        }
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        },
        splitLine: {
          // 分割线的颜色
          show: true,
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        }
      },
      grid: {
        left: '2%',
        top: '10%',
        right: '4%',
        bottom: '20%',
        containLabel: true
      },
      dataZoom: [
        {
          type: 'slider',
          xAxisIndex: 0,
          filterMode: 'empty',
          backgroundColor: dataZoomStyle.backgroundColor,
          borderColor: dataZoomStyle.borderColor,
          handleIcon: 'M8.2,13.6V3.9H6.3v9.7H3.1v14.9h3.3v9.7h1.8v-9.7h3.3V13.6H8.2z M9.7,24.4H4.8v-1.4h4.9V24.4z M9.7,19.1H4.8v-1.4h4.9V19.1z',
          handleStyle: {
            color: dataZoomStyle.handleStyle
          },
          fillerColor: dataZoomStyle.fillerColor,
          textStyle: {
            color: fontColor
          }
        },
        {
          type: 'inside',
          xAxisIndex: 0,
          filterMode: 'empty'
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#ff9800',
            type: 'dotted'
          }
        }
      },
      series: [
        {
          data: ydata,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: areaColor[0]
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              color: fontColor,
              textStyle: {
                fontSize: 10
              }
            },
            emphasis: {
              color: '#ff9800'
            }
          },
          itemStyle: {
            normal: {
              color: '#fff',
              borderColor: itemBorderColor,
              borderWidth: 2
            },
            emphasis: {
              color: '#ff9800',
              borderColor: '#fff'
            }
          },
          areaStyle: {
            opacity: 1,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: areaColor[0] // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: areaColor[1] // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ]
    }
    : getTips()
}
// 车行记录
const travelChart = (xdata = [], ydataA = [], ydataB = [], color = '') => {
  return xdata.length && ydataA.length && ydataB
    ? {
      color: ['#00c6ff', '#ff724c'],
      tooltip: {
        trigger: 'axis',
        formatter: '时间：{b}<br/>进：{c0}辆 / 出：{c1}辆',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: 'rgba(255, 255, 255, .2)',
            width: 2
          }
        },
        textStyle: {
          color: '#fff',
          fontSize: 12
        }
        // backgroundColor: 'rgba(219, 108, 69, .8)'
      },
      legend: {
        data: [
          {
            name: '进',
            // 强制设置图形为圆。
            icon: 'roundRect'
            // 设置文本为红
          },
          {
            name: '出',
            // 强制设置图形为圆。
            icon: 'roundRect'
            // 设置文本为红
          }
        ],
        right: '10%',
        top: '1%',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: color,
          padding: [2, 0, 0, 0]
        }
      },
      grid: {
        left: 5,
        right: 20,
        top: 30,
        bottom: 10,
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: xdata,
          axisLine: {
            lineStyle: {
              color: '#999',
              opacity: 0.2
            }
          },
          axisLabel: {
            textStyle: {
              color: '#9e9e9e' // 坐标值得具体的颜色
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          minInterval: 1,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#d0d8df'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#9e9e9e' // 坐标值得具体的颜色
            }
          },
          splitLine: {
            // 分割线的颜色
            show: true,
            lineStyle: {
              color: '#999',
              opacity: 0.2
            }
          }
        }
      ],
      series: [
        {
          name: '进',
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              borderWidth: 2,
              areaStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#ffd800' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#ea405a' // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                }
              },
              lineStyle: {
                color: '#01c0dd',
                width: 3
              }
            }
          },
          data: ydataA
        },
        {
          name: '出',
          type: 'line',
          smooth: true,
          opacity: 1,
          itemStyle: {
            normal: {
              areaStyle: {
                borderWidth: 2,
                normal: {
                  opacity: 1,
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#85fbc8' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#27cdeb' // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                }
              },
              lineStyle: {
                color: '#ff9000',
                width: 3
              }
            }
          },
          data: ydataB
        }
      ]
    }
    : getTips()
}
/** ****** 项目数据信息end ********/
/** ****** 房屋数据信息 ********/
const quantityChart = (xdata = [], ydata = [], areaColor, itemBorderColor, fontColor, name = '') => {
  return xdata.length && ydata.length
    ? {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xdata,
        axisTick: {
          inside: true
        },
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisLabel: {
          // rotate: '-30',
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        }
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisLabel: {
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        },
        splitLine: {
          // 分割线的颜色
          show: true,
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        }
      },
      grid: {
        left: '2%',
        top: '10%',
        right: '2%',
        bottom: '10%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#ff9800',
            type: 'dotted'
          }
        }
      },
      series: [
        {
          name: name,
          data: ydata,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: areaColor[0]
          },
          label: {
            normal: {
              show: false,
              position: 'top',
              color: fontColor,
              textStyle: {
                fontSize: 10
              }
            },
            emphasis: {
              color: '#ff9800'
            }
          },
          itemStyle: {
            normal: {
              color: itemBorderColor,
              borderColor: itemBorderColor,
              borderWidth: 2
            },
            emphasis: {
              color: '#ff9800',
              borderColor: '#fff'
            }
          },
          areaStyle: {
            opacity: 0.5,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: areaColor[0] // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: areaColor[1] // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ]
    }
    : getTips()
}
/** ******房屋数据信息end ********/
/** ****** 房屋数据信息 ********/
const specialQuantityChart = (xdata = [], ydata1, ydata2, totaldata = [], legend = [], areaColor, itemBorderColor, fontColor) => {
  let ledData = legend.map(item => ({
    name: item,
    icon: 'roundRect'
  }))
  return xdata.length && ydata1.length & ydata2.length
    ? {
      legend: {
        data: ledData,
        right: '10%',
        top: '1%',
        itemWidth: 12,
        itemHeight: 12,
        textStyle: {
          color: fontColor,
          padding: [2, 0, 0, 0]
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xdata,
        axisTick: {
          inside: true
        },
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisLabel: {
          rotate: '-30',
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        }
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisLabel: {
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        },
        splitLine: {
          // 分割线的颜色
          show: true,
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        }
      },
      grid: {
        left: '2%',
        top: '12%',
        right: '6%',
        bottom: '10%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#ff9800',
            type: 'dotted'
          }
        },
        formatter: function (params) {
          let arr = [params[0].name + ' ( 总数 ：' + totaldata[params[0].dataIndex] + ' )']
          params.map(item => {
            arr.push(item.marker + item.seriesName + ' : ' + item.data)
          })
          return arr.join('<br/>')
        }
      },
      series: [
        {
          name: '关注人员',
          data: ydata1,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#0c96ed' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#1259ef' // 100% 处的颜色
                }
              ]
            }
          },
          label: {
            normal: {
              show: false,
              position: 'top',
              color: fontColor,
              textStyle: {
                fontSize: 10
              }
            },
            emphasis: {
              color: '#ff9800'
            }
          },
          itemStyle: {
            normal: {
              color: itemBorderColor[0],
              borderColor: itemBorderColor[0],
              borderWidth: 2
            },
            emphasis: {
              color: itemBorderColor[0],
              borderColor: '#fff'
            }
          },
          areaStyle: {
            opacity: 0.5,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: areaColor[0][0] // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: areaColor[0][1] // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        },
        {
          name: '关爱人员',
          data: ydata2,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#75bf81' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#D5D5BD' // 100% 处的颜色
                }
              ]
            }
          },
          label: {
            normal: {
              show: false,
              position: 'top',
              color: fontColor,
              textStyle: {
                fontSize: 10
              }
            },
            emphasis: {
              color: '#ff9800'
            }
          },
          itemStyle: {
            normal: {
              color: itemBorderColor[1],
              borderColor: itemBorderColor[1],
              borderWidth: 2
            },
            emphasis: {
              color: itemBorderColor[1],
              borderColor: '#fff'
            }
          },
          areaStyle: {
            opacity: 0.5,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: areaColor[1][0] // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: areaColor[1][1] // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ]
    }
    : getTips()
}
/** ******房屋数据信息end ********/
/** ****** 车辆信息 ********/
const vehicleQuantityChart = (xdata = [], ydata = [], areaColor, itemBorderColor, fontColor) => {
  return xdata.length && ydata.length
    ? {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xdata,
        axisTick: {
          inside: true
        },
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisLabel: {
          rotate: '-10',
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        }
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisLabel: {
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        },
        splitLine: {
          // 分割线的颜色
          show: true,
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        }
      },
      grid: {
        left: '2%',
        top: '10%',
        right: '5%',
        bottom: '8%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#ff9800',
            type: 'dotted'
          }
        }
      },
      series: [
        {
          data: ydata,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: areaColor[0]
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              color: fontColor,
              textStyle: {
                fontSize: 10
              }
            },
            emphasis: {
              color: '#ff9800'
            }
          },
          itemStyle: {
            normal: {
              color: '#fff',
              borderColor: itemBorderColor,
              borderWidth: 2
            },
            emphasis: {
              color: '#ff9800',
              borderColor: '#fff'
            }
          },
          areaStyle: {
            opacity: 0.5,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: areaColor[0] // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: areaColor[1] // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ]
    }
    : getTips()
}
/** ******车辆信息end ********/
/** ****** 项目 ********/
// 特殊人群
const houseStatsChart = (xdata = [], ydata1 = [], ydata2 = [], ydata3 = [], areaColor, fontColor, dataZoomStyle) => {
  return xdata.length && ydata1.length && ydata2.length
    ? {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xdata,
        axisTick: {
          inside: true
        },
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisLabel: {
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        }
      },
      legend: {
        data: [{ name: '重点关注', icon: 'roundRect' }, { name: '重点关爱', icon: 'roundRect' }, { name: '关注与关爱', icon: 'roundRect' }],
        right: '4%',
        itemWidth: 14,
        itemHeight: 14,
        textStyle: {
          color: fontColor,
          padding: [2, 0, 0, 0]
        }
      },
      dataZoom: [
        {
          type: 'slider',
          xAxisIndex: 0,
          left: '8%',
          right: '8%',
          filterMode: 'empty',
          backgroundColor: dataZoomStyle.backgroundColor,
          borderColor: dataZoomStyle.borderColor,
          handleIcon: 'M8.2,13.6V3.9H6.3v9.7H3.1v14.9h3.3v9.7h1.8v-9.7h3.3V13.6H8.2z M9.7,24.4H4.8v-1.4h4.9V24.4z M9.7,19.1H4.8v-1.4h4.9V19.1z',
          handleStyle: {
            color: dataZoomStyle.handleStyle
          },
          fillerColor: dataZoomStyle.fillerColor,
          textStyle: {
            color: fontColor,
            fontSize: 10
          }
        },
        {
          type: 'inside',
          xAxisIndex: 0,
          filterMode: 'empty'
        }
      ],
      yAxis: {
        type: 'value',
        minInterval: 1,
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisLabel: {
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        },
        splitLine: {
          // 分割线的颜色
          show: true,
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        }
      },
      grid: {
        left: '2%',
        top: '14%',
        right: '4%',
        bottom: '20%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#ff9800',
            type: 'dotted'
          }
        }
      },
      series: [
        {
          name: '重点关注',
          data: ydata1,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: areaColor[0]
          },
          itemStyle: {
            normal: {
              color: areaColor[0],
              borderColor: areaColor[0],
              borderWidth: 2
            },
            emphasis: {
              color: '#ff9800',
              borderColor: '#fff'
            }
          },
          areaStyle: {
            opacity: 0
          }
        },
        {
          name: '重点关爱',
          data: ydata2,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: areaColor[1]
          },
          itemStyle: {
            normal: {
              color: areaColor[1],
              borderColor: areaColor[1],
              borderWidth: 2
            },
            emphasis: {
              color: '#ff9800',
              borderColor: '#fff'
            }
          },
          areaStyle: {
            opacity: 0
          }
        },
        {
          name: '关注与关爱',
          data: ydata3,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: areaColor[2]
          },
          itemStyle: {
            normal: {
              color: areaColor[2],
              borderColor: areaColor[2],
              borderWidth: 2
            },
            emphasis: {
              color: '#ff9800',
              borderColor: '#fff'
            }
          },
          areaStyle: {
            opacity: 0
          }
        }
      ]
    }
    : getTips()
}
/** ******项目end ********/

/**
  图表名称：基础折线图
  参数说明：
  - category：类目，数据格式为['00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00']
  - data：数值，数据格式为[{seriesName:'进',data:[20,40,20,40,20,40,20,40,20,40,20,40]},{seriesName:'出',data:[30,60,30,60,30,60,30,60,30,60,30,60]}]
  - color：颜色，取值为空数组时表示使用指定的渐变色填充，数据格式为['#0fb5eb','#f7c000']
  - grid：边距，依次为上右下左，数据格式为[30,15,15,15]
  - unit：计量单位
  - rotate：文字旋转角度
  - fontcolor: 标签文字颜色
  - showLegend: 是否显示图例
  - legendPosition: 图例位置
  - showxAxisLabel：是否显示x轴lable
  - symbolSize：折线图上圆点大小
**/
const lineBasic = (
  category = [],
  data = [],
  color = [],
  grid = [30, 15, 15, 15],
  unit = [],
  rotate = -15,
  fontcolor = '#fff',
  showLegend = true,
  legendPosition,
  showxAxisLabel = true,
  symbolSize = 6,
  xLineStyle = { type: 'solid', color: 'rgba(255, 255, 255, 0.2)' }
) => {
  legendPosition = legendPosition || { right: grid[1], top: 0 }
  return {
    color: color,
    legend: {
      show: data.length > 1 && showLegend,
      ...legendPosition,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 18,
      data: data.map(item => ({ name: item.seriesName, icon: 'roundRect' })),
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      },
      formatter: function (params) {
        if (params.length) {
          let temparr = params[0].name
          params.forEach((item, index) => {
            temparr += `<br/>${item.seriesName}：${item.value}${unit[index]}`
          })
          return temparr
        } else {
          return `${params.name}：${params.value}${unit[0]}`
        }
      },
      backgroundColor: 'rgba(0, 0, 0, .4)',
      padding: [6, 10, 6, 10],
      position: 'top',
      extraCssText: 'line-height: 20px; border-radius: 8px; text-align: left; margin-top: 10px;'
    },
    grid: {
      top: grid[0],
      right: grid[1],
      bottom: grid[2],
      left: grid[3],
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: category,
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            ...xLineStyle
          }
        },
        axisTick: {
          show: true,
          inside: true,
          alignWithLabel: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        axisLabel: {
          show: showxAxisLabel,
          interval: 0,
          rotate: rotate,
          margin: 12,
          color: fontcolor
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        minInterval: 1,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.5)'
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'solid',
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    ],
    series: data.map((item, index) => ({
      name: item.seriesName,
      type: 'line',
      symbolSize: symbolSize,
      smooth: true,
      data: item.data
    }))
  }
}

/**
  图表名称：类目折线图
  参数说明：
  - xcategory：X轴类目，数据格式为['00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00']
  - ycategory：Y轴类目，数据格式为['00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00']
  - data：数值，数据格式为[{seriesName:'进',data:[20,40,20,40,20,40,20,40,20,40,20,40]},{seriesName:'出',data:[30,60,30,60,30,60,30,60,30,60,30,60]}]
  - color：颜色，取值为空数组时表示使用指定的渐变色填充，数据格式为['#0fb5eb','#f7c000']
  - grid：边距，依次为上右下左，数据格式为[30,15,15,15]
  - unit：计量单位
  - rotate：文字旋转角度
  - fontcolor: 标签文字颜色
  - showLegend: 是否显示图例
  - legendPosition: 图例位置
**/
const lineCategory = (xcategory = [], ycategory = [], data = [], color = [], grid = [30, 15, 15, 15], unit = [], rotate = -15, fontcolor = '#fff', showLegend = true, legendPosition) => {
  legendPosition = legendPosition || { right: grid[1], top: 0 }
  return {
    color: color,
    legend: {
      show: data.length > 1 && showLegend,
      ...legendPosition,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 18,
      data: data.map(item => ({ name: item.seriesName, icon: 'roundRect' })),
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      },
      formatter: function (params) {
        if (params.length) {
          let temparr = params[0].name
          params.forEach((item, index) => {
            temparr += `<br/>${item.seriesName}：${item.value}${unit[index]}`
          })
          return temparr
        } else {
          return `${params.name}：${params.value}${unit[0]}`
        }
      },
      backgroundColor: 'rgba(0, 0, 0, .4)',
      padding: [6, 10, 6, 10],
      position: 'top',
      extraCssText: 'line-height: 20px; border-radius: 8px; text-align: left; margin-top: 10px;'
    },
    grid: {
      top: grid[0],
      right: grid[1],
      bottom: grid[2],
      left: grid[3],
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: xcategory,
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        axisTick: {
          show: true,
          inside: true,
          alignWithLabel: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        axisLabel: {
          rotate: rotate,
          margin: 12,
          color: fontcolor
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        data: ycategory,
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.5)'
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'solid',
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    ],
    series: data.map((item, index) => ({
      name: item.seriesName,
      type: 'line',
      symbolSize: 6,
      smooth: true,
      data: item.data
    }))
  }
}
/**
  图表名称：时间折线图
  参数说明：
  - xcategory：X轴类目，数据格式为['00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00']
  - ycategory：Y轴类目，数据格式为['00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00']
  - data：数值，数据格式为[{seriesName:'进',data:[20,40,20,40,20,40,20,40,20,40,20,40]},{seriesName:'出',data:[30,60,30,60,30,60,30,60,30,60,30,60]}]
  - color：颜色，取值为空数组时表示使用指定的渐变色填充，数据格式为['#0fb5eb','#f7c000']
  - grid：边距，依次为上右下左，数据格式为[30,15,15,15]
  - unit：计量单位
  - rotate：文字旋转角度
  - fontcolor: 标签文字颜色
  - showLegend: 是否显示图例
  - legendPosition: 图例位置
**/
const lineTime = (xcategory = [], ycategory = [], data = [], color = [], grid = [30, 15, 15, 15], unit = [], rotate = -15, fontcolor = '#fff', showLegend = true, legendPosition) => {
  let yData = ycategory.map(item => ChangeStrToMinutes(item))
  let timeData = new Array(2)
  data.map((item, i) => {
    timeData[i] = item.data.map(val => ChangeStrToMinutes(val))
  })
  legendPosition = legendPosition || { right: grid[1], top: 0 }
  return {
    color: color,
    legend: {
      show: data.length > 1 && showLegend,
      ...legendPosition,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 18,
      data: data.map(item => ({ name: item.seriesName, icon: 'roundRect' })),
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      },
      formatter: function (params) {
        if (params.length) {
          let temparr = params[0].name
          params.forEach((item, index) => {
            temparr += `<br/>${item.seriesName}：${ChangeStrToHourMinutes(item.value)}${unit[index]}`
          })
          return temparr
        } else {
          return `${params.name}：${params.value}${unit[0]}`
        }
      },
      backgroundColor: 'rgba(0, 0, 0, .4)',
      padding: [6, 10, 6, 10],
      position: 'top',
      extraCssText: 'line-height: 20px; border-radius: 8px; text-align: left; margin-top: 10px;'
    },
    grid: {
      top: grid[0],
      right: grid[1],
      bottom: grid[2],
      left: grid[3],
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: xcategory,
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        axisTick: {
          show: true,
          inside: true,
          alignWithLabel: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        axisLabel: {
          rotate: rotate,
          margin: 12,
          color: fontcolor
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        data: yData,
        minInterval: 1,
        max: yData[yData.length - 1],
        boundaryGap: false,
        interval: 120,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.5)',
          formatter: (params, i) => {
            return ycategory[i]
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'solid',
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    ],
    series: data.map((item, index) => ({
      name: item.seriesName,
      type: 'line',
      symbolSize: 10,
      smooth: true,
      data: timeData[index]
    }))
  }
}

/**
  图表名称：面积折线图
  参数说明：
  - category：类目，数据格式为['00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00']
  - data：数值，数据格式为[{seriesName:'进',data:[20,40,20,40,20,40,20,40,20,40,20,40]},{seriesName:'出',data:[30,60,30,60,30,60,30,60,30,60,30,60]}]
  - color：颜色，取值为空数组时表示使用指定的渐变色填充，数据格式为['#0fb5eb','#f7c000']
  - grid：边距，依次为上右下左，数据格式为[30,15,15,15]
  - unit：计量单位
  - rotate：文字旋转角度
  - fontcolor: 标签文字颜色
  - showLegend: 是否显示图例
  - legendPosition: 图例位置
**/
const lineArea = (category = [], data = [], color = [], grid = [30, 15, 15, 15], unit = [], rotate = -15, fontcolor = '#fff', showLegend = true, legendPosition, categoryName = '') => {
  legendPosition = legendPosition || { right: grid[1], top: 0 }
  return {
    color: color,
    legend: {
      show: data.length > 1 && showLegend,
      ...legendPosition,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 18,
      data: data.map(item => ({ name: item.seriesName, icon: 'roundRect' })),
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      },
      formatter: function (params) {
        if (params.length) {
          let temparr = categoryName + params[0].name
          params.forEach((item, index) => {
            temparr += `<br/>${item.seriesName}：${item.value}${unit[index]}`
          })
          return temparr
        } else {
          return `${params.name}：${params.value}${unit[0]}`
        }
      },
      backgroundColor: 'rgba(0, 0, 0, .4)',
      padding: [6, 10, 6, 10],
      position: 'top',
      extraCssText: 'line-height: 20px; border-radius: 8px; text-align: left; margin-top: 10px;'
    },
    grid: {
      top: grid[0],
      right: grid[1],
      bottom: grid[2],
      left: grid[3],
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: category,
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        axisTick: {
          show: true,
          inside: true,
          alignWithLabel: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        axisLabel: {
          rotate: rotate,
          margin: 12,
          color: fontcolor
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        minInterval: 1,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.5)'
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'solid',
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    ],
    series: data.map((item, index) => ({
      name: item.seriesName,
      type: 'line',
      smooth: true,
      data: item.data,
      symbol: 'circle',
      showSymbol: false,
      itemStyle: {
        borderColor: '#fff'
      },
      symbolSize: 6,
      areaStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: color[index]
              },
              {
                offset: 1,
                color: 'transparent'
              }
            ],
            global: false
          }
        }
      }
    }))
  }
}
/**
  图表名称：水电折线图
  参数说明：
  - category：类目，数据格式为['00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00']
  - data：数值，数据格式为[{seriesName:'进',data:[20,40,20,40,20,40,20,40,20,40,20,40]},{seriesName:'出',data:[30,60,30,60,30,60,30,60,30,60,30,60]}]
  - color：颜色，取值为空数组时表示使用指定的渐变色填充，数据格式为['#0fb5eb','#f7c000']
  - grid：边距，依次为上右下左，数据格式为[30,15,15,15]
  - unit：计量单位
  - rotate：文字旋转角度
  - fontcolor: 标签文字颜色
  - showLegend: 是否显示图例
  - legendPosition: 图例位置
  - showxAxisLabel：是否显示x轴lable
  - symbolSize：折线图上圆点大小
**/
const lineUsage = (category = [], data = [], color = [], grid = [30, 15, 15, 15], unit = [], rotate = -15, type) => {
  let xAxis = type === 'vistors' ? category.map(item => item.split('-')[1] + '-' + item.split('-')[2]) : category.map(item => item.split('年')[1])
  return {
    color: color,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      },
      formatter: function (params) {
        if (params.length) {
          let temparr = category[params[0].dataIndex]
          params.forEach((item, index) => {
            temparr += `<br/>${item.seriesName}：${item.value}${unit[index]}`
          })
          return temparr
        } else {
          return `${params.name}：${params.value}${unit[0]}`
        }
      },
      backgroundColor: 'rgba(0, 0, 0, .4)',
      padding: [6, 10, 6, 10],
      position: 'top',
      extraCssText: 'line-height: 20px; border-radius: 8px; text-align: left; margin-top: 10px;'
    },
    grid: {
      top: grid[0],
      right: grid[1],
      bottom: grid[2],
      left: grid[3],
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: xAxis,
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        axisTick: {
          show: true,
          inside: true,
          alignWithLabel: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        axisLabel: {
          show: true,
          rotate: rotate,
          margin: 12,
          color: '#fff'
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        minInterval: 1,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.5)'
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'solid',
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    ],
    series: data.map((item, index) => ({
      name: item.seriesName,
      type: 'line',
      symbolSize: 6,
      smooth: true,
      data: item.data
    }))
  }
}
const barOptionBar = (xdata = [], ydata1, ydata2, ydata3, totaldata = [], legend = [], areaColors, itemBorderColor, fontColor) => {
  let ledData = legend.map(item => ({
    name: item
  }))
  return xdata.length && ydata1.length & ydata2.length & ydata3.length ? {
    legend: {
      icon: 'roundRect',
      data: ledData,
      y: 5,
      top: '10',
      right: '20',
      bottom: '',
      itemWidth: 15,
      itemHeight: 9,
      itemGap: 10,
      textStyle: {
        color: fontColor,
        fontSize: 12
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xdata,
      axisTick: {
        inside: true
      },
      axisLine: {
        lineStyle: {
          color: '#999',
          opacity: 0.2
        }
      },
      axisLabel: {
        // rotate: '180',
        textStyle: {
          color: '#9e9e9e', // 坐标值得具体的颜色
          fontSize: 12
        }
      }
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#999',
          opacity: 0.2
        }
      },
      axisLabel: {
        textStyle: {
          color: '#9e9e9e', // 坐标值得具体的颜色
          fontSize: 12
        }
      },
      splitLine: { // 分割线的颜色
        show: true,
        lineStyle: {
          color: '#999',
          opacity: 0.2
        }
      }
    },
    grid: {
      left: '36',
      // top: '20',
      right: '40',
      bottom: '1',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      },
      formatter: function (params) {
        let arr = [params[0].name]
        params.map(item => { arr.push(item.marker + item.seriesName + ' : ' + item.data) })
        return arr.join('<br/>')
      }
    },
    series: [
      {
        name: legend[0],
        data: ydata1,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        showSymbol: false,
        symbolSize: 6,
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            color: areaColors[0],
            opacity: 0.2
          }
        },
        label: {
          normal: {
            show: false,
            position: 'top',
            color: fontColor,
            textStyle: {
              fontSize: 10
            }
          },
          emphasis: {
            color: '#ff9800'
          }
        },
        itemStyle: {
          normal: {
            color: itemBorderColor[0], // 拐点圆的颜色
            lineStyle: {
              color: itemBorderColor[0] // 折线线条颜色
            }
          }
        },
        areaStyle: {
          opacity: 0.5,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,

            colorStops: [
              {
                offset: 0,
                color: areaColors[0]
              },
              {
                offset: 0.5,
                color: areaColors[1]
              },
              {
                offset: 1,
                color: areaColors[2]
              }
            ],
            global: false // 缺省为 false
          }
        }
      },
      {
        name: legend[1],
        data: ydata2,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        showSymbol: false,
        symbolSize: 6,
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            color: areaColors[3],
            opacity: 0.2
          }
        },
        label: {
          normal: {
            show: false,
            position: 'top',
            color: fontColor,
            textStyle: {
              fontSize: 10
            }
          },
          emphasis: {
            color: '#ffffff'
          }
        },
        itemStyle: {
          normal: {
            color: itemBorderColor[1], // 拐点圆的颜色
            lineStyle: {
              color: itemBorderColor[1] // 折线线条颜色
            }
          }
        },
        areaStyle: {
          opacity: 0.5,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: areaColors[3]
              },
              {
                offset: 0.5,
                color: areaColors[4]
              },
              {
                offset: 1,
                color: areaColors[5]
              }
            ],
            global: false // 缺省为 false
          }
        }
      },
      {
        name: legend[2],
        data: ydata3,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        showSymbol: false,
        symbolSize: 6,
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            color: areaColors[3],
            opacity: 0.2
          }
        },
        label: {
          normal: {
            show: false,
            position: 'top',
            color: fontColor,
            textStyle: {
              fontSize: 10
            }
          },
          emphasis: {
            color: '#ffffff'
          }
        },
        itemStyle: {
          normal: {
            color: itemBorderColor[2], // 拐点圆的颜色
            lineStyle: {
              color: itemBorderColor[2] // 折线线条颜色
            }
          }
        },
        areaStyle: {
          opacity: 0.5,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: areaColors[6]
              },
              {
                offset: 0.5,
                color: areaColors[7]
              },
              {
                offset: 1,
                color: areaColors[8]
              }
            ],
            global: false // 缺省为 false
          }
        }
      }
    ]
  } : getTips()
}
/** ****** 首页 ********/
/** ****** 图表名称：人流分时统计 ********/
const Pedestflow = (xdata = [], ydata1, ydata2, totaldata = [], legend = [], areaColors, itemBorderColor, fontColor) => {
  let ledData = legend.map(item => ({
    name: item
  }))
  return xdata.length && ydata1.length & ydata2.length ? {
    legend: {
      data: ledData,
      x: 5,
      top: '-3',
      left: '20',
      itemWidth: 15,
      itemHeight: 9,
      textStyle: {
        color: fontColor,
        fontSize: 12
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xdata,
      axisTick: {
        inside: true
      },
      axisLine: {
        lineStyle: {
          color: '#999',
          opacity: 0.2
        }
      },
      axisLabel: {
        rotate: '-30',
        textStyle: {
          color: '#9e9e9e', // 坐标值得具体的颜色
          fontSize: 12
        }
      }
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#999',
          opacity: 0.2
        }
      },
      axisLabel: {
        textStyle: {
          color: '#9e9e9e', // 坐标值得具体的颜色
          fontSize: 12
        }
      },
      splitLine: { // 分割线的颜色
        show: true,
        lineStyle: {
          color: '#999',
          opacity: 0.2
        }
      }
    },
    grid: {
      left: '10',
      top: '20',
      right: '15',
      bottom: '8',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      },
      formatter: function (params) {
        let arr = [params[0].name]
        params.map(item => { arr.push(item.marker + item.seriesName + ' : ' + item.data) })
        return arr.join('<br/>')
      }
    },
    series: [
      {
        name: legend[0],
        data: ydata1,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        showSymbol: false,
        symbolSize: 6,
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            color: areaColors[0],
            opacity: 0.2
          }
        },
        label: {
          normal: {
            show: false,
            position: 'top',
            color: fontColor,
            textStyle: {
              fontSize: 10
            }
          },
          emphasis: {
            color: '#ff9800'
          }
        },
        itemStyle: {
          normal: {
            color: itemBorderColor[0], // 拐点圆的颜色
            lineStyle: {
              color: itemBorderColor[0] // 折线线条颜色
            }
          }
        },
        areaStyle: {
          opacity: 0.5,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,

            colorStops: [
              {
                offset: 0,
                color: areaColors[0]
              },
              {
                offset: 0.5,
                color: areaColors[1]
              },
              {
                offset: 1,
                color: areaColors[2]
              }
            ],
            global: false // 缺省为 false
          }
        }
      },
      {
        name: legend[1],
        data: ydata2,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        showSymbol: false,
        symbolSize: 6,
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            color: areaColors[3],
            opacity: 0.2
          }
        },
        label: {
          normal: {
            show: false,
            position: 'top',
            color: fontColor,
            textStyle: {
              fontSize: 10
            }
          },
          emphasis: {
            color: '#ffffff'
          }
        },
        itemStyle: {
          normal: {
            color: itemBorderColor[1], // 拐点圆的颜色
            lineStyle: {
              color: itemBorderColor[1] // 折线线条颜色
            }
          }
        },
        areaStyle: {
          opacity: 0.5,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: areaColors[3]
              },
              {
                offset: 0.5,
                color: areaColors[4]
              },
              {
                offset: 1,
                color: areaColors[5]
              }
            ],
            global: false // 缺省为 false
          }
        }
      }
    ]
  } : getTips()
}
/** ****** 图表名称：运营管理预警任务分析 ********/
const warningTasks = (xdata = [], ydata = [], areaColor = [], itemBorderColor, fontColor, name = '') => {
  return xdata.length && ydata.length
    ? {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xdata,
        axisTick: {
          inside: true
        },
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisLabel: {
          // rotate: '-30',
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        }
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisLabel: {
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        },
        splitLine: {
          // 分割线的颜色
          show: true,
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        }
      },
      grid: {
        left: 0,
        top: '10%',
        right: '2%',
        bottom: '10%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#0370b1',
            type: 'dotted'
          }
        }
      },
      series: [
        {
          name: name,
          data: ydata,
          type: 'line',
          // smooth: true,
          showSymbol: false,
          lineStyle: {
            color: areaColor[0]
          },
          label: {
            normal: {
              show: false,
              position: 'top',
              color: fontColor,
              textStyle: {
                fontSize: 10
              }
            },
            emphasis: {
              color: '#0370b1'
            }
          },
          itemStyle: {
            normal: {
              color: itemBorderColor,
              borderColor: itemBorderColor,
              borderWidth: 2
            },
            emphasis: {
              color: '#fff',
              borderColor: '#0370b1'
            }
          },
          areaStyle: {
            opacity: 0.5,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: areaColor[0] // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: areaColor[1] // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ]
    }
    : getTips()
}
const warningTaskss = (xdata = [], ydata = [], areaColor = [], itemBorderColor, fontColor, name = '') => {
  return xdata.length && ydata.length
    ? {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xdata,
        axisTick: {
          inside: true
        },
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisLabel: {
          // rotate: '-30',
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        }
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisLabel: {
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        },
        splitLine: {
          // 分割线的颜色
          show: true,
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        }
      },
      grid: {
        left: 0,
        top: '10%',
        right: '2%',
        bottom: '10%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#0370b1',
            type: 'dotted'
          }
        }
      },
      series: [
        {
          name: name,
          data: ydata,
          type: 'line',
          // smooth: true,
          showSymbol: false,
          lineStyle: {
            color: areaColor[0]
          },
          label: {
            normal: {
              show: false,
              position: 'top',
              color: fontColor,
              textStyle: {
                fontSize: 10
              }
            },
            emphasis: {
              color: '#0370b1'
            }
          },
          itemStyle: {
            normal: {
              color: itemBorderColor,
              borderColor: itemBorderColor,
              borderWidth: 2
            },
            emphasis: {
              color: '#fff',
              borderColor: '#0370b1'
            }
          },
          areaStyle: {
            opacity: 0.5,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: areaColor[0] // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: areaColor[1] // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ]
    }
    : getTips()
}
/** ****** 图表名称：运营管理人流分析 ********/
const personFlowEchart = (xdata = [], ydata = [], areaColor, itemBorderColor, fontColor, name = '') => {
  return xdata.length && ydata.length
    ? {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xdata,
        axisTick: {
          inside: true
        },
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisLabel: {
          // rotate: '-30',
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        }
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisLabel: {
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        },
        splitLine: {
          // 分割线的颜色
          show: true,
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        }
      },
      grid: {
        left: 0,
        top: '10%',
        right: '2%',
        bottom: '10%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#0370b1',
            type: 'dotted'
          }
        }
      },
      series: [
        {
          name: name,
          data: ydata,
          type: 'line',
          smooth: true,
          showSymbol: false,
          lineStyle: {
            color: areaColor[0]
          },
          label: {
            normal: {
              show: false,
              position: 'top',
              color: fontColor,
              textStyle: {
                fontSize: 10
              }
            },
            emphasis: {
              color: '#0370b1'
            }
          },
          itemStyle: {
            normal: {
              color: itemBorderColor,
              borderColor: itemBorderColor,
              borderWidth: 2
            },
            emphasis: {
              color: '#fff',
              borderColor: '#0370b1'
            }
          },
          areaStyle: {
            opacity: 0.5,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: areaColor[0] // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: areaColor[1] // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ]
    }
    : getTips()
}
// 运营管理人流分析
const personFlowEcharts = (xdata = [], ydata = [], areaColor, itemBorderColor, fontColor, yData1, xData1) => {
  return xdata.length && ydata.length
    ? {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xdata,
        axisTick: {
          inside: true
        },
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisLabel: {
          // rotate: '-30',
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        }
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisLabel: {
          textStyle: {
            color: '#9e9e9e', // 坐标值得具体的颜色
            fontSize: 12
          }
        },
        splitLine: {
          // 分割线的颜色
          show: true,
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        }
      },
      grid: {
        left: 0,
        top: '10%',
        right: '2%',
        bottom: '10%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#0370b1',
            type: 'dotted'
          }
        },
        formatter: function (params) {
          return [params[0].name + '</br>' + '总流量 ：' + params[0].data + ' 万次' + '</br>' + '入口 ：' + yData1[params[0].dataIndex] + ' 万次' + '</br>' + '出口 ：' + xData1[params[0].dataIndex]] + ' 万次'
        }
      },
      series: [
        {
          name: '总流量',
          data: ydata,
          type: 'line',
          smooth: true,
          showSymbol: false,
          lineStyle: {
            color: areaColor[0]
          },
          label: {
            normal: {
              show: false,
              position: 'top',
              color: fontColor,
              textStyle: {
                fontSize: 10
              }
            },
            emphasis: {
              color: '#0370b1'
            }
          },
          itemStyle: {
            normal: {
              color: itemBorderColor,
              borderColor: itemBorderColor,
              borderWidth: 2
            },
            emphasis: {
              color: '#fff',
              borderColor: '#0370b1'
            }
          },
          areaStyle: {
            opacity: 0.5,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: areaColor[0] // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: areaColor[1] // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ]
    }
    : getTips()
}
export default {
  disposalChart,
  lineTravel,
  peopleChart,
  travelChart,
  quantityChart,
  vehicleQuantityChart,
  houseStatsChart,
  specialQuantityChart,
  lineBasic,
  lineTime,
  lineCategory,
  lineArea,
  lineUsage,
  Pedestflow,
  warningTasks,
  personFlowEchart,
  barOptionBar,
  personFlowEcharts,
  warningTaskss
}
