<template>
  <Dropdown ref="dropdown" class="collased-menu-dropdown" placement="right-start" @on-click="handSelect">
    <a class="drop-menu-a" type="text">
      <Icon :size="iconSize" :color="textColor" :type="parentItem.icon" />
      <span class="menu-title" v-if="!hideTitle" :style="{ marginLeft: '-5px', flex: 1 }">{{ parentItem.title }}</span>
      <Icon v-if="!hideTitle" type="ios-arrow-forward" :size="16" />
    </a>
    <DropdownMenu ref="dropdown" slot="list">
      <template v-for="child in parentItem.children">
        <CollapsedMenu v-if="child.children && child.children.length !== 0" :parent-item="child" :key="`drop-${child.name}`"></CollapsedMenu>
        <DropdownItem v-else :key="`drop-${child.name}`" :name="child.name">
          <Icon :size="iconSize" :type="child.icon" />
          <a class="menu-title">{{ child.title }}</a>
        </DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
export default {
  name: 'CollapsedMenu',
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    },
    iconSize: {
      type: Number,
      default: 20
    },
    textColor: {
      type: String,
      default: '#fff'
    },
    parentItem: {
      type: Object,
      default: () => { }
    }
  },
  methods: {
    handSelect(item) {
      this.$emit('on-click', item)
    }
  }
}
</script>

<style lang="scss">
.ivu-dropdown,
.ivu-tooltip {
  min-width: 100%;
  .ivu-tooltip-rel {
    width: 100%;
  }
}

.ivu-dropdown-rel,
.ivu-tooltip-rel {
  width: 100%;
  display: flex;
  align-items: center;
}
.ivu-select-dropdown {
  width: auto;
}
.ivu-dropdown-item {
  padding: 10px 15px;
  a {
    color: #495060;
    display: inline-block;
    width: 100%;
  }
}

a.drop-menu-a {
  display: inline-block;
  padding: 10px 15px;
  width: 100%;
  text-align: center;
  color: #495060;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
