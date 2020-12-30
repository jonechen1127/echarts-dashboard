<template>
  <div class="bar">
    <div class="bar-row">
      <FocusBox title="基础柱状图">
        <v-echarts class="echart-item" style="width: 100%; height: 100%" autoresize :options="barBasicOption" ref="barBasic"></v-echarts>
      </FocusBox>
    </div>
    <div class="bar-row">
      <FocusBox title="堆叠柱状图">
        <v-echarts class="echart-item" style="width: 100%; height: 100%" autoresize :options="barStackOption" ref="barStack"></v-echarts>
      </FocusBox>
    </div>
    <div class="bar-row">
      <FocusBox title="圆角柱状图">
        <v-echarts class="echart-item" style="width: 100%; height: 100%" autoresize :options="barRadiusOption" ref="barRadius"></v-echarts>
      </FocusBox>
    </div>
    <div class="bar-row">
      <FocusBox title="正负柱状图">
        <v-echarts class="echart-item" style="width: 100%; height: 100%" autoresize :options="barCrossOption" ref="barCross"></v-echarts>
      </FocusBox>
    </div>
  </div>
</template>

<script>
import FocusBox from '@/components/FocusBox'
import bar from '@/assets/js/charts/bar'
export default {
  name: 'components-bar',
  components: {
    FocusBox
  },
  data() {
    return {
      barBasicOption: {},
      barStackOption: {},
      barRadiusOption: {},
      barCrossOption: {}
    }
  },
  mounted() {
    // 基础柱状图
    // let barBasicWidth = '38%'
    // let barBasicCategory = ['人流监控', '人脸识别', '周界报警', '智能停车', '智能消防', '智能烟感']
    // let barBasicData = [{
    //   seriesName: '技防数据',
    //   data: [4, 19, 16, 32, 26, 14]
    // }]
    // let barBasicOrient = 'horizontal'
    // let barBasicColor = []
    // let barBasicGrid = [25, 25, 25, 25]
    // let barBasicUnit = ['套']

    // let barBasicWidth = '62%'
    // let barBasicCategory = ['人员黑名单预警', '车辆黑名单预警', '陌生人尾随预警', '区域人流聚集预警', '异常时段出入预警', '提醒关照预警']
    // let barBasicData = [{
    //   seriesName: '技防数据',
    //   data: [7, 11, 13, 6, 18, 11]
    // }]
    // let barBasicOrient = 'vertical'
    // let barBasicColor = []
    // let barBasicGrid = [15, 15, 15, 15]
    // let barBasicUnit = ['起']

    let barBasicWidth = '25%'
    let barBasicCategory = ['一栋一单元', '一栋二单元', '一栋三单元', '一栋四单元', '一栋五单元', '一栋六单元']
    let barBasicData = [{
      seriesName: '出租房屋',
      data: [4, 19, 16, 32, 26, 14]
    }, {
      seriesName: '租客人数',
      data: [5, 20, 17, 33, 27, 15]
    }]
    let barBasicOrient = 'horizontal'
    let barBasicColor = ['#2885ff', '#009944', '#ff9000']
    let barBasicGrid = [35, 25, 25, 25]
    let barBasicUnit = ['套', '人']
    this.barBasicOption = bar.barBasic(barBasicWidth, barBasicCategory, barBasicData, barBasicOrient, barBasicColor, barBasicGrid, barBasicUnit)

    // 堆叠柱状图
    let barStackCategory = ['地面', '专用', '负1层', '负2层']
    let barStackData = [{
      seriesName: '全部',
      all: true,
      data: [130, 190, 200, 80]
    }, {
      seriesName: '已用',
      data: [80, 110, 110, 60]
    }, {
      seriesName: '未用',
      data: [50, 80, 90, 20]
    }]
    let barStackOrient = 'horizontal'
    let barStackColor = ['#7f5fdd', '#ea405a', '#0183ff']
    let barStackGrid = [35, 25, 25, 25]
    let barStackUnit = '个'

    // let barStackCategory = ['人员黑名单', '车辆黑名单', '周界告警', '陌生人尾随告警', '提醒关照预警', '用电告警', '人流聚集告警']
    // let barStackData = [{
    //   seriesName: '已处置',
    //   data: [186, 32, 48, 66, 154, 76, 75]
    // }, {
    //   seriesName: '未处置',
    //   data: [43, 12, 23, 56, 128, 57, 76]
    // }]
    // let barStackOrient = 'vertical'
    // let barStackColor = ['#009be3', 'rgba(0, 155, 227, 0.46)']
    // let barStackGrid = [35, 15, 15, 15]
    // let barStackUnit = ''
    this.barStackOption = bar.barStack(28, barStackCategory, barStackData, barStackOrient, barStackColor, barStackGrid, barStackUnit)

    // 圆角柱状图
    let barRadiusWidth = '62%'
    let barRadiusCategory = ['泰安', '莱芜', '淮坊', '烟台', '临沂', '菏泽', '德州', '淄博', '济南', '东营']
    let barRadiusData = [{
      seriesName: '人口数量',
      data: [35, 35, 60, 75, 75, 90, 105, 120, 150, 180]
    }]
    let barRadiusColor = []
    let barRadiusUnit = ['人']

    // let barRadiusWidth = '30%'
    // let barRadiusCategory = ['北京', '安徽', '浙江', '湖北', '江苏', '河南', '河北', '山东']
    // let barRadiusData = [{
    //   seriesName: '访客车',
    //   data: [20, 40, 70, 90, 105, 120, 145, 200]
    // }, {
    //   seriesName: '访客人',
    //   data: [30, 35, 10, 45, 30, 110, 90, 50]
    // }]
    // let barRadiusColor = ['#03fce2', '#f3c22b']
    // let barRadiusUnit = ['辆', '人']
    this.barRadiusOption = bar.barRadius(barRadiusWidth, barRadiusCategory, barRadiusData, barRadiusColor, barRadiusUnit)

    // 交错柱状图
    let barCrossContainer = this.$refs.barCross.width
    let barCrossWidth = '50%'
    let barCrossCategory = ['10岁以下', '10-18岁', '18-30岁', '30-50岁', '50-70岁', '70岁以上']
    let barCrossData = [{
      seriesName: '男性',
      data: [2400, 3200, 7000, 9500, 4500, 1000]
    }, {
      seriesName: '女性',
      data: [2000, 7000, 9800, 8100, 6200, 2000]
    }]
    let barCrossColor = ['#1a9de9', '#ff4255']
    let barCrossUnit = '人'
    this.barCrossOption = bar.barCross(barCrossContainer, barCrossWidth, barCrossCategory, barCrossData, barCrossColor, barCrossUnit)
  }
}
</script>

<style lang="scss" scoped>
.bar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .bar-row {
    width: calc((100% - 15px) / 2);
    margin-bottom: 15px;
    height: calc((100% - 30px) / 2);
    &:nth-last-child(2) {
      margin-bottom: 0;
    }
  }
}
</style>
