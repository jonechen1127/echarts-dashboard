import Vue from 'vue';
import ECharts from 'vue-echarts';
const echarts = require('echarts');
Vue.prototype.$echarts = echarts;
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/funnel';
import 'echarts/lib/chart/radar';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/polar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/chart/graph';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/graphic';
import 'echarts/lib/component/angleAxis';
import 'echarts/lib/component/axisPointer';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/radar';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/component/legendScroll'

Vue.component('v-echarts', ECharts);
/* echarts end */
