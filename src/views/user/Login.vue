<template>
  <div class="main user-layout-login">
    <a-tabs :tabBarStyle="{ borderBottom: 'unset' }" size="large">
      <a-tab-pane tab="登录">
        <a-form ref="formLogin" :form="form" id="formRegister">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="账号"
              v-decorator="[
                'username',
                {
                  rules: [{ required: true, message: '请输入账号' }],
                  validateTrigger: ['change', 'blur'],
                },
              ]"
            >
              <a-icon
                slot="prefix"
                type="user"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input-password
              size="large"
              placeholder="密码"
              v-decorator="[
                'password',
                {
                  rules: [{ required: true, message: '请输入密码' }],
                  validateTrigger: ['change', 'blur'],
                },
              ]"
            >
              <a-icon
                slot="prefix"
                type="lock"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-checkbox
              v-decorator="['rememberMe', { valuePropName: 'checked' }]"
              >记住密码</a-checkbox
            >
            <router-link
              :to="{ name: 'register' }"
              class="user-register"
              style="float: right"
            >
              注册账号
            </router-link>
          </a-form-item>
          <a-form-item>
            <a-button
              size="large"
              type="primary"
              class="login-button"
              @click="handleSubmit"
              >登录
            </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import request from "@/utils/request";
import md5 from "md5";

export default {
  data() {
    this.$message.config({
      maxCount: 1,
    });
    this.form = this.$form.createForm(this);
    return {};
  },
  mounted() {
    //绑定事件
    window.addEventListener("keydown", this.keyDown);
  },
  methods: {
    keyDown(e) {
      //如果是回车则执行登录方法
      if (e.keyCode == 13) {
        this.handleSubmit();
      }
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let user = {
            username: values.username,
            password: values.password,
          };
          user.password = md5(values.password);
          this.$message.loading("登录中，请稍等...");
          request({
            url: "/user/login",
            method: "post",
            data: user,
          }).then((res) => {
            let id = res.data.data;
            if (id) {
              this.$store.dispatch("fetchUserInfo", id);
              setTimeout(() => {
                this.$router.push("/");
              }, 2500);
            } else {
              this.$message.error("用户名或密码错误！");
            }
          });
        }
      });
    },
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false);
  },
};
</script>

<style lang="less" scoped>
.user-layout-login {
  .user-register {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
