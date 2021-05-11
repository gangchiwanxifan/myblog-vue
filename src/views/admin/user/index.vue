<template>
  <div>
    <page-header :management="management" />
    <div class="user-content">
      <a-form layout="inline" style="margin-bottom: 20px">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="查询用户">
              <a-input v-model="keyword" placeholder="请输入关键字" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" :offset="8">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="search()">查询</a-button>
              <a-button style="margin-left: 8px" @click="reset()">
                重置
              </a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>

      <a-table
        :columns="columns"
        :data-source="userList"
        rowKey="userId"
        :loading="loading"
        :pagination="{ defaultPageSize: 6 }"
      >
        <div slot="avatar" slot-scope="avatar, record">
          <div class="avatar-container">
            <div v-if="record.locked == 1" class="mask">
              <a-icon type="lock" />
            </div>
            <img :src="avatar" alt="图片没了" style="height: 40px" />
          </div>
        </div>

        <div slot="role" slot-scope="role">
          <!-- {{ role }} -->
          {{ roleList[role] }}
        </div>

        <span slot="action" slot-scope="text, record, index">
          <template v-if="record.role < 2">
            <a v-if="record.locked == 0" @click="lock(index, 1, record.userId)">
              锁定
            </a>
            <a v-else @click="lock(index, 0, record.userId)">解锁</a>
            <a-divider type="vertical" />
            <a @click="showModal(record)">重置密码</a>
            <template v-if="currentRole == 2">
              <a-divider type="vertical" />
              <a @click="changeRole(record, index)">修改权限</a>
            </template>
          </template>
        </span>
      </a-table>

      <a-modal v-model="visible" title="密码重置" @ok="handleOk">
        当前操作的用户对象为：{{ this.userInfo.nickname }}
        <br />
        <a-form-item>
          <a-input v-model="password" placeholder="请输入新密码"></a-input>
        </a-form-item>
      </a-modal>
    </div>
  </div>
</template>

<script>
import pageHeader from "@/components/PageHeader";
import request from "@/utils/request";
import md5 from "md5";

const columns = [
  {
    title: "#",
    dataIndex: "userId",
    key: "userId",
    width: "5%",
  },
  {
    title: "头像",
    dataIndex: "avatar",
    key: "avatar",
    scopedSlots: { customRender: "avatar" },
  },
  {
    title: "昵称",
    dataIndex: "nickname",
    key: "nickname",
    ellipsis: true,
  },
  {
    title: "账号",
    dataIndex: "username",
    key: "usernmae",
  },
  {
    title: "角色",
    dataIndex: "role",
    key: "role",
    scopedSlots: { customRender: "role" },
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    width: "30%",
  },
];

const roleList = ["普通用户", "管理员", "超级管理员"];

export default {
  components: {
    pageHeader,
  },
  mounted() {
    this.getList();
  },
  computed: {
    currentRole() {
      return this.$store.state.user.userInfo.role;
    },
    userList() {
      if (this.currentRole == 1) {
        return this.data.filter((user) => user.role == 0);
      } else {
        return this.data;
      }
    },
  },
  data() {
    return {
      management: "用户管理",
      loading: true,
      columns,
      roleList,
      data: [],
      keyword: "",
      visible: false,
      password: "",
      userInfo: {},
    };
  },
  methods: {
    getList() {
      this.loading = true;
      request({
        url: "/user/list",
        method: "post",
      }).then((res) => {
        if (res.data.data) {
          this.data = res.data.data;
          this.loading = false;
        }
      });
    },
    search() {
      if (this.keyword) {
        this.loading = true;
        request({
          url: "/user/search",
          method: "post",
          data: { keyword: this.keyword },
        }).then((res) => {
          if (res.data.data) {
            this.data = res.data.data;
            this.loading = false;
          }
        });
      } else {
        this.$message.info("请输入搜索内容..");
      }
    },
    reset() {
      this.getList();
      this.keyword = "";
    },
    lock(index, locked, userId) {
      const _this = this;
      this.$confirm({
        title: locked == 0 ? "确定解锁该用户?" : "确定锁定该用户?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          _this.loading = true;
          request({
            url: "/user/update",
            method: "post",
            data: { userId: userId, locked: locked },
          }).then((res) => {
            if (res.data.data) {
              _this.$message.success("操作成功");
              _this.data[index].locked = locked;
              _this.loading = false;
            } else {
              _this.$message.error("操作失败");
            }
          });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    changeRole(record, index) {
      const role = record.role == 0 ? 1 : 0;
      const _this = this;
      this.$confirm({
        title:
          "确定将用户" +
          record.nickname +
          "的角色修改为" +
          roleList[role] +
          "?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          _this.loading = true;
          request({
            url: "/user/update",
            method: "post",
            data: { userId: record.userId, role: role },
          }).then((res) => {
            if (res.data.data) {
              _this.$message.success("操作成功");
              _this.data[index].role = role;
              _this.loading = false;
            } else {
              _this.$message.error("操作失败");
            }
          });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    showModal(record) {
      this.visible = true;
      this.userInfo = record;
    },
    handleOk() {
      if (this.password.length < 6) {
        this.$message.warning("密码强度不够!");
      } else {
        const user = {
          userId: this.userInfo.userId,
          password: md5(this.password),
        };
        this.$message.loading("正在更新", 0);
        request({
          url: "/user/update",
          method: "post",
          data: user,
        }).then((res) => {
          if (res.data.data) {
            this.$message.success("修改成功", 1);
            this.password = "";
            this.visible = false;
          } else {
            this.$message.error("操作失败", 1);
            this.password = "";
            this.visible = false;
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.user-content {
  background-color: #fff;
  min-height: 60vh;
  margin: 24px 16px;
  padding: 24px;
}
.avatar-container {
  position: relative;
  .mask {
    opacity: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      color: #d6d6d6;
      font-size: 20px;
      margin-left: -10px;
      margin-top: -10px;
    }
  }

  img,
  .mask {
    width: 40px;
    height: 100%;
  }
}
</style>
