<template>
  <div class="main user-layout-register">
    <a-tabs :tabBarStyle="{ borderBottom: 'unset' }" size="large">
      <a-tab-pane tab="用户注册">
        <a-form ref="formRegister" :form="form" id="formRegister">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="账号"
              v-decorator="[
                'accountName',
                {
                  rules: [{ required: true, message: '请输入账号' }],
                  validateTrigger: ['change', 'blur'],
                },
              ]"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="用户名"
              v-decorator="[
                'username',
                {
                  rules: [{ required: true, message: '请输入用户名' }],
                  validateTrigger: ['change', 'blur'],
                },
              ]"
            ></a-input>
          </a-form-item>

          <a-popover placement="rightTop" trigger="click">
            <template slot="content">
              <div :style="{ width: '240px' }">
                <div :class="['user-register', passwordLevelClass]">
                  {{ passwordLevelName }}
                </div>
                <a-progress
                  :percent="state.percent"
                  :showInfo="false"
                  :strokeColor="passwordLevelColor"
                />
                <div style="margin-top: 10px">
                  <span
                    >请至少输入 6 个字符。请不要使用容易被猜到的密码。
                  </span>
                </div>
              </div>
            </template>
            <a-form-item>
              <a-input-password
                size="large"
                placeholder="密码"
                v-decorator="[
                  'password',
                  {
                    rules: [
                      { required: true, message: '请输入密码' },
                      ,
                      { validator: this.handlePasswordLevel },
                    ],
                    validateTrigger: ['change', 'blur'],
                  },
                ]"
              ></a-input-password>
            </a-form-item>
          </a-popover>

          <a-form-item>
            <a-input-password
              size="large"
              placeholder="确认密码"
              v-decorator="[
                'password2',
                {
                  rules: [
                    { required: true, message: '请输入密码' },
                    { validator: this.handlePasswordCheck },
                  ],
                  validateTrigger: ['change', 'blur'],
                },
              ]"
            ></a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button
              size="large"
              type="primary"
              class="register-button"
              @click="handleSubmit"
              >注册
            </a-button>
            <router-link class="login" :to="{ name: 'login' }"
              >使用已有账号登录</router-link
            >
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { scorePassword } from "@/utils/util";
import request from "@/utils/request";

const levelNames = {
  0: "强度：太短",
  1: "强度：低",
  2: "强度：中",
  3: "强度：强",
};
const levelClass = {
  0: "error",
  1: "error",
  2: "warning",
  3: "success",
};
const levelColor = {
  0: "#ff0000",
  1: "#ff0000",
  2: "#ff7e05",
  3: "#52c41a",
};

export default {
  name: "Register",
  data() {
    this.form = this.$form.createForm(this);
    return {
      state: {
        time: 60,
        level: 0,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 0,
        progressColor: "#FF0000",
      },
    };
  },
  computed: {
    passwordLevelClass() {
      return levelClass[this.state.passwordLevel];
    },
    passwordLevelName() {
      return levelNames[this.state.passwordLevel];
    },
    passwordLevelColor() {
      return levelColor[this.state.passwordLevel];
    },
  },
  methods: {
    handlePasswordLevel(rule, value, callback) {
      if (value === "") {
        return callback();
      }
      if (value.length >= 6) {
        if (scorePassword(value) >= 10) {
          this.state.level = 1;
        }
        if (scorePassword(value) >= 20) {
          this.state.level = 2;
        }
        if (scorePassword(value) >= 30) {
          this.state.level = 3;
        }
        callback();
      } else {
        this.state.level = 0;
        callback(new Error("密码强度不够"));
      }
      this.state.passwordLevel = this.state.level;
      this.state.percent = this.state.level * 33;
    },

    handlePasswordCheck(rule, value, callback) {
      const password = this.form.getFieldValue("password");
      if (value === undefined) {
        callback(new Error(this.$t("user.password.required")));
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error("两次输入的密码不匹配"));
      }
      callback();
    },

    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let user = {
            username: values.username,
            nickname: values.nickname,
            password: values.password,
          };
          request({
            url: "/user/registered",
            method: "post",
            data: user,
          }).then((res) => {
            let id = res.data.data;
            if (id) {
              this.$router.push({
                name: "registerResult",
                params: { ...values },
              });
            } else {
              this.$message.error("注册失败,该账号已存在");
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less">
.user-register {
  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }
}

.user-layout-register {
  .ant-input-group-addon:first-child {
    background-color: #fff;
  }
}
</style>
<style lang="less" scoped>
.user-layout-register {
  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .register-button {
    width: 50%;
  }

  .login {
    float: right;
    line-height: 40px;
  }
}
</style>
