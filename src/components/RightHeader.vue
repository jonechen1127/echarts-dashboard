<template>
  <div class="right-header">
    <Icon type="md-home" size="24" color="#fff" />
    <Icon type="md-power" size="24" color="#fff"/>
    <FullScreen style="margin:0 20px;"></FullScreen>
    <Poptip trigger="hover" placement="bottom-end" popper-class="app-poptip-info" :width="150" :transfer="true">
      <Icon type="md-person" size="24" color="#fff" />
      <ul class="profile" slot="content">
        <li @click="toManger">
          <i class="app-icon app-icon-user"></i>
          <span>管理员</span>
        </li>
        <li @click="toExit">
          <i class="app-icon app-icon-exitsystem"></i>
          <span>安全退出</span>
        </li>
      </ul>
    </Poptip>
  </div>
</template>
<script>
import FullScreen from '@/components/FullScreen';
export default {
  name: 'right-header',
  components: { FullScreen },
  methods: {
    toManger() {
      this.$router.replace('/home');
    },
    toExit() {
      this.$router.replace('/');
    },
  },
};
</script>
<style lang="scss">
.right-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  i {
    cursor: pointer;
  }
 
}
 .profile {
    li {
      height: 32px;
    }
  }
</style>
