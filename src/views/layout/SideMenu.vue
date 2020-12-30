<template>
  <div class="app-side-menu">
    <Menu ref="side_menu" v-show="!collapsed" width="auto" :active-name="activeName" :open-names="openNames" @on-select="handleSelect">
      <template v-for="item in menuList">
        <SideMenuItem v-if="item.children && item.children.length !== 0" :parent-item="item" :key="'menu-' + item.name"></SideMenuItem>
        <MenuItem v-else :name="item.name" :key="'menu-' + item.name">
          <Icon :type="item.icon" :size="15" />
          <span>{{ item.title }}</span>
        </MenuItem>
      </template>
    </Menu>
    <div class="menu-collapsed" v-show="collapsed">
      <template v-for="item in menuList">
        <CollapsedMenu v-if="item.children && item.children.length !== 0" @on-click="handleSelect" hideTitle theme="dark" :parent-item="item" :key="`drop-menu-${item.name}`"></CollapsedMenu>
        <Tooltip transfer v-else :content="item.title" placement="right" :key="`drop-menu-${item.name}`">
          <a class="drop-menu-a" :style="{ textAlign: 'center' }" @click="handleSelect(item.name)">
            <Icon size="20" color="#fff" :type="item.icon || (item.children && item.children[0].icon)" />
          </a>
        </Tooltip>
      </template>
    </div>
  </div>
</template>

<script>
import SideMenuItem from './SideMenuItem';
import CollapsedMenu from './CollapsedMenu';
export default {
  name: 'SideMenu',
  components: { SideMenuItem, CollapsedMenu },
  props: {
    collapsed: {
      type: Boolean
    },
    menuList: {
      type: Array
    }
  },
  data() {
    return {
      activeName: '',
      openNames: []
    };
  },
  created() {
    this.getActiveAndOpen(this.$route.path);
    this.handleSelect(this.$route.name);
  },
  watch: {
    // 监控路由
    $route(to) {
      this.getActiveAndOpen(to.path);
      this.handleSelect(to.name);
    }
  },
  methods: {
    getActiveAndOpen(path) {
      // console.log(path);
      this.activeName = path.split('/')[1];
      this.$nextTick(() => {
        this.$refs.side_menu.updateActiveName();
      });
    },
    handleSelect(name) {
      // 左侧菜单点击的路径
      let currentPath = this.getPath(name, this.menuList);
      // console.log(333,name,currentPath)
      currentPath && this.$router.push(currentPath.path);
    },
    getPath(name, menus) {
      let arr;
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].children) {
          for (let j = 0; j < menus[i].children.length; j++) {
            if (name === menus[i].children[j].name) {
              let obj = menus[i].children[j];
              obj.parent = [menus[i]];
              arr = obj;
            } else {
              if (menus[i].children[j].children) {
                for (let k = 0; k < menus[i].children[j].children.length; k++) {
                  if (name === menus[i].children[j].children[k].name) {
                    let obj = menus[i].children[j].children[k];
                    obj.parent = [...[menus[i]], ...[menus[i].children[j]]];
                    arr = obj;
                  }
                }
              }
            }
          }
        } else {
          if (name === menus[i].name) {
            arr = menus[i];
          }
        }
      }
      return arr;
    }
  }
};
</script>
<style lang="scss" scoped>
.i {
  width: 21px;
  height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
}
/deep/ .ivu-menu-submenu-title {
  display: flex;
  align-items: center;
  > i {
    @extend .i;
  }
  span {
    flex: 1;
  }
  + ul li span {
    margin-left: 10px;
  }
}

.ivu-menu-item {
  display: flex;

  > i {
    @extend .i;
  }
  span {
    margin-left: 2px;
    flex: 1;
  }
}
</style>
