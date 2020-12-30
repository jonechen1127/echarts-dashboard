<template>
  <div class="pie">
    <div class="pie-row">
      <FocusBox title="基础饼图">
        <v-echarts class="echart-item" style="width: 100%; height: 100%" autoresize :options="pieBasicOption" ref="pieBasic"></v-echarts>
      </FocusBox>
    </div>
    <div class="pie-row">
      <FocusBox title="玫瑰饼图">
        <v-echarts class="echart-item" style="width: 100%; height: 100%" autoresize :options="pieRoseOption" ref="pieRose"></v-echarts>
      </FocusBox>
    </div>

    <div class="pie-row">
      <FocusBox title="甜甜圈饼图">
        <v-echarts class="echart-item" style="width: 100%; height: 100%" autoresize :options="pieDoughnutOption" ref="pieDoughnut"></v-echarts>
      </FocusBox>
    </div>
    <div class="pie-row">
      <FocusBox title="嵌套饼图">
        <v-echarts class="echart-item" style="width: 100%; height: 100%" autoresize :options="pieNestedOption" ref="pieNested"></v-echarts>
      </FocusBox>
    </div>
  </div>
</template>

<script>
import FocusBox from '@/components/FocusBox'
import pie from '@/assets/js/charts/pie'
export default {
  name: 'components-pie',
  components: {
    FocusBox
  },
  data() {
    return {
      pieBasicOption: {},
      pieRoseOption: {},
      pieDoughnutOption: {},
      pieNestedOption: {}
    }
  },
  mounted() {
    // 基础饼图
    let normalData = [
      { value: 15, name: '12岁以下' },
      { value: 15, name: '12-20岁' },
      { value: 25, name: '20-30岁' },
      { value: 15, name: '30-40岁' },
      { value: 10, name: '40-50岁' },
      { value: 10, name: '50-60岁' },
      { value: 10, name: '60岁以上' }
    ]
    let normalColor = ['#ffd800', '#ff9376', '#ff9000', '#01c0dd', '#0183ff', '#3051ff', '#ea405a']
    let normalUnit = '人'
    this.pieBasicOption = pie.pieBasic(normalData, normalColor, 'horizontal', normalUnit)
    // 玫瑰饼图
    let roseData = [
      { value: 40, name: '催泪器' },
      { value: 35, name: '警棍' },
      { value: 30, name: '警绳' },
      { value: 25, name: '警盾' },
      { value: 20, name: '防刺背心' },
      { value: 15, name: '防刺手套' },
      { value: 10, name: '铁叉' },
      { value: 5, name: '防爆盔' }
    ]
    let roseColor = ['#fed565', '#00dbfc', '#71e6f1', '#0084ff', '#01fcff', '#fdff4f', '#107dbe', '#40f4c3']
    this.pieRoseOption = pie.pieRose(roseData, roseColor, true)
    pie.autoChartHighlight(this.$refs.pieRose, roseData.length)
    pie.atuoShowTooltip(this.$refs.pieRose, roseData.length)
    // 甜甜圈饼图
    let doughnutData = [
      { value: 6692, name: '自住' },
      { value: 754, name: '出租' },
      { value: 2128, name: '商用' },
      { value: 652, name: '空置' },
      { value: 2418, name: '其他' }
    ]
    let doughnutColor = ['#73bbff', '#5cd8ea', '#fecd72', '#197ab8', '#dff1e4']
    this.pieDoughnutOption = pie.pieDoughnut(doughnutData, doughnutColor, 'horizontal', 'ring', '套', false)
    pie.autoChartHighlight(this.$refs.pieDoughnut, doughnutData.length)
    pie.atuoShowTooltip(this.$refs.pieDoughnut, doughnutData.length)
    // 嵌套饼图
    let nestedOutData = [
      { value: 148773, name: '常住人口' },
      { value: 74387, name: '流动人口' }
    ]
    let nestedOutColor = ['#5cd8ea', '#f58e54']
    let nestedIndata = [
      { value: 74387, name: '业主' },
      { value: 74387, name: '家属' },
      { value: 74387, name: '租客' }
    ]
    let nestedInColor = ['#73bbff', '#2f46f0', '#fed07c']
    let nestedUnit = '人'
    this.pieNestedOption = pie.pieNested(nestedOutData, nestedOutColor, nestedIndata, nestedInColor, nestedUnit)
  },
  beforeDestroy() {
    pie.clearChartHighlight(this.$refs.pieDoughnut)
    pie.clearChartHighlight(this.$refs.pieRose)
    pie.clearShowTooltip(this.$refs.pieDoughnut)
    pie.clearShowTooltip(this.$refs.pieRose)
  }
}
</script>

<style lang="scss" scoped>
.pie {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .pie-row {
    width: calc((100% - 15px) / 2);
    margin-bottom: 15px;
    height: calc((100% - 30px) / 2);
    &:nth-last-child(2) {
      margin-bottom: 0;
    }
  }
}
</style>
