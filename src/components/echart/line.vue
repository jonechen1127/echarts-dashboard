<template>
  <div class="line">
    <div class="line-row">
      <FocusBox title="基础折线图">
        <v-echarts style="width: 100%; height: 100%" class="echart-item" autoresize :options="lineBasicOption" ref="lineBasic"></v-echarts>
      </FocusBox>
    </div>
    <div class="line-row">
      <FocusBox title="类目折线图">
        <v-echarts style="width: 100%; height: 100%" class="echart-item" autoresize :options="lineCategoryOption" ref="lineCategory"></v-echarts>
      </FocusBox>
    </div>
    <div class="line-row">
      <FocusBox title="面积折线图">
        <v-echarts style="width: 100%; height: 100%" class="echart-item" autoresize :options="lineAreaOption" ref="lineArea"></v-echarts>
      </FocusBox>
    </div>
  </div>
</template>

<script>
import FocusBox from '@/components/FocusBox';
import line from '@/assets/js/charts/line';
export default {
  name: 'components-line',
  components: {
    FocusBox
  },
  data() {
    return {
      lineBasicOption: {},
      lineCategoryOption: {},
      lineAreaOption: {}
    };
  },
  mounted() {
    // 基础折线图
    let lineBasicCategory = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    let lineBasicData = [
      {
        seriesName: '进',
        data: [20, 40, 20, 40, 20, 40, 20, 40, 20, 40, 20, 40]
      },
      {
        seriesName: '出',
        data: [30, 60, 30, 60, 30, 60, 30, 60, 30, 60, 30, 60]
      }
    ];
    let lineBasicColor = ['#0fb5eb', '#f7c000'];
    let lineBasicGrid = [30, 25, 15, 25];
    let lineBasicUnit = ['辆', '辆'];
    let lineBasicRotate = 0;
    this.lineBasicOption = line.lineBasic(lineBasicCategory, lineBasicData, lineBasicColor, lineBasicGrid, lineBasicUnit, lineBasicRotate);

    // 类目折线图
    let lineCategoryX = ['00:00', '02:00', '04:00', '06:00', '08:00'];
    let lineCategoryY = ['00:00', '02:00', '04:00', '06:00', '08:00'];
    let lineCategoryData = [
      {
        seriesName: '早',
        data: ['00:00', '02:00', '04:00', '06:00', '08:00']
      },
      {
        seriesName: '晚',
        data: ['00:00', '02:00', '04:00', '06:00', '08:00']
      }
    ];
    let lineCategoryColor = ['#0fb5eb', '#f7c000'];
    let lineCategoryGrid = [30, 25, 15, 25];
    let lineCategoryUnit = ['', ''];
    let lineCategoryRotate = 0;
    this.lineCategoryOption = line.lineCategory(lineCategoryX, lineCategoryY, lineCategoryData, lineCategoryColor, lineCategoryGrid, lineCategoryUnit, lineCategoryRotate);

    // 面积折线图
    let lineAreaCategory = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    let lineAreaData = [
      {
        seriesName: '进',
        data: [20, 40, 20, 40, 20, 40, 20, 40, 20, 40, 20, 40]
      },
      {
        seriesName: '出',
        data: [30, 60, 30, 60, 30, 60, 30, 60, 30, 60, 30, 60]
      }
    ];
    let lineAreaColor = ['#0fb5eb', '#f7c000'];
    let lineAreaGrid = [30, 15, 15, 15];
    let lineAreaUnit = ['辆', '辆'];
    let lineAreaRotate = 0;
    this.lineAreaOption = line.lineArea(lineAreaCategory, lineAreaData, lineAreaColor, lineAreaGrid, lineAreaUnit, lineAreaRotate);
  }
};
</script>

<style lang="scss" scoped>
.line {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .line-row {
    flex: 1;
    margin-bottom: 15px;
  }
}
</style>
