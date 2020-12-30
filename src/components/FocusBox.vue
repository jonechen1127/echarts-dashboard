<template>
  <div class="focus-container">
    <div class="focus-title">{{ title }}</div>
    <div class="focus-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'focus-box',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss">
.focus-container {
  height: 100%;
  border: 1px solid #d9d9d9;
  background: rgba(10, 49, 107, 1);
  box-sizing: border-box;
  .focus-title {
    padding: 0 20px;
    height: 44px;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #fff;
    border-bottom: 1px solid #212943;
    background: #212943;
  }
  .focus-content {
    height: calc(100% - 44px);
  }
}
</style>
