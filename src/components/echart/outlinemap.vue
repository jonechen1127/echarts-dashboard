<template>
  <div class="outlinemap">
    <FocusBox title="气泡地图">
      <v-echarts class="echart-item" style="width: 100%; height: 100%" autoresize :options="mapOption" ref="mapChart"></v-echarts>
    </FocusBox>
  </div>
</template>

<script>
import FocusBox from '@/components/FocusBox';
import outlinemap from '@/assets/js/charts/outlinemap';
export default {
  name: 'components-map',
  components: {
    FocusBox
  },
  data() {
    return {
      mapOption: {}
    };
  },
  mounted() {
    let area = '370000';
    let data = [
      [
        { seriesName: '访客车', name: '烟台', value: [121.39, 37.52], count: 8, unit: '辆' },
        { seriesName: '访客车', type: 0, name: '东营', value: [118.49, 37.46], count: 16, unit: '辆' }
      ],
      [
        { seriesName: '访客', type: 1, name: '菏泽', value: [115.480656, 35.23375], count: 8, unit: '人' },
        { seriesName: '访客', type: 1, name: '临沂', value: [118.35, 35.05], count: 16, unit: '人' }
      ]
    ];
    let color = ['#03fce2', '#f3c22b'];
    outlinemap
      .getMap(area)
      .then(areaData => {
        console.log(areaData);
        // this.mapOption = outlinemap.mapScatter(area, data, color, true)
        this.mapOption = outlinemap.mapScatter(area, data, color);
      })
      .catch(() => {
        this.mapOption = outlinemap.getErrorTips();
      });
  }
};
</script>

<style lang="scss" scoped>
.outlinemap {
  width: 100%;
  height: 100%;
}
</style>
