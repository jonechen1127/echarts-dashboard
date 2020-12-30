<template>
  <div class="radar">
    <FocusBox title="基础雷达图">
      <v-echarts class="echart-item" style="width: 100%; height: 100%" autoresize :options="radarOption" ref="radarChart"></v-echarts>
    </FocusBox>
  </div>
</template>

<script>
import FocusBox from '@/components/FocusBox'
import radar from '@/assets/js/charts/radar'
export default {
  name: 'radar',
  components: {
    FocusBox
  },
  data() {
    return {
      radarOption: {}
    }
  },
  mounted() {
    let data = [
      { name: '教育', value: 8 },
      { name: '金融', value: 8 },
      { name: '医疗', value: 8 },
      { name: '交通', value: 8 },
      { name: '商业', value: 8 },
      { name: '娱乐', value: 8 },
      { name: '政府', value: 8 },
      { name: '其他', value: 10 }
    ]
    let color = ['#66bb80', '#0084ff', '#01c0dc', '#ea405a', '#ffd800', '#ff9000', '#bc86d4', '#3051ff']
    this.radarOption = radar.radarBasic(data, color)
  }
}
</script>

<style lang="scss" scoped>
.radar {
  width: 100%;
  height: 100%;
}
</style>
