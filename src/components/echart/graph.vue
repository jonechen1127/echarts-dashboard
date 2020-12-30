<template>
  <div class="graph">
    <FocusBox title="关系图">
      <v-echarts class="echart-item" style="width: 100%; height: 100%" autoresize :options="chartOption"></v-echarts>
    </FocusBox>
  </div>
</template>

<script>
import FocusBox from '@/components/FocusBox'
import graph from '@/assets/js/charts/graph'

export default {
  name: 'components-graph',
  components: {
    FocusBox
  },
  data () {
    return {
      chartOption: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      let nodes = [{
        image: '2018-11-12_17_13_36_469_6500881c7c5431a34c83415275776e91.jpg',
        title: '业主：荣舒婷',
        name: '145'
      },
      {
        title: '租客：张玉才',
        photo: '7a55183b9dd57b13c53b87661fa88f56_1553760393.jpg',
        name: '230'
      },
      {
        title: '租客：张玉才1',
        photo: '7a55183b9dd57b13c53b87661fa88f56_1553760393.jpg',
        name: '231'
      },
      {
        title: '租客：张玉才2',
        photo: '7a55183b9dd57b13c53b87661fa88f56_1553760393.jpg',
        name: '232'
      },
      {
        title: '租客：张玉才3',
        photo: '',
        name: '233'
      }]
      let links = [{
        'name': '山东-东营',
        'source': '230',
        'target': '145'
      },
      {
        'name': '山东-东营',
        'source': '231',
        'target': '145'
      },
      {
        'name': '山东-东营',
        'source': '232',
        'target': '145'
      },
      {
        'name': '山东-东营',
        'source': '233',
        'target': '145'
      }]
      nodes = nodes.map((item) => {
        item.image = item.photo
        return item
      })
      this.chartOption = await graph.relationGraph(nodes, links)
    }
  }
}
</script>

<style lang="scss" scoped>
.graph {
  width: 100%;
  height: 100%;
}
</style>
