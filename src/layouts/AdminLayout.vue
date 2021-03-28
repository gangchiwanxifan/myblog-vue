<template>
  <div class="nav-theme-dark">
    <a-layout id="components-layout-side" style="min-height: 100vh">
      <a-layout-sider
        :trigger="null"
        v-model="collapsed"
        collapsible
        width="256px"
      >
        <div class="logo">
          <img src="~@/assets/spring.svg" class="svg-logo" alt="logo" />
          <h1>Simple Blog</h1>
        </div>
        <SiderMenu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header class="header" />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "../components/GlobalHeader";
import Footer from "../components/GlobalFooter";
import SiderMenu from "../components/SiderMenu";

export default {
  data() {
    return {
      collapsed: false,
    };
  },
  components: {
    Header,
    Footer,
    SiderMenu,
  },
};
</script>

<style lang="less" scoped>
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger:hover {
  background-color: #eeeeee;
}
.header {
  float: right;
  margin-right: 20px;
}
.logo {
  position: relative;
  height: 64px;
  padding-left: 24px;
  overflow: hidden;
  line-height: 64px;
  // background: #002140;

  .svg-logo {
    width: 40px;
    height: 40px;
    display: inline-block;
    vertical-align: middle;
  }

  h1 {
    display: inline-block;
    margin: 0 0 0 12px;
    font-size: 20px;
    font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
    font-weight: 600;
    vertical-align: middle;
  }
}

.nav-theme-dark {
  /deep/ .logo {
    h1 {
      color: #ffffff;
      font-style: italic;
      font-size: 22px;
      font-family: revert;
    }
  }
}
</style>
