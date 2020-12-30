<template>
  <div class="echarts-container" :option="option" ref="myChart"></div>
</template>
<script>
export default {
  name: 'echarts-init',
  props: {
    option: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      myChart: null
    };
  },
  mounted() {
    this.ininEchart();
    window.addEventListener('resize', this.resizeChart);
  },
  methods: {
    ininEchart() {
      this.myChart = this.$echarts.init(this.$refs.myChart);
      this.myChart.setOption(this.option);
    },
    resizeChart() {
      this.myChart.resize();
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeChart);
  }
};
</script>
<style lang="scss">
.echarts-container {
  width: 100%;
  height: 100%;
}
</style>
