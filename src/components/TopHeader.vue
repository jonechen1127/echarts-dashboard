<template>
  <div class="main-header">
    <CurrentDateTime></CurrentDateTime>
    <Weather></Weather>
    <div class="main-title">涧西区领导驾驶仓</div>
    <RightHeader class="right-item"></RightHeader>
  </div>
</template>
<script>
import Weather from '@/components/Weather';
import CurrentDateTime from '@/components/CurrentDateTime';
import RightHeader from '@/components/RightHeader';
export default {
  name: 'top-header',
  components: { Weather, CurrentDateTime, RightHeader },
};
</script>

<style lang="scss">
.flex-c {
  display: flex;
  align-items: center;
}
.main-header {
  height: 80px;
  background: #20faaa;
  position: relative;
  @extend .flex-c;
  .main-title {
    position: absolute;
    height: 100%;
    width: 30%;
    left: 50%;
    top: 0;
    font-size: 36px;
    font-weight: 600;
    color: #fff;
    transform: translateX(-50%);
    @extend .flex-c;
    justify-content: center;
  }
  .right-item {
    position: absolute;
    right: 0;
    height: 100%;
    width: 10%;
    background: red;
  }
}
</style>
