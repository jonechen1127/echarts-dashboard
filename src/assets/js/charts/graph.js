import { getTips } from './tips.js'
// import { getRoundImg } from '@/assets/js/utils/imageUtil.js'

const DEFAULT_PERSON = 'data:image/png;base64,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'
/**
  图表名称：关系图
  参数说明：
**/
const relationGraph = async (nodes, links, options = { diameter: 100, edgeLength: [250, 250] }) => {
  // let images = await Promise.all(nodes.map(item => getRoundImg(item.image, options.diameter)))
  let nodedata = nodes.map((item, index) => {
    return {
      id: item.id,
      name: item.name,
      title: item.title,
      symbol: 'circle',
      symbolSize: options.diameter,
      itemStyle: {
        color: '#1f509f',
        borderColor: '#1f509f',
        borderWidth: 1,
        shadowBlur: 3,
        shadowColor: '#389fff'
      },
      label: {
        show: true,
        width: options.diameter,
        height: options.diameter,
        backgroundColor: {
          image:  DEFAULT_PERSON
        },
        formatter: (params) => {
          return [
            '{placeholder|}',
            `{name|${params.data.title}}`
          ].join('\n')
        },
        rich: {
          placeholder: {
            height: options.diameter
          },
          name: {
            fontSize: 14,
            color: '#fff',
            backgroundColor: '#1f509f',
            borderWidth: 1,
            padding: 4,
            borderColor: '#018bcd',
            borderRadius: 4,
            align: 'center',
            verticalAlign: 'center'
          }
        }
      }
    }
  })
  return nodes.length ? {
    series: [{
      type: 'graph',
      layout: 'force',
      roam: false,
      draggable: true,
      // focusNodeAdjacency: true,
      data: nodedata,
      links: links,
      force: {
        initLayout: 'circular',
        repulsion: 160,
        gravity: 0,
        edgeLength: options.edgeLength,
        layoutAnimation: false
      },
      lineStyle: {
        color: '#017fb8',
        type: 'dashed'
      },
      edgeLabel: {
        show: true,
        formatter: (params) => {
          return [
            `{name|${params.data.name}}`
          ].join('\n')
        },
        rich: {
          placeholder: {
            height: 100
          },
          name: {
            fontSize: 14,
            color: '#fff'
          }
        }
      }
    }]
  } : getTips()
}

export default {
  relationGraph
}
