/* 关键词柱状图 */
import { getTips } from './tips.js';
/** *** 首页 *****/
// const defenseBar = (xdata = [], ydata = [], color) => {
//   return xdata.length && ydata.length ? {
//     color: {
//       type: 'linear',
//       x: 0,
//       y: 0,
//       x2: 0,
//       y2: 1,
//       colorStops: [{
//         offset: 0,
//         color: color[0] // 0% 处的颜色
//       }, {
//         offset: 1,
//         color: color[1] // 100% 处的颜色
//       }],
//       global: false // 缺省为 false
//     },
//     tooltip: {
//       trigger: 'axis',
//       axisPointer: { // 坐标轴指示器，坐标轴触发有效
//         type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
//       }
//     },
//     grid: {
//       left: '2%',
//       top: '10%',
//       right: 0,
//       bottom: '4%',
//       containLabel: true
//     },
//     xAxis: [{
//       type: 'category',
//       data: xdata,
//       axisTick: {
//         alignWithLabel: true,
//         interval: 0
//       },
//       axisLine: {
//         lineStyle: {
//           color: '#999',
//           opacity: 0.2
//         }
//         // lineStyle: {
//         //   color: '#d0d8df'
//         // }
//       },
//       axisLabel: {
//         interval: 0,
//         textStyle: {
//           color: '#9e9e9e' // 坐标值得具体的颜色

//         }
//       }
//     }],
//     yAxis: [{
//       type: 'value',
//       axisLine: {
//         show: false,
//         lineStyle: {
//           color: '#d0d8df'
//         }
//       },
//       axisTick: {
//         show: false
//       },
//       axisLabel: {
//         textStyle: {
//           color: '#9e9e9e' // 坐标值得具体的颜色
//         }
//       },
//       splitLine: {
//         show: true,
//         lineStyle: {
//           color: '#999',
//           opacity: 0.2
//         }
//       }
//     }],
//     series: [{
//       name: '数量',
//       type: 'bar',
//       barWidth: '24',
//       data: ydata
//     }]
//   } : getTips()
// }
const patrolBar = (xdata = [], ydata = [], color) => {
  return xdata.length && ydata.length
    ? {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: color[0] // 0% 处的颜色
            },
            {
              offset: 1,
              color: color[1] // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '2%',
          top: '10%',
          right: 0,
          bottom: 0,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xdata,
            axisTick: {
              alignWithLabel: true
            },
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
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#d0d8df'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#9e9e9e' // 坐标值得具体的颜色
              }
            },
            splitLine: {
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
            name: '数量',
            type: 'bar',
            barWidth: '24',
            data: ydata
          }
        ]
      }
    : getTips();
};
// 运营效率
const effBar = (xdata = [], ydata = [], color) => {
  return xdata.length && ydata.length
    ? {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: color[0] // 0% 处的颜色
            },
            {
              offset: 1,
              color: color[1] // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '2%',
          top: '20%',
          right: 0,
          bottom: 0,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xdata,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#999',
                opacity: 0.2
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff' // 坐标值得具体的颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            minInterval: 1,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#d0d8df'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#9e9e9e' // 坐标值得具体的颜色
              }
            },
            splitLine: {
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
            name: '数量',
            type: 'bar',
            barWidth: '24',
            data: ydata
          }
        ]
      }
    : getTips();
};

