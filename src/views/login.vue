<template>
  <div class="login-box">
    <div class="login-title">echarts图表展示</div>
    <LoginForm @on-success-valid="login"></LoginForm>
  </div>
</template>
<script>
import LoginForm from '@/components/LoginForm';
export default {
  name: 'login',
  components: { LoginForm },
  methods: {
    login(data) {
      console.log(data);
      this.$router.push('/components');
    }
  }
};
</script>
<style lang="scss">
.login-box {
  width: 600px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 40px;
  box-shadow: 0 0 20px #333;
  .login-title {
    position: absolute;
    width: 100%;
    text-align: center;
    top: -70px;
    left: 0;
    font-size: 40px;
    font-weight: 600; 
  }
}
</style>
