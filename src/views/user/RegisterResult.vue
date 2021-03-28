<template>
  <a-result status="success" :title="msg" :sub-title="description">
    <template #extra>
      <a-button size="large" style="margin-left: 8px" @click="goHomeHandle"
        >马上登录</a-button
      >
    </template>
  </a-result>
</template>

<script>
export default {
  name: "RegisterResult",
  data() {
    return {
      description: "",
      form: {},
    };
  },
  computed: {
    msg() {
      const v = (this.form && this.form.username) || "xxx";
      return `您的账户：${v} --> 注册成功`;
    },
  },
  created() {
    this.form = this.$route.params;
    this.description = `---账号：${this.$route.params.nickname}  ---  密码${this.$route.params.password}---`;
  },
  methods: {
    goHomeHandle() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped></style>
