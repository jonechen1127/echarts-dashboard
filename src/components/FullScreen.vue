<template>
  <div v-if="showFullScreenBtn" class="full-screen-btn-con">
    <!-- <Tooltip :content="fullscreen ? '退出全屏' : '全屏'" placement="bottom"> -->
      <Icon @click.native="handleFullScreen" :type="fullscreen ? 'md-contract' : 'md-expand'" :size="22" color="#fff"></Icon>
    <!-- </Tooltip> -->
  </div>
</template>

<script>
export default {
  name: 'FullScreen',
  computed: {
    showFullScreenBtn() {
      return window.navigator.userAgent.indexOf('MSIE') < 0
    }
  },
  data() {
    return {
      fullscreen: false
    }
  },
  methods: {
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;

    }
  }
}
</script>

<style lang="scss">
.full-screen-btn-con {
  display: flex;
  align-items: center;
  margin: 0 10px;
  margin-top: 0px;
}
.ivu-tooltip-rel {
  i {
    cursor: pointer;
  }
}
</style>
