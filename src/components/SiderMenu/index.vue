<template>
  <div style="width: 256px">
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
      mode="inline"
      theme="dark"
    >
      <a-menu-item key="1" @click="goTo('/admin/dashboard')">
        <a-icon type="pie-chart" />
        <span>仪表盘</span>
      </a-menu-item>
      <a-menu-item key="2" @click="goTo('/admin/blog')">
        <a-icon type="desktop" />
        <span>文章管理</span>
      </a-menu-item>
      <a-menu-item key="3" @click="goTo('/admin/channel')">
        <a-icon type="inbox" />
        <span>栏目管理</span>
      </a-menu-item>
      <a-menu-item key="4" @click="goTo('/admin/comment')">
        <a-icon type="pie-chart" />
        <span>评论管理</span>
      </a-menu-item>
      <a-menu-item key="5" @click="goTo('/admin/user')">
        <a-icon type="desktop" />
        <span>用户管理</span>
      </a-menu-item>
      <a-menu-item key="6" @click="goTo('/admin/role')">
        <a-icon type="inbox" />
        <span>角色管理</span>
      </a-menu-item>
      <a-menu-item key="7" @click="goTo('/admin/system')">
        <a-icon type="inbox" />
        <span>系统配置</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  methods: {
    goTo(path) {
      if (this.$route.path != path) {
        this.$router.push({ path: path });
      }
    },
  },
};
</script>
