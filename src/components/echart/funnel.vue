<template>
  <div class="graph">
    <FocusBox title="漏斗图">
      <v-echarts class="echart-item" style="width: 100%; height: 100%" autoresize :options="chartOption"></v-echarts>
    </FocusBox>
  </div>
</template>

<script>
import FocusBox from '@/components/FocusBox'
import funnel from '@/assets/js/charts/funnel'

export default {
  name: 'components-funnel',
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
    init () {
      let data = [{ name: '触发事件', amount: 230 }, { name: '已指派事件', amount: 210 }, { name: '已处置事件', amount: 156 }]
      this.chartOption = funnel.funnelBasic(data, { color: ['#3799D8', '#D9A637', '#37D987'], unit: '起' })
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