/** *** 首页end *****/
/** *** 项目数据信息 *****/
// 车厂数据
const carBar = (xdata = [], ydata1 = [], ydata2 = [], color, labelColor) => {
  return xdata.length
    ? {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: color[0] // 0% 处的颜色
            },
            {
              offset: 1,
              color: color[1] // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            shadowStyle: {
              opacity: 0
            }
          }
        },
        grid: {
          top: '20%',
          right: 40,
          bottom: '10%',
          containLabel: true
        },
        legend: {
          data: ['已用', '未用'],
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: labelColor
          },
          right: 0
        },
        xAxis: [
          {
            type: 'category',
            data: xdata,
            axisTick: {
              alignWithLabel: true
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
                color: '#00b5f9' // 坐标值得具体的颜色
              }
            }
          }
        ],
        yAxis: [
          {
            axisTick: {
              show: false
            },
            minInterval: 1,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#d0d8df'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#9e9e9e' // 坐标值得具体的颜色
              }
            },
            splitLine: {
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
            name: '已用',
            type: 'bar',
            barWidth: 24,
            stack: '使用情况',
            data: ydata1,
            itemStyle: {
              normal: {
                color: '#ea405a'
              },
              emphasis: {
                color: '#f28c9c'
              }
            }
          },
          {
            name: '未用',
            type: 'bar',
            barWidth: 24,
            stack: '使用情况',
            data: ydata2,
            itemStyle: {
              normal: {
                color: '#0183ff'
              },
              emphasis: {
                color: '#67b5ff'
              }
            }
          }
        ]
      }
    : getTips();
};
const matericalBar = (xdata = [], ydata = [], color) => {
  return xdata.length
    ? {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: color[0] // 0% 处的颜色
            },
            {
              offset: 1,
              color: color[1] // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },
        tooltip: {
          tooltip: {
            trigger: 'item'
          },
          formatter: '{b}: {c}'
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xdata,
            axisTick: {
              alignWithLabel: true
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
                color: '#00b5f9' // 坐标值得具体的颜色
              }
            }
          }
        ],
        yAxis: [
          {
            axisTick: {
              show: false
            },
            minInterval: 1,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#d0d8df'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#9e9e9e' // 坐标值得具体的颜色
              }
            },
            splitLine: {
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
            type: 'bar',
            barWidth: 24,
            data: ydata,
            itemStyle: {
              emphasis: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: color[0] // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#7d9afe' // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            }
          }
        ]
      }
    : getTips();
};
const specialBar = (xdata = [], ydata = [], color) => {
  return xdata.length
    ? {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: color[0] // 0% 处的颜色
            },
            {
              offset: 1,
              color: color[1] // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '8%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xdata,
            axisTick: {
              alignWithLabel: true
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
                color: '#00b5f9' // 坐标值得具体的颜色
              }
            }
          }
        ],
        yAxis: [
          {
            minInterval: 1,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#d0d8df'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#9e9e9e' // 坐标值得具体的颜色
              }
            },
            splitLine: {
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
            type: 'bar',
            barWidth: 24,
            data: ydata,
            itemStyle: {
              emphasis: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: color[0] // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#7d9afe' // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            }
          }
        ]
      }
    : getTips();
};
const technicalBar = (xdata = [], ydata = [], color) => {
  return xdata.length
    ? {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: color[0] // 0% 处的颜色
            },
            {
              offset: 1,
              color: color[1] // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xdata,
            axisTick: {
              alignWithLabel: true
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
                color: '#00b5f9' // 坐标值得具体的颜色
              }
            }
          }
        ],
        yAxis: [
          {
            axisTick: {
              show: false
            },
            minInterval: 1,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#d0d8df'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#9e9e9e' // 坐标值得具体的颜色
              }
            },
            splitLine: {
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
            type: 'bar',
            barWidth: 24,
            data: ydata,
            itemStyle: {
              emphasis: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: color[0] // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#7d9afe' // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            }
          }
        ]
      }
    : getTips();
};
const todayBar = (xdata = [], ydata = [], color) => {
  return xdata.length
    ? {
        color: {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: color[0] // 0% 处的颜色
            },
            {
              offset: 1,
              color: color[1] // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },
        tooltip: {
          trigger: 'item',
          // axisPointer: { // 坐标轴指示器，坐标轴触发有效
          //   type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          // },
          formatter: '{b}: {c}'
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: [
          {
            minInterval: 1,
            type: 'value',
            boundaryGap: [0, 0.01],
            axisTick: {
              show: true
            },
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
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#999',
                opacity: 0.2
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: xdata,
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
                color: '#00b5f9' // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: [
          {
            type: 'bar',
            barWidth: 24,
            data: ydata,
            itemStyle: {
              emphasis: {
                color: {
                  type: 'linear',
                  x: 1,
                  y: 0,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: color[0] // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#7d9afe' // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            }
          }
        ]
      }
    : getTips();
};
/** *** 项目数据信息end *****/
/** *** 房屋信息 *****/
const regionalBar = (xdata = [], ydata = [], color) => {
  return {
    color: {
      type: 'linear',
      x: 1,
      y: 0,
      x2: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: color[0] // 0% 处的颜色
        },
        {
          offset: 1,
          color: color[1] // 100% 处的颜色
        }
      ],
      global: false // 缺省为 false
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        shadowStyle: {
          opacity: 0
        }
      },
      formatter: '{b}: {c}'
    },
    grid: {
      top: '0%',
      left: '20',
      right: '40',
      bottom: '20',
      containLabel: true
    },
    xAxis: [
      {
        minInterval: 1,
        type: 'value',
        boundaryGap: [0, 0.01],
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
            color: '#9e9e9e' // 坐标值得具体的颜色
          }
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        data: xdata,
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
            color: '#ffffff' // 坐标值得具体的颜色
          }
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: '20',
        data: ydata,
        itemStyle: {
          normal: {
            barBorderRadius: [0, 9, 9, 0]
          },
          emphasis: {
            color: {
              type: 'linear',
              x: 1,
              y: 0,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: color[0] // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#7d9afe' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      }
    ]
  };
};
/** *** 房屋信息end *****/
/** *** 人口信息 *****/
const peopleAgeBar = (xdata = [], ydata1 = [], ydata2 = [], color = [], labelColor = '', width = 10) => {
  let len = {
    女性: 0,
    男性: 0
  };
  ydata1.map(item => {
    len['女性'] += item;
  });
  ydata2.map(item => {
    len['男性'] += item;
  });
  return {
    legend: {
      data: ['女性', '男性'],
      top: 40,
      itemGap: 120,
      selectedMode: false,
      itemWidth: 0,
      textStyle: {
        color: labelColor
      },
      formatter: function(name, i) {
        return name + '(' + len[name] + ')';
      }
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: '{b}<br/>{a}: {c}人',
      axisPointer: {
        type: 'line',
        lineStyle: {
          opacity: 0
        }
      }
    },
    grid: [
      {
        left: '8%',
        top: 60,
        bottom: 10,
        containLabel: true,
        width: '35%'
      },
      {
        left: '51%',
        top: 80,
        bottom: 10,
        width: '12%'
      },
      {
        right: '9%',
        top: 60,
        bottom: 10,
        containLabel: true,
        width: '35%'
      }
    ],

    xAxis: [
      {
        minInterval: 1,
        type: 'value',
        inverse: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisTick: {
          show: false
        },
        position: 'bottom',
        axisLabel: {
          show: true,
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: 12
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        }
      },
      {
        gridIndex: 1,
        type: 'value',
        color: '#ffffff',
        show: false
      },
      {
        gridIndex: 2,
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisTick: {
          show: false
        },
        position: 'bottom',
        axisLabel: {
          show: true,
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: 12
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        boundaryGap: true,
        position: 'right',
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisTick: {
          alignWithLabel: true,
          show: false
        },
        axisLabel: {
          show: false
        },
        data: xdata || []
      },
      {
        gridIndex: 1,
        type: 'category',
        boundaryGap: true,
        position: 'left',
        axisLine: {
          show: false
        },
        axisTick: {
          alignWithLabel: true,
          show: false
        },
        axisLabel: {
          show: true,
          color: '#fff',
          fontSize: 12,
          align: 'center',
          verticalAlign: 'top',
          formatter: (value, index) => {
            return `{title|${value}}`;
          },
          rich: {
            title: {
              color: '#fff',
              height: 10,
              lineHeight: 1,
              padding: [60, 0, 20, 0]
            }
          }
        },
        data: xdata || []
      },
      {
        gridIndex: 2,
        type: 'category',
        boundaryGap: true,
        position: 'left',
        axisLine: {
          lineStyle: {
            color: '#999',
            opacity: 0.2
          }
        },
        axisTick: {
          alignWithLabel: true,
          show: false
        },
        axisLabel: {
          show: false
        },
        data: xdata || []
      }
    ],
    series: [
      {
        name: '女性',
        type: 'bar',
        barWidth: width,
        barMaxWidth: 30,
        label: {
          normal: {
            show: true,
            position: 'left',
            offset: [0, 0],
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          },
          emphasis: {
            show: true,
            position: 'left',
            offset: [0, 0],
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          }
        },
        itemStyle: {
          normal: {
            color: color[0]
          }
        },
        data: ydata1 || []
      },
      {
        name: '男性',
        type: 'bar',
        barWidth: width,
        barMaxWidth: 30,
        xAxisIndex: 2,
        yAxisIndex: 2,
        label: {
          normal: {
            show: true,
            position: 'right',
            offset: [0, 0],
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          },
          emphasis: {
            show: true,
            position: 'right',
            offset: [0, 0],
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          }
        },
        itemStyle: {
          normal: {
            color: color[1]
          }
        },
        data: ydata2 || []
      }
    ]
  };
};
// 特殊人群
const houseStatsBar = (xdata = [], ydata1 = [], ydata2 = [], ydata3 = [], color, dataZoomStyle) => {
  return xdata.length && xdata
    ? {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '2%',
          top: '14%',
          right: '4%',
          bottom: '20%',
          containLabel: true
        },
        legend: {
          data: ['重点关注', '重点关爱', '关注与关爱'],
          itemHeight: 14,
          itemWidth: 14,
          textStyle: {
            color: '#fff'
          },
          right: '4%'
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
              color: color,
              fontSize: 10
            }
          },
          {
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'empty'
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: xdata,
            axisTick: {
              alignWithLabel: true
            },
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
            minInterval: 1,
            type: 'value',
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
                color: '#9e9e9e' // 坐标值得具体的颜色
              }
            },
            splitLine: {
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
            name: '重点关注',
            type: 'bar',
            barWidth: '24',
            data: ydata1,
            color: '#0fb5eb'
          },
          {
            name: '重点关爱',
            type: 'bar',
            barWidth: '24',
            data: ydata2,
            color: '#f3c22b'
          },
          {
            name: '关注与关爱',
            type: 'bar',
            barWidth: '24',
            data: ydata3,
            color: '#0febaf'
          }
        ]
      }
    : getTips();
};
// 流动人口租客房屋统计
const flowHouseStatsBar = (xdata = [], ydata1 = [], ydata2 = [], color, dataZoomStyle) => {
  return xdata.length && xdata
    ? {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '2%',
          top: '14%',
          right: '4%',
          bottom: '20%',
          containLabel: true
        },
        legend: {
          data: ['出租房屋', '租客人数'],
          itemHeight: 14,
          itemWidth: 14,
          textStyle: {
            color: '#fff'
          },
          right: '4%'
        },
        dataZoom: [
          {
            type: 'slider',
            left: '8%',
            right: '8%',
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
              color: color,
              fontSize: 10
            }
          },
          {
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'empty'
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: xdata,
            axisTick: {
              alignWithLabel: true
            },
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
                color: '#9e9e9e' // 坐标值得具体的颜色
              }
            },
            splitLine: {
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
            name: '出租房屋',
            type: 'bar',
            barWidth: '24',
            data: ydata1,
            color: '#0fb5eb'
          },
          {
            name: '租客人数',
            type: 'bar',
            barWidth: '24',
            data: ydata2,
            color: '#f3c22b'
          }
        ]
      }
    : getTips();
};
// 租客变化人数排行
const flowPeopleStatsBar = (xdata = [], ydata1 = [], ydata2 = [], color, increase) => {
  return xdata.length && xdata
    ? {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '2%',
          top: '10',
          right: '4%',
          bottom: '10',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xdata,
            axisTick: {
              alignWithLabel: true
            },
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
                color: '#9e9e9e' // 坐标值得具体的颜色
              }
            },
            splitLine: {
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
            name: '租客人数',
            type: 'bar',
            stack: '总量',
            barWidth: '24',
            data: ydata1,
            color: color[0]
          },
          {
            name: increase ? '增加' : '减少',
            type: 'bar',
            stack: '总量',
            barWidth: '24',
            data: ydata2,
            color: increase ? color[1] : color[2]
          }
        ]
      }
    : getTips();
};
/** *** 人口信息end *****/

