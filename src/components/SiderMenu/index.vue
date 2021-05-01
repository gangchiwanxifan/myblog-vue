<template>
  <div style="width: 256px">
    <a-menu :selectedKeys="selectedKeys" mode="inline" theme="dark">
      <a-menu-item key="/admin/dashboard" @click="goTo('/admin/dashboard')">
        <a-icon type="pie-chart" />
        <span>工作台</span>
      </a-menu-item>
      <a-menu-item key="/admin/blog" @click="goTo('/admin/blog')">
        <a-icon type="book" />
        <span>文章管理</span>
      </a-menu-item>
      <a-menu-item key="/admin/channel" @click="goTo('/admin/channel')">
        <a-icon type="container" />
        <span>栏目管理</span>
      </a-menu-item>
      <a-menu-item key="/admin/comment" @click="goTo('/admin/comment')">
        <a-icon type="message" />
        <span>评论管理</span>
      </a-menu-item>
      <a-menu-item key="/admin/user" @click="goTo('/admin/user')">
        <a-icon type="team" />
        <span>用户管理</span>
      </a-menu-item>
      <!-- <a-menu-item key="6" @click="goTo('/admin/role')">
        <a-icon type="crown" />
        <span>角色管理</span>
      </a-menu-item> -->
      <a-menu-item key="/admin/system" @click="goTo('/admin/system')">
        <a-icon type="setting" />
        <span>系统配置</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedKeys: [],
    };
  },
  mounted() {
    this.selectedKeys = [this.$route.path];
  },
  methods: {
    goTo(path) {
      if (this.$route.path != path) {
        this.$router.push({ path: path });
      }
    },
  },
  watch: {
    "$route.path": function (val) {
      this.selectedKeys = [val];
    },
  },
};
</script>
