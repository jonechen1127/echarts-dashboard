<template>
  <div>
    <Row class="error-container">
      <i-col span="12" class="error-img">
        <img :src="src" alt="500" />
      </i-col>
      <i-col span="12" class="error-box">
        <h1 :style="'marginTop:-50px'">500</h1>
        <h2>Sorry! 服务器出错了！</h2>
        <Button type="primary" shape="circle" size="large" @click="goBack">返回首页</Button>
      </i-col>
    </Row>
  </div>
</template>
<script>
import './error.scss';
export default {
  name: 'error500',
  data() {
    return {
      src: require('@/assets/svg/500.svg')
    }
  },
  methods: {
    goBack() {
      this.$router.push('/plan');
    }
  }
}
</script>

