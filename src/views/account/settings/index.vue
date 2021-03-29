<template>
  <div class="page-wide">
    <a-card
      :bordered="false"
      :bodyStyle="{ padding: '16px 0', height: '100%' }"
      :style="{ height: '100%' }"
    >
      <div class="account-settings-info-main">
        <div class="account-settings-info-left">
          <a-menu
            mode="inline"
            :style="{ border: '0', width: 'auto' }"
            :selectedKeys="selectedKeys"
            type="inner"
            @openChange="onOpenChange"
          >
            <a-menu-item key="/settings/basic">
              <router-link :to="{ name: 'BasicSettings' }">
                基本设置
              </router-link>
            </a-menu-item>
            <a-menu-item key="/settings/security">
              <router-link :to="{ name: 'SecuritySettings' }">
                安全设置
              </router-link>
            </a-menu-item>
            <a-menu-item key="/settings/wallet">
              <router-link :to="{ name: 'MyWallet' }"> 我的钱包 </router-link>
            </a-menu-item>
          </a-menu>
        </div>
        <div class="account-settings-info-right">
          <div class="account-settings-info-title">
            <span>{{ $route.meta.title }}</span>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openKeys: [],
      selectedKeys: [],
    };
  },
  mounted() {
    this.updateMenu();
  },
  methods: {
    onOpenChange(openKeys) {
      this.openKeys = openKeys;
    },
    updateMenu() {
      const routes = this.$route.matched.concat();
      this.selectedKeys = [routes.pop().path];
    },
  },
  watch: {
    $route() {
      this.updateMenu();
    },
  },
};
</script>

<style lang="less" scoped>
.page-wide {
  max-width: 1200px;
  margin: 24px auto;
}
.account-settings-info-main {
  width: 100%;
  display: flex;
  height: 100%;
  overflow: auto;

  .account-settings-info-left {
    border-right: 1px solid #e8e8e8;
    width: 224px;
  }

  .account-settings-info-right {
    flex: 1 1;
    padding: 8px 40px;

    .account-settings-info-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      margin-bottom: 12px;
    }
    .account-settings-info-view {
      padding-top: 12px;
    }
  }
}
</style>