/**
  图表名称：基础柱状图
  参数说明：
  - width：柱条宽度，默认值为38%
  - category：类目，数据格式为['人流监控','人脸识别','周界报警','智能停车','智能消防','智能烟感']
  - data：数值，数据格式为[{seriesName:'',data:[4,19,16,32,26,14]}]
  - orient：图例布局，取值为horizontal（水平布局）、vertical（垂直布局）
  - color：颜色，取值为空数组时表示使用指定的渐变色填充，数据格式为['#2885ff','#009944','#ff9000']
  - grid：边距，依次为上右下左，数据格式为[15,15,15,15]
  - unit：计量单位
  - rotate：文字旋转角度
  - fontcolor: 标签文字颜色
  - showLegend: 是否显示图例
  - legendPosition: 图例位置
**/
const barBasic = (width = '38%', category = [], data = [], orient = 'horizontal', color = [], grid = [15, 30, 20, 15], unit = [], rotate = -15, fontcolor = '#fff', showLegend = true, legendPosition, isHideLabel = false) => {
  legendPosition = legendPosition || {
    right: grid[1],
    top: 0
  };
  let categoryAxis = [
    {
      type: 'category',
      data: category,
      axisLine: {
        lineStyle: {
          color: 'rgba(158, 158, 158, .38)'
        }
      },
      axisTick: {
        show: orient === 'horizontal' && color.length,
        inside: true,
        lineStyle: {
          color: '#9e9e9e'
        }
      },
      axisLabel: {
        interval: 0,
        rotate: orient === 'horizontal' ? rotate : 0,
        margin: 12,
        color: fontcolor,
        formatter: function(params) {
          if (!isHideLabel) return params;
          let newstr = params;
          let len = newstr.length;
          if (len > 4) {
            return newstr.substring(0, 2) + '...' + newstr.substring(len - 2, len);
          } else {
            return '\n' + newstr;
          }
        }
      }
    }
  ];
  let valueAxis = [
    {
      minInterval: 1,
      axisLine: {
        lineStyle: {
          color: 'rgba(158, 158, 158, .38)'
        }
      },
      axisTick: {
        show: orient !== 'horizontal',
        inside: true,
        lineStyle: {
          color: '#9e9e9e'
        }
      },
      axisLabel: {
        color: '#9e9e9e'
      },
      splitLine: {
        show: orient === 'horizontal',
        lineStyle: {
          color: 'rgba(158, 158, 158, .38)',
          type: 'dashed'
        }
      }
    }
  ];
  return {
    legend: {
      show: data.length > 1 && showLegend,
      ...legendPosition,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 18,
      selectedMode: false,
      data: data.map(item => item.seriesName),
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          opacity: 0
        }
      },
      formatter: function(params) {
        if (params.length) {
          let temparr = params[0].name;
          params.forEach((item, index) => {
            temparr += `<br/>${item.seriesName}：${item.value}${unit[index]}`;
          });
          return temparr;
        } else {
          return `${params.name}：${params.value}${unit[0]}`;
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
    xAxis: orient === 'horizontal' ? categoryAxis : valueAxis,
    yAxis: orient === 'horizontal' ? valueAxis : categoryAxis,
    series: data.map((item, index) => ({
      name: item.seriesName,
      type: 'bar',
      barWidth: width,
      barMaxWidth: 30,

      itemStyle: {
        normal: {
          color: color.length
            ? color[index]
            : {
                type: 'linear',
                x: orient !== 'horizontal' ? 1 : 0,
                y: 0,
                x2: 0,
                y2: orient === 'horizontal' ? 1 : 0,
                colorStops: [
                  {
                    offset: 0,
                    color: '#00ffea'
                  },
                  {
                    offset: 1,
                    color: '#2951ff'
                  }
                ],
                global: false
              }
        },
        emphasis: {
          color: color.length
            ? undefined
            : {
                type: 'linear',
                x: orient !== 'horizontal' ? 1 : 0,
                y: 0,
                x2: 0,
                y2: orient === 'horizontal' ? 1 : 0,
                colorStops: [
                  {
                    offset: 0,
                    color: '#00ffea'
                  },
                  {
                    offset: 1,
                    color: '#7d9afe'
                  }
                ],
                global: false
              }
        }
      },
      data: item.data
    }))
  };
};

/**
  图表名称：堆叠柱状图
  参数说明：
  - width：柱条宽度，默认值为38%
  - category：类目，数据格式为['地面','专用','负1层','负2层']
  - data：数值，数据格式为[{seriesName:'已用',data:[80,110,110,60]},{seriesName:'未用',data:[50,80,90,20]}]
  - orient：图例布局，取值为horizontal（水平布局）、vertical（垂直布局）
  - color：颜色，取值为空数组时表示使用指定的渐变色填充，数据格式为['#ea405a','#0183ff']
  - grid：边距，依次为上右下左，数据格式为[35,25,25,25]
  - unit：计量单位
  - rotate：文字旋转角度
  - fontcolor: 标签文字颜色
  - showLegend: 是否显示图例
  - legendPosition: 图例位置
**/
const barStack = (width = '38%', category = [], data = [], orient = 'horizontal', color = [], grid = [15, 15, 15, 15], unit = [], rotate = -15, fontcolor = '#fff', showLegend = true, legendPosition, isHideLabel = false) => {
  let categoryAxis = [
    {
      type: 'category',
      data: category,
      inverse: true, // 横向倒叙
      axisLine: {
        show: orient === 'horizontal',
        lineStyle: {
          color: '#9e9e9e'
        }
      },
      axisTick: {
        show: orient === 'horizontal',
        inside: true,
        lineStyle: {
          color: '#9e9e9e'
        }
      },
      axisLabel: {
        rotate: orient === 'horizontal' ? rotate : 0,
        margin: 12,
        color: fontcolor
      }
    }
  ];
  let valueAxis = [
    {
      axisLine: {
        show: false,
        lineStyle: {
          color: '#9e9e9e'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: orient === 'horizontal',
        color: '#9e9e9e'
      },
      splitLine: {
        show: orient === 'horizontal',
        lineStyle: {
          color: 'rgba(158, 158, 158, .38)'
        }
      }
    }
  ];
  return {
    legend: {
      show: data.length > 1 && showLegend,
      ...legendPosition,

      // selectedMode: false,
      data: data.map(item => item.seriesName),
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      },
      itemHeight: 14,
      itemWidth: 14
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(27, 70, 150, 0.1)'
        }
      },
      formatter: function(params) {
        if (params.length) {
          let temparr = params[0].name;
          params.forEach((item, index) => {
            temparr += `<br/>${item.seriesName}：${item.value / 10000}${unit}`;
          });
          return temparr;
        } else {
          return `${params.name}：${params.value}${unit[0]}`;
        }
      },
      lineStyle: {
        color: 'rgba(158, 158, 158, .38)'
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
    xAxis: orient === 'horizontal' ? categoryAxis : valueAxis,
    yAxis: orient === 'horizontal' ? valueAxis : categoryAxis,
    series: data.map((item, index) => {
      let allOptions = item.all
        ? {
            barGap: '-100%',
            z: 0
          }
        : {
            stack: '堆叠',
            z: 1
          };
      return {
        name: item.seriesName,
        type: 'bar',
        barWidth: 10,
        barMaxWidth: 30,
        barMinHeight: 0,
        // ...allOptions,
        itemStyle: {
          normal: {
            color: color[index],
            barBorderRadius: index == 0 ? [0, 0, 0, 0] : [0, 0, 0, 0]
          },
          emphasis: {
            color: color[index]
          }
        },
        label: {
          show: false
        },
        data: item.data
      };
    })
  };
};
// 水平堆叠柱状图
const barStackY = (width = '38%', category = [], data = [], orient = 'horizontal', color = [], grid = [15, 15, 15, 15], unit = [], rotate = -15, fontcolor = '#fff', showLegend = true, legendPosition, isHideLabel = false) => {
  legendPosition = legendPosition || {
    left: 15,
    top: 10
  };
  let categoryAxis = [
    {
      type: 'category',
      data: category,
      axisLine: {
        show: orient === 'horizontal',
        lineStyle: {
          color: '#9e9e9e'
        }
      },
      axisTick: {
        show: orient === 'horizontal',
        inside: true,
        lineStyle: {
          color: '#9e9e9e'
        }
      },
      axisLabel: {
        // rotate: orient === 'horizontal' ? rotate : 0,
        margin: 12,
        interval: 0,
        color: fontcolor,
        formatter: function(params) {
          if (!isHideLabel) return params;
          let newstr = params;
          let len = newstr.length;
          if (len > 4) {
            return newstr.substring(0, 2) + '...' + newstr.substring(len - 2, len);
          } else {
            return '\n' + newstr;
          }
        }
      }
    }
  ];
  let valueAxis = [
    {
      minInterval: 1,
      axisLine: {
        show: orient === 'horizontal',
        lineStyle: {
          color: '#9e9e9e'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: orient === 'horizontal',
        color: '#9e9e9e'
      },
      splitLine: {
        show: orient === 'horizontal',
        lineStyle: {
          color: 'rgba(158, 158, 158, .38)'
        }
      }
    }
  ];
  return {
    legend: {
      show: data.length > 1 && showLegend,
      ...legendPosition,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 18,
      // selectedMode: false,
      data: data.map(item => item.seriesName),
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      }
    },
    tooltip: {
      show: orient === 'horizontal',
      trigger: 'axis',
      formatter: function(params) {
        if (params.length) {
          let temparr = params[0].name;
          params.forEach((item, index) => {
            temparr += `<br/>${item.seriesName}：${item.value}${unit}`;
          });
          return temparr;
        } else {
          return `${params.name}：${params.value}${unit[0]}`;
        }
      },
      lineStyle: {
        color: 'rgba(158, 158, 158, .38)'
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
    xAxis: valueAxis,
    yAxis: categoryAxis,
    series: data.map((item, index) => {
      return {
        name: item.seriesName,
        type: 'bar',
        barWidth: width,
        barMaxWidth: 30,
        barMinHeight: orient === 'horizontal' ? 0 : 15,
        stack: '总量',

        label: {
          show: true,
          position: 'insideRight'
        },
        data: item.data
      };
    })
  };
};

/**
  图表名称：圆角柱状图
  参数说明：
  - width：柱条宽度，默认值为38%
  - category：类目，数据格式为['泰安','莱芜','淮坊','烟台','临沂','菏泽','德州','淄博','济南','东营']
  - data：数值，数据格式为[{seriesName:'人口数量',data: [35,35,60,75,75,90,105,120,150,180]}]
  - color：颜色，取值为空数组时表示使用指定的渐变色填充，数据格式为['#2885ff','#009944','#ff9000']
  - unit：计量单位
**/
const barRadius = (width = '38%', category = [], data = [], color = [], unit = []) => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function(params) {
        if (params.length) {
          let temparr = params[0].name;
          params.forEach((item, index) => {
            temparr += `<br/>${item.seriesName}：${item.value}${unit[index]}`;
          });
          return temparr;
        } else {
          return `${params.name}：${params.value}${unit[0]}`;
        }
      },
      backgroundColor: 'rgba(0, 0, 0, .4)',
      padding: [6, 10, 6, 10],
      position: 'top',
      extraCssText: 'line-height: 20px; border-radius: 8px; text-align: left; margin-top: 10px;'
    },
    grid: {
      top: 15,
      right: 35,
      bottom: 15,
      left: 15,
      containLabel: true
    },
    xAxis: [
      {
        minInterval: 1,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.5)'
        },
        splitLine: {
          show: false
          // lineStyle:{
          //   type:'dashed'
          // }
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        data: category,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          margin: 12,
          color: '#ffffff'
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        }
      }
    ],
    series: data.map((item, index) => ({
      name: item.seriesName,
      type: 'bar',
      barWidth: width,
      barMaxWidth: 30,
      itemStyle: {
        normal: {
          barBorderRadius: [0, 30, 30, 0],
          color: color.length
            ? color[index]
            : {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: '#0fa8d0'
                  },
                  {
                    offset: 1,
                    color: '#00559d'
                  }
                ],
                global: false
              }
        }
      },
      data: item.data
    }))
  };
};

