<template>
  <div class="current-date-time">{{ formatDate(date) }}</div>
</template>
<script>
export default {
  name: 'current-date-time',
  data() {
    return { date: new Date() };
  },
  mounted() {
    var _this = this;
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改日期数据
    }, 1000);
  },
  methods: {
    setZero(a) {
      //设置小于10的数字在加0
      return a < 10 ? '0' + a : a;
    },
    formatDate(date) {
      var vm = this;
      //当前时间格式化处理
      var str = '';
      var weekDay = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      str += vm.setZero(date.getFullYear()) + '年'; //获取年份
      str += vm.setZero(date.getMonth() + 1) + '月'; //获取月份
      str += vm.setZero(date.getDate()) + '日'; //获取日
      str += ' ' + weekDay[date.getDay()]; //获取星期
      str += ' ' + vm.setZero(date.getHours()) + ':'; //获取时
      str += ' ' + vm.setZero(date.getMinutes()) + ':'; //获取分
      str += vm.setZero(date.getSeconds()); //获取秒
      return str;
    },
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除当前日期定时器
    }
  },
};
</script>
<style lang="scss">
.current-date-time {
  font-size: 22px;
  color: #fff;
}
</style>