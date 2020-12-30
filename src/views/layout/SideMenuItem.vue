<template>
  <Submenu :name="parentItem.name">
    <template slot="title">
      <Icon :type="parentItem.icon" v-if="parentItem.icon" :size="15" />
      <span>{{ parentItem.title }}</span>
    </template>
    <template v-for="item in parentItem.children">
      <SideMenuItem v-if="item.children&&item.children.length!==0" :parent-item="item" :key="'menu-'+item.name"></SideMenuItem>
      <MenuItem v-else :name="item.name" :key="'menu-'+item.name">
        <Icon :type="item.icon" :size="15" v-if="item.icon" />
        <span>{{ item.title }}</span>
      </MenuItem>
    </template>
  </Submenu>
</template>

<script>
export default {
  name: 'SideMenuItem',
  props: {
    parentItem: {
      type: Object,
      default: () => { }
    }
  }
}
</script>