/**
  图表名称：交错柱状图
  参数说明：
  - containerWidth：容器宽度，
  - barWidth：柱条宽度，默认值为38%
  - category：类目，数据格式为['10岁以下','10-18岁','18-30岁','30-50岁','50-70岁','70岁以上']
  - data：数值，数据格式为[{seriesName:'男性',data:[2400,3200,7000,9500,4500,1000]},{seriesName:'女性',data:[2000,7000,9800,8100,6200,2000]}]
  - color：颜色，数据格式为['#1a9de9','#ff4255']
  - unit：计量单位
**/
const barCross = (containerWidth = 400, barWidth = '38%', category = [], data = [], color = [], unit = '') => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          opacity: 0
        }
      },
      formatter: function(params) {
        let [param = {}] = params;
        return `${param.name}<br/>${param.seriesName}：${param.value}${unit}`;
      },
      backgroundColor: 'rgba(0, 0, 0, .4)',
      padding: [6, 10, 6, 10],
      position: 'top',
      extraCssText: 'line-height: 20px; border-radius: 8px; text-align: left; margin-top: 10px;'
    },
    grid: [
      {
        left: 25,
        top: 25,
        bottom: 35,
        containLabel: false,
        width: containerWidth / 2 - 60
      },
      {
        right: 25,
        top: 25,
        bottom: 35,
        containLabel: false,
        width: containerWidth / 2 - 60
      },
      {
        left: '50%',
        top: 25,
        bottom: 35,
        width: 70
      }
    ],
    xAxis: [
      {
        type: 'value',
        gridIndex: 0,
        minInterval: 1,
        position: 'right',
        inverse: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.5)'
        },
        splitLine: {
          show: false
        }
      },
      {
        type: 'value',
        gridIndex: 1,
        minInterval: 1,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.5)'
        },
        splitLine: {
          show: false
        }
      },
      ...data.map((item, index) => ({
        type: 'value',
        gridIndex: index,
        minInterval: 1,
        name: `${item.seriesName}（${item.data.reduce((result, ditem) => result + ditem, 0)}${unit}）`, // 空数组[].reduce()报错 默认给初始值
        nameLocation: 'center',
        nameGap: 10,
        nameTextStyle: {
          color: '#ffffff'
        },
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
        }
      })),
      {
        gridIndex: 2,
        show: false,
        silent: true
      }
    ],
    yAxis: [
      {
        gridIndex: 0,
        minInterval: 1,
        type: 'category',
        position: 'right',
        data: category,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      {
        gridIndex: 1,
        type: 'category',
        data: category,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      {
        gridIndex: 2,
        type: 'category',
        position: 'left',
        silent: true,
        axisLine: {
          show: false
        },
        axisTick: {
          alignWithLabel: true,
          show: false
        },
        axisLabel: {
          show: true,
          margin: 0,
          align: 'center',
          color: '#ffffff'
        },
        data: category
      }
    ],
    series: data.map((item, index) => ({
      name: item.seriesName,
      type: 'bar',
      xAxisIndex: index,
      yAxisIndex: index,
      barWidth: barWidth,
      barMaxWidth: 30,
      itemStyle: {
        normal: {
          color: color[index]
        }
      },
      data: item.data
    }))
  };
};
/**
  图表名称：多x轴柱状图
  参数说明：
  - width：柱条宽度，默认值为38%
  - category：类目，数据格式为['泰安','莱芜','淮坊','烟台','临沂','菏泽','德州','淄博','济南','东营']
  - data：数值，数据格式为[{seriesName:'人口数量',data: [35,35,60,75,75,90,105,120,150,180]}]
  - color：颜色，取值为空数组时表示使用指定的渐变色填充，数据格式为['#2885ff','#009944','#ff9000']
  - unit：计量单位
   - grid：图形的上右下左的偏移量
    - legend：计量单位
     -offset：x轴的偏移量
**/
const barMultipleX = (category = [], data = [], color = [], grid = [15, 15, 15, 15], unit = [], offset = []) => {
  let legend = data.map(item => item.seriesName);
  return {
    color: color,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: legend,
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        color: '#fff',
        padding: [2, 0, 0, 0]
      },
      left: 0
    },
    grid: {
      top: grid[0],
      right: grid[1],
      bottom: grid[2],
      left: grid[3]
    },
    xAxis: data.map((item, i) => ({
      type: 'value',
      name: '/' + unit[i],
      nameLocation: 'end',
      nameTextStyle: {
        padding: [25, 0, 0, 0],
        color: color[i]
      },
      position: 'bottom',
      offset: offset[i],
      axisLine: {
        show: i === 0 ? 'true' : false,
        lineStyle: {
          color: color[0]
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: color[i],
        formatter: '{value}'
      },
      splitLine: {
        show: false
      }
    })),
    yAxis: [
      {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: color[0]
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#fff'
        },
        data: category
      }
    ],
    series: data.map((item, i) => ({
      name: item.seriesName,
      type: 'bar',
      barWidth: 8,
      xAxisIndex: i,
      data: item.data
    }))
  };
};

