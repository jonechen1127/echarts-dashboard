<template>
  <div class="layout">
    <Layout>
      <Header class="layout-header-bar">
        <!-- <Icon @click.native="collapsedSider" :class="['menu-icon', collapsed ? 'rotate-icon' : '']" type="md-menu" size="24"></Icon> -->
        <div class="layout-top-bar">
          <div class="top-title">
            <!-- <img :src="logo" alt="小区通行证新平台" class="logo" /> -->
            <div class="logo-text">echarts图表展示</div>
          </div>
          <Icon type="md-power" size="24" color="#fff" @click="exit" style="cursor:pointer;margin-right:10px" />
          <FullScreen></FullScreen>
        </div>
      </Header>
      <Layout>
        <Sider ref="sider" hide-trigger collapsible v-model="collapsed">
          <SideMenu :collapsed="collapsed" :menuList="menus"></SideMenu>
        </Sider>
        <Content class="layout-container">
          <transition-group name="fade" mode="out-in">
            <router-view key="router-view" class="app-router-view"></router-view>
          </transition-group>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import SideMenu from "./SideMenu";
import FullScreen from "@/components/FullScreen";
import menus from "./menus";
export default {
  components: { SideMenu, FullScreen },
  data() {
    return {
      collapsed: false,
      menus
    };
  },
  methods: {
    collapsedSider() {
      this.$refs.sider.toggleCollapse();
    },
    exit(){
      this.$router.replace('/login')
    }
  }
};
</script>
<style scoped lang="scss" >
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #212943;
  box-shadow: inset 0px -1px 0px 0px #d8d8d8;
}

.layout-container {
  background: #f4f6f9;
  min-height: calc(100vh - 66px);
 
  .app-router-view {
    padding: 15px;
    height: 100%;
    padding: 15px;
    height: calc(100vh - 66px);
    //  background:rgb(10, 49, 107);
    // max-height: calc(100vh - 66px);
    // min-height: 500px;
    overflow: auto;
  }
}

.ivu-layout .ivu-layout-sider {
  background: #fff;
  box-shadow: inset -1px 0 0 #dcdee2;
}
/deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu),
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
  color: #fff;
}
.menu-icon {
  transition: all 0.3s;
  cursor: pointer;
  margin: 0 15px;
  margin-top: 2px;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.layout-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px 0 0;
}
.layout-top-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  .top-title {
    flex: 1;
    font-size: 20px;
    display: flex;
    align-items: center;
    padding: 0 25px;
    .logo {
      width: 40px;
      height: auto;
    }
    .logo-text {
      color: #fff;
      margin-left: 10px;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 500ms ease-out;
  transform: translateX(0);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
