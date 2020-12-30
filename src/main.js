import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ViewUI from 'view-design';
// import store from './store';
import 'view-design/dist/styles/iview.css';
import './assets/css/app-main.scss';
import './plugins/echarts';
Vue.use(ViewUI);
Vue.config.productionTip = false;

new Vue({
  // data: { Bus },
  // store,
  router,
  render: h => h(App)
}).$mount('#app');
