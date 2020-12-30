<template>
  <div class="gauge">
    <FocusBox title="基础仪表盘">
      <v-echarts class="echart-item" style="width: 100%; height: 100%" autoresize :options="gaugeOption" ref="gaugeChart"></v-echarts>
    </FocusBox>
  </div>
</template>

<script>
import FocusBox from '@/components/FocusBox'
import gauge from '@/assets/js/charts/gauge'
export default {
  name: 'gauge',
  components: {
    FocusBox
  },
  data () {
    return {
      gaugeOption: {}
    }
  },
  mounted () {
    this.gaugeOption = gauge.gaugeBasic('入住率', 0.62)
  }
}
</script>

<style lang="scss" scoped>
  .gauge {
    width: 100%;
    height: 100%;
  }
</style>
