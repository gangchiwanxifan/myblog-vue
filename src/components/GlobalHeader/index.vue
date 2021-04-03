<template>
  <div>
    <div v-if="loginStatus">
      <a-button class="edit-button" shape="round" @click="handleToEdit"
        ><a-icon type="highlight" />写文章</a-button
      >
      <a-dropdown placement="bottomRight" class="right-dropdown">
        <span class="ant-pro-account-avatar">
          <a-avatar
            :src="avatar"
            :loadError="loadError"
            class="antd-pro-global-header-index-avatar"
          />
          <a-icon type="down" style="padding: 0px 3px" />
        </span>

        <template v-slot:overlay>
          <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
            <a-menu-item class="menu-username"
              ><a-icon type="smile" style="font-size: 15px" />{{
                nickname
              }}</a-menu-item
            >
            <a-menu-divider v-if="menu" />
            <a-menu-item v-if="menu" key="center" @click="handleToCenter">
              <a-icon type="user" />
              个人中心
            </a-menu-item>
            <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
              <a-icon type="setting" />
              个人设置
            </a-menu-item>
            <a-menu-item v-if="userInfo.role" key="key" @click="handleToAdmin">
              <a-icon type="key" />
              后台管理
            </a-menu-item>
            <a-menu-divider v-if="menu" />
            <a-menu-item key="logout" @click="handleLogout">
              <a-icon type="logout" />
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div v-else>
      <a-button
        type="primary"
        shape="round"
        class="login-btn"
        @click="$router.push({ name: 'login' })"
        >登录</a-button
      >
      <a-button
        shape="round"
        class="login-btn"
        @click="$router.push({ name: 'register' })"
        >注册</a-button
      >
    </div>
  </div>
</template>

<script>
import { Modal } from "ant-design-vue";

export default {
  name: "AvatarDropdown",
  data() {
    return {
      nickname: "",
      avatar: "",
    };
  },
  props: {
    currentUser: {
      type: Object,
      default: () => null,
    },
    menu: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    if (this.loginStatus) {
      this.nickname = this.userInfo.nickname;
      this.avatar = this.userInfo.avatar;
    }
  },
  computed: {
    loginStatus() {
      return this.$store.state.user.loginStatus;
    },
    userInfo() {
      return this.$store.state.user.userInfo;
    },
  },
  watch: {
    userInfo: function (val) {
      this.accountName = val.accountName;
      this.avatar = val.avatar;
    },
  },
  methods: {
    loadError() {
      this.avatar = "/avatar.png";
    },
    handleToEdit() {
      this.$router.push({ path: "/blog/edit" });
    },
    handleToCenter() {
      this.$router.push({ path: `/center/${this.userInfo.userId}` });
    },
    handleToSettings() {
      this.$router.push({ path: "/settings" });
    },
    handleToAdmin() {
      this.$router.push({ path: "/admin" });
    },
    handleLogout() {
      Modal.confirm({
        title: "信息",
        content: "您确定要注销吗？",
        onOk: () => {
          return this.$store.dispatch("clearUserInfo").then(() => {
            this.$router.push({ name: "login" });
          });
        },
        onCancel() {},
      });
    },
  },
};
</script>

<style lang="less" scoped>
div {
  height: 58px;
}
.ant-pro-account-avatar {
  padding: 0 10px;
}
.right-dropdown {
  height: 100%;
  display: inline-block;
}
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
.menu-username {
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.65);
}
.edit-button {
  background-color: rgba(248, 80, 13, 0.062);
  vertical-align: middle;
}
.login-btn {
  width: 80px;
  margin-left: 20px;
}
</style>
