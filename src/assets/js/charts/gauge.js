import {
  getTips
} from './tips.js'

/*
  房屋入住率
  参数说明：id - 元素唯一标识、name -类型 、count - 数量、percent - 占比
*/
const houseOccupancyRate = (name, count, percent) => {
  return count ? {
    series: [{
      type: 'gauge',
      radius: '70%',
      axisLine: {
        lineStyle: {
          color: [
            [percent, '#1eb2ff'],
            [1, '#005399']
          ],
          width: 28
        }
      },
      splitLine: {
        length: 20,
        lineStyle: {
          color: '#ffffff',
          width: 2
        }
      },
      axisTick: {
        length: 10,
        lineStyle: {
          color: '#ffffff',
          width: 2
        }
      },
      axisLabel: {
        distance: 16,
        color: '#ffffff',
        fontSize: 12
      },
      pointer: {
        width: 3
      },
      itemStyle: {
        normal: {
          color: '#ffd200'
        }
      },
      title: {
        offsetCenter: [0, '90%'],
        rich: {
          a: {
            color: '#1cb1ff',
            fontSize: 14,
            padding: [0, 0, 10, 0]
          },
          b: {
            color: '#fff',
            fontSize: 24,
            padding: [0, 0, 4, 0]
          },
          c: {
            color: '#fff',
            fontSize: 12,
            padding: [0, 0, 10, 4]
          }
        }
      },
      detail: {
        formatter: function (value) {
          return '{a|入住率}\n{b|' + value.toFixed(0) + '}{c|%}'
        },
        offsetCenter: [0, '55%'],
        color: '#ffda2e',
        fontSize: 24,
        rich: {
          a: {
            fontSize: 14,
            color: '#fff'
          },
          b: {
            color: '#ffda2e',
            fontSize: 26,
            padding: [0, 0, 7, 4]
          },
          c: {
            fontSize: 14,
            color: '#ffda2e',
            padding: [0, 0, 6, 2]
          }
        }
      },
      data: [{
        value: Number((percent * 100).toFixed(2))
      }]
    },
    {
      type: 'gauge',
      radius: '71%',
      axisLine: {
        lineStyle: {
          color: [
            [percent, '#ffda2e'],
            [1, '#7286b5']
          ],
          width: 4
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      pointer: {
        show: false
      },
      detail: {
        show: false
      }
    }
    ],
    graphic: {
      elements: [{
        type: 'circle',
        left: 'center',
        top: 'center',
        shape: {
          r: 16
        },
        style: {
          fill: 'rgba(0, 181, 249, .14)'
        }
      },
      {
        type: 'circle',
        left: 'center',
        top: 'center',
        shape: {
          r: 8
        },
        style: {
          fill: 'rgba(0, 181, 249, .4)'
        }
      }
      ]
    }
  } : getTips()
}

/**
  图表名称：基础仪表盘
  参数说明：
  - name：名称
  - percent：占比
  - radius：半径
**/
const gaugeBasic = (name = '', percent = 0, radius = '62%') => {
  let borderRadius = Number(radius.split('%')[0]) + 1
  return {
    series: [{
      type: 'gauge',
      radius: radius,
      axisLine: {
        lineStyle: {
          color: [
            [percent, '#1eb2ff'],
            [1, '#005399']
          ],
          width: 28
        }
      },
      splitLine: {
        length: 20,
        lineStyle: {
          color: '#ffffff',
          width: 2
        }
      },
      axisTick: {
        length: 10,
        lineStyle: {
          color: '#ffffff',
          width: 2
        }
      },
      axisLabel: {
        distance: 16,
        color: '#ffffff',
        fontSize: 12
      },
      pointer: {
        width: 3
      },
      itemStyle: {
        normal: {
          color: '#ffd200'
        }
      },
      title: {
        offsetCenter: [0, '90%'],
        rich: {
          a: {
            color: '#1cb1ff',
            fontSize: 14,
            padding: [0, 0, 10, 0]
          },
          b: {
            color: '#fff',
            fontSize: 24,
            padding: [0, 0, 4, 0]
          },
          c: {
            color: '#fff',
            fontSize: 12,
            padding: [0, 0, 10, 4]
          }
        }
      },
      detail: {
        formatter: function (value) {
          return '{a|' + name + '}\n{b|' + value + '}{c|%}'
        },
        offsetCenter: [0, '75%'],
        color: '#ffda2e',
        fontSize: 24,
        rich: {
          a: {
            fontSize: 14,
            color: '#ffffff'
          },
          b: {
            color: '#ffda2e',
            fontSize: 24,
            fontWeight: 'bold',
            padding: [0, 0, 6, 0]
          },
          c: {
            fontSize: 14,
            color: '#ffda2e',
            padding: [0, 0, 12, 2]
          }
        }
      },
      data: [{
        value: Number((percent * 100).toFixed(2))
      }]
    },
    {
      type: 'gauge',
      radius: borderRadius + '%',
      axisLine: {
        lineStyle: {
          color: [
            [percent, '#ffda2e'],
            [1, '#7286b5']
          ],
          width: 4
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      pointer: {
        show: false
      },
      detail: {
        show: false
      }
    }
    ],
    graphic: {
      elements: [{
        type: 'circle',
        left: 'center',
        top: 'center',
        shape: {
          r: 16
        },
        style: {
          fill: 'rgba(0, 181, 249, .14)'
        }
      },
      {
        type: 'circle',
        left: 'center',
        top: 'center',
        shape: {
          r: 8
        },
        style: {
          fill: 'rgba(0, 181, 249, .4)'
        }
      }
      ]
    }
  }
}

export default {
  houseOccupancyRate,
  gaugeBasic
}