// 特殊人群
const parkingBar = (xdata = [], ydata1 = [], ydata2 = [], ydata3 = [], color, dataZoomStyle) => {
  return xdata.length && xdata
    ? {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '2%',
          top: '14%',
          right: '4%',
          bottom: '20%',
          containLabel: true
        },
        legend: {
          data: ['临停', '月租', '优惠卷、打折'],
          itemHeight: 14,
          itemWidth: 14,
          textStyle: {
            color: '#fff'
          },
          top: '3%',
          right: '4%'
        },
        // dataZoom: [{
        //   type: 'slider',
        //   xAxisIndex: 0,
        //   left: '8%',
        //   right: '8%',
        //   filterMode: 'empty',
        //   backgroundColor: dataZoomStyle.backgroundColor,
        //   borderColor: dataZoomStyle.borderColor,
        //   handleIcon: 'M8.2,13.6V3.9H6.3v9.7H3.1v14.9h3.3v9.7h1.8v-9.7h3.3V13.6H8.2z M9.7,24.4H4.8v-1.4h4.9V24.4z M9.7,19.1H4.8v-1.4h4.9V19.1z',
        //   handleStyle: {
        //     color: dataZoomStyle.handleStyle
        //   },
        //   fillerColor: dataZoomStyle.fillerColor,
        //   textStyle: {
        //     color: color,
        //     fontSize: 10
        //   }
        // },
        // {
        //   type: 'inside',
        //   xAxisIndex: 0,
        //   filterMode: 'empty'
        // }
        // ],
        xAxis: [
          {
            type: 'category',
            data: xdata,
            axisTick: {
              alignWithLabel: true
            },
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
            minInterval: 1,
            type: 'value',
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
                color: '#9e9e9e' // 坐标值得具体的颜色
              }
            },
            splitLine: {
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
            name: '临停',
            type: 'bar',
            barWidth: '24',
            data: ydata1,
            color: '#0fb5eb'
          },
          {
            name: '月租',
            type: 'bar',
            barWidth: '24',
            data: ydata2,
            color: '#f3c22b'
          },
          {
            name: '优惠卷、打折',
            type: 'bar',
            barWidth: '24',
            data: ydata3,
            color: '#0febaf'
          }
        ]
      }
    : getTips();
};
// 示例：https://echarts.apache.org/examples/zh/editor.html?c=mix-line-bar
const barMultiple = (xdata = [], ydata = [], color = [], unit = '人') => {
  let seriesArr = [];
  let arr = {};
  ydata.forEach(item => {
    let total = item.data.reduce((pre, next) => {
      return pre + next;
    });
    arr[item.seriesName] = total;

    seriesArr.push({
      name: item.seriesName,
      barMaxWidth: 14,
      barMinWidth: 14,
      type: 'bar',
      data: item.data,
      itemStyle: {
        normal: {
          color: params => (params.seriesIndex === 0 ? color[0] : color[1])
        }
      }
    });
  });
  return xdata.length && xdata
    ? {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              opacity: 0
            }
          },
          formatter: params => {
            return `${params[0].seriesName}：${params[0].value}${unit}<br/> ${params[1].seriesName}：${params[1].value}${unit}`;
          },
          backgroundColor: 'rgba(0, 0, 0, .4)',
          padding: [6, 10, 6, 10],
          position: 'top',
          extraCssText: 'line-height: 20px; border-radius: 8px; text-align: left; margin-top: 10px;'
        },
        grid: {
          left: '2%',
          top: '14%',
          right: '4%',
          bottom: '20%',
          containLabel: true
        },
        legend: {
          data: ydata.map(item => item.seriesName),
          itemHeight: 14,
          itemWidth: 14,
          textStyle: {
            color: '#fff'
          },
          top: '10',
          right: 15,
          formatter: function(name) {
            return name + '(' + arr[`${name}`] + ')';
          }
        },
        grid: {
          left: 15,
          top: '18%',
          right: 15,
          bottom: 10,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xdata,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#142B62',
                opacity: 0.2
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff' // 坐标值得具体的颜色
              }
            }
          }
        ],
        yAxis: [
          {
            // min: yAxisRange[0],
            // max: yAxisRange[1],
            // interval: yAxisInterval,
            minInterval: 1,
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#142B62',
                opacity: 0.2
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff' // 坐标值得具体的颜色
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.4)',
                type: 'dashed',
                opacity: 0.2
              }
            }
          }
        ],
        series: seriesArr
      }
    : getTips();
};
const specialGroup = (width = '38%', category = [], data = [], orient = 'horizontal', color = [], grid = [15, 30, 20, 15], unit = [], rotate = 0, fontcolor = '#fff', showLegend = true, legendPosition, isHideLabel = false) => {
  legendPosition = legendPosition || {
    right: grid[1],
    top: 0
  };

  let categoryData = category.map(item => ({
    value: item
  }));

  let categoryAxis = [
    {
      type: 'category',
      data: categoryData,
      axisLine: {
        lineStyle: {
          color: 'rgba(158, 158, 158, .2)'
        }
      },
      axisTick: {
        show: orient === 'horizontal' && color.length,
        inside: true,
        lineStyle: {
          color: '#9e9e9e'
        }
      },
      axisLabel: {
        interval: 0,
        rotate: orient === 'horizontal' ? rotate : 0,
        margin: 12,
        color: fontcolor,
        height: 20,
        lineHeight: 16,
        rich: {
          a: {}
        },
        formatter: function(params) {
          var newParamsName = '';
          var paramsNameNumber = params.length;
          var provideNumber = 2; // 每行能显示的字的个数
          var rowNumber = Math.ceil(paramsNameNumber / provideNumber);

          if (rowNumber > 2) {
            params = params.substring(0, 2 * provideNumber);
          }
          if (paramsNameNumber > provideNumber) {
            for (var p = 0; p < rowNumber; p++) {
              var tempStr = '';
              var start = p * provideNumber;
              var end = start + provideNumber;
              if (p == rowNumber - 1) {
                tempStr = params.substring(start, paramsNameNumber);
              } else {
                tempStr = params.substring(start, end) + '\n';
              }
              newParamsName += tempStr;
            }
          } else {
            newParamsName = params;
          }
          return newParamsName;
        }
      }
    }
  ];
  let valueAxis = [
    {
      minInterval: 1,
      axisLine: {
        lineStyle: {
          color: 'rgba(158, 158, 158, 0.2)'
        }
      },
      axisTick: {
        show: orient !== 'horizontal',
        inside: true,
        lineStyle: {
          color: '#9e9e9e'
        }
      },
      axisLabel: {
        color: '#9e9e9e'
      },
      splitLine: {
        show: orient === 'horizontal',
        lineStyle: {
          color: 'rgba(158, 158, 158, .2)',
          type: 'dashed'
        }
      }
    }
  ];
  return {
    legend: {
      show: data.length > 1 && showLegend,
      ...legendPosition,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 18,
      selectedMode: false,
      data: data.map(item => item.seriesName),
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          opacity: 0
        }
      },
      formatter: function(params) {
        if (params.length) {
          let temparr = params[0].name;
          params.forEach((item, index) => {
            temparr += `<br/>${item.seriesName}：${item.value}${unit[index]}`;
          });
          return temparr;
        } else {
          return `${params.name}：${params.value}${unit[0]}`;
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
    xAxis: orient === 'horizontal' ? categoryAxis : valueAxis,
    yAxis: orient === 'horizontal' ? valueAxis : categoryAxis,
    series: data.map((item, index) => ({
      name: item.seriesName,
      type: 'bar',
      barWidth: width,
      barMaxWidth: 30,
      itemStyle: {
        normal: {
          color: color.length
            ? color[index]
            : {
                type: 'linear',
                x: orient !== 'horizontal' ? 1 : 0,
                y: 0,
                x2: 0,
                y2: orient === 'horizontal' ? 1 : 0,
                colorStops: [
                  {
                    offset: 0,
                    color: '#00ffea'
                  },
                  {
                    offset: 1,
                    color: '#2951ff'
                  }
                ],
                global: false
              }
        },
        emphasis: {
          color: color.length
            ? undefined
            : {
                type: 'linear',
                x: orient !== 'horizontal' ? 1 : 0,
                y: 0,
                x2: 0,
                y2: orient === 'horizontal' ? 1 : 0,
                colorStops: [
                  {
                    offset: 0,
                    color: '#00ffea'
                  },
                  {
                    offset: 1,
                    color: '#7d9afe'
                  }
                ],
                global: false
              }
        }
      },
      data: item.data
    }))
  };
};
export default {
  patrolBar,
  carBar,
  matericalBar,
  specialBar,
  technicalBar,
  todayBar,
  regionalBar,
  peopleAgeBar,
  houseStatsBar,
  flowHouseStatsBar,
  flowPeopleStatsBar,
  barBasic,
  barStack,
  barStackY,
  barRadius,
  barCross,
  barMultipleX,
  effBar,
  parkingBar,
  barMultiple,
  specialGroup
};
