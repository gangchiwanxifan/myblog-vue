<template>
  <a-layout class="ant-layout topmenu" style="min-height: 100vh">
    <a-layout-header>
      <div class="ant-top-nav-header">
        <div class="ant-top-nav-header-main">
          <div class="ant-top-nav-header-left">
            <div
              class="ant-top-nav-header-logo"
              @click="() => $router.push({ path: '/' })"
            >
              <img src="~@/assets/spring.svg" class="logo" alt="logo" />
              <h1>Simple Blog</h1>
            </div>
          </div>
          <div class="ant-top-nav-header-menu">
            <a-menu
              theme="light"
              mode="horizontal"
              :selectedKeys="selectedKeys"
              :style="{ lineHeight: '55px' }"
            >
              <a-menu-item key="/">
                <router-link :to="{ name: 'home' }">
                  <a-icon type="compass" style="font-size: 17px" />
                  <span style="font-size: 17px">发现</span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="/channel">
                <router-link :to="{ name: 'about' }">
                  <a-icon type="table" style="font-size: 17px" />
                  <span style="font-size: 17px">栏目</span>
                </router-link>
              </a-menu-item>
            </a-menu>
          </div>
          <search-box class="search-box" />
          <div class="ant-global-header-index-right">
            <Header />
          </div>
        </div>
      </div>
    </a-layout-header>
    <a-layout-content class="basicLayout-content">
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      <Footer />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import Header from "../components/GlobalHeader";
import Footer from "../components/GlobalFooter";
import SearchBox from "@/components/SearchBox";

export default {
  components: {
    Header,
    Footer,
    SearchBox,
  },
  data() {
    return {
      // selectdKeys: [],
    };
  },
  computed: {
    selectedKeys: function () {
      const routes = this.$route.matched.concat();
      return [routes.pop().path];
    },
  },
  methods: {
    updateMenu() {
      const routes = this.$route.matched.concat();
      this.selectedKeys = [routes.pop().path];
    },
  },
  // watch: {
  //   $route() {
  //     this.updateMenu();
  //   },
  // },
};
</script>

<style lang="less" scoped>
.ant-layout-header {
  line-height: 56px;
  height: 58px;
  padding: 0;
  .ant-top-nav-header {
    background-color: #fff;
    .ant-top-nav-header-main {
      height: 58px;
      max-width: 1200px;
      margin: auto;
      padding-left: 0;
      display: flex;
      .ant-global-header-index-right {
        height: 58px;
        float: right;
        height: 100%;
        margin-left: auto;
        overflow: hidden;
      }
      .search-box {
        margin-left: 30px;
      }
      .ant-top-nav-header-left {
        float: left;
        .ant-top-nav-header-logo {
          height: 56px;
          width: 165px;
          .logo {
            display: inline-block;
            height: 36px;
            width: 36px;
            vertical-align: middle;
          }
          h1 {
            line-height: 57px;
            display: inline-block;
            margin: 0 0 0 12px;
            font-weight: 600;
            font-size: 17px;
            vertical-align: top;
            font-style: oblique;
          }
        }
      }
    }
  }
}
.basicLayout-content {
  position: relative;
  // margin: 24px;
}
a-menu-item {
  font-size: 20px;
}
</style>
