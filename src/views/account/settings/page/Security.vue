<template>
  <div>
    <a-list itemLayout="horizontal" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
          <a slot="title">{{ item.title }}</a>
          <span slot="description">
            <span class="security-list-description">{{
              item.description
            }}</span>
            <span v-if="item.value"> : </span>
            <span class="security-list-value"> {{ item.value }}</span>
          </span>
        </a-list-item-meta>
        <template v-if="item.actions">
          <a slot="actions" @click="item.actions.callback">{{
            item.actions.title
          }}</a>
        </template>
      </a-list-item>
    </a-list>

    <a-modal v-model="visible[0]" :title="titles[choice]" @ok="handleOk">
      <a-form-item>
        <a-input v-model="value" :placeholder="placeholder"></a-input>
      </a-form-item>
    </a-modal>
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
    return {
      visible: [false, false, false],
      titles: ["修改密码", "绑定手机", "绑定邮箱"],
      choice: 0,
      updateItems: ["password", "phone", "email"],
      value: "",
    };
  },
  methods: {
    handleOk() {
      if (this.choice == 0 && this.value.length < 6) {
        this.$message.warning("密码强度不够，请重新输入！");
      } else if (this.choice == 0) {
        const user = {
          userId: this.userInfo.userId,
          password: md5(this.value),
        };
        this.update(user);
        this.$set(this.visible, 0, false);
      } else if (
        this.choice == 1 &&
        !/^[1][3,4,5,7,8][0-9]{9}$/.test(this.value)
      ) {
        this.$message.warning("手机格式有误，请重新输入！");
      } else if (this.choice == 1) {
        const user = {
          userId: this.userInfo.userId,
          phone: this.value,
        };
        this.update(user);
        this.$set(this.visible, 0, false);
      } else if (
        this.choice == 2 &&
        !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(
          this.value
        )
      ) {
        this.$message.warning("邮箱格式有误，请重新输入！");
      } else if (this.choice == 2) {
        const user = {
          userId: this.userInfo.userId,
          email: this.value,
        };
        this.update(user);
        this.$set(this.visible, 0, false);
      }
    },
    pwdStrength(pwd) {
      if (pwd.length > 30) {
        return "强";
      } else if (pwd.length > 20) {
        return "中等";
      } else {
        return "弱";
      }
    },
    update(user) {
      this.$message.loading("正在更新", 0);
      request({
        url: "/user/update",
        method: "post",
        data: user,
      }).then((res) => {
        if (res.data.data) {
          this.$store.dispatch("fetchUserInfo", user.userId);
          this.$message.success("修改成功", 1);
          this.value = "";
        }
      });
    },
  },
  computed: {
    placeholder() {
      return "请输入" + this.titles[this.choice].substring(2, 4) + "...";
    },
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    phone() {
      if (this.userInfo.phone) {
        return (
          this.userInfo.phone.substring(0, 3) +
          "****" +
          this.userInfo.phone.substring(7, 11)
        );
      } else {
        return "未绑定手机";
      }
    },
    email() {
      if (this.userInfo.email) {
        return this.userInfo.email;
      } else {
        return "未绑定邮箱";
      }
    },
    data() {
      return [
        {
          title: "登录账户",
          description: "当前账户",
          value: this.userInfo.username,
          actions: {
            title: "",
            callback: () => {},
          },
        },
        {
          title: "账户密码",
          description: "当前密码强度",
          value: this.pwdStrength(this.userInfo.password),
          actions: {
            title: "修改",
            callback: () => {
              this.choice = 0;
              this.$set(this.visible, 0, true);
            },
          },
        },
        {
          title: "密保手机",
          description: "绑定手机",
          value: this.phone,
          actions: {
            title: "绑定手机",
            callback: () => {
              this.choice = 1;
              this.$set(this.visible, 0, true);
            },
          },
        },
        {
          title: "备用邮箱",
          description: "绑定邮箱",
          value: this.email,
          actions: {
            title: "绑定邮箱",
            callback: () => {
              this.choice = 2;
              this.$set(this.visible, 0, true);
            },
          },
        },
      ];
    },
  },
};
</script>

<style scoped></style>
