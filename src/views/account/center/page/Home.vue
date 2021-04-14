<template>
  <div class="page-container">
    <a-row :gutter="12">
      <a-col :span="18">
        <a-card
          :bordered="false"
          :bodyStyle="{ padding: '0px', minHeight: '450px' }"
        >
          <a-spin :spinning="homeLoading" size="large">
            <mavon-editor
              :value="content"
              :subfield="false"
              :defaultOpen="'preview'"
              :toolbarsFlag="false"
              :editable="false"
              :scrollStyle="true"
              :boxShadow="false"
              :previewBackground="'#fff'"
              :ishljs="true"
            />
          </a-spin>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card
          :bordered="false"
          :bodyStyle="{ padding: '0px', color: '#000' }"
        >
          <a-spin :spinning="userLoading" size="large">
            <div class="item-1">
              <span style="font-size: 19px">账号信息</span>
            </div>
            <div class="item-2">
              <div class="item-3">
                <a-icon type="idcard" /> 用户ID：
                <span>{{ userInfo.userId }}</span>
              </div>
              <div class="item-3">
                <a-icon type="user" /> 昵称：
                <span>{{ userInfo.nickname }}</span>
              </div>
              <div class="item-3">
                <a-icon type="crown" /> 角色：
                <span>{{ role[this.userInfo.role] }}</span>
              </div>
              <div class="item-3">
                <a-icon type="clock-circle" /> 注册时间：
                <span>{{ userInfo.createTime }}</span>
              </div>
            </div>
          </a-spin>
        </a-card>
        <a-card
          :bordered="false"
          :bodyStyle="{ padding: '0px', color: '#000', marginTop: '16px' }"
        >
          <div class="item-1">
            <span style="font-size: 19px">标签</span>
          </div>
          <a-spin :spinning="userLoading" size="large">
            <div class="item-2">
              <template v-for="(tag, index) in tags">
                <a-tag class="tags" :key="tag" :color="tagColor[index % 7]">{{
                  tag
                }}</a-tag>
              </template>
              <!-- 取消编辑标签 -->
              <!-- <a-input
              v-if="inputVisible"
              ref="input"
              type="text"
              size="small"
              :style="{ width: '78px' }"
              :value="inputValue"
              @change="handleInputChange"
              @blur="handleInputConfirm"
              @keyup.enter="handleInputConfirm"
            />
            <a-tag
              class="tags"
              v-else
              style="background: #fff; borderstyle: dashed"
              @click="showInput"
            >
              <a-icon type="plus" /> New Tag
            </a-tag> -->
            </div>
          </a-spin>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import request from "@/utils/request";
const role = ["普通用户", "管理员", "超级管理员"];

export default {
  data() {
    return {
      role,
      homeLoading: true,
      userLoading: true,
      userInfo: {},
      content: "TA很懒，还没有编辑过主页...",
      inputVisible: false,
      inputValue: "",
      // userTag: "很有想法的,专注设计,辣~,大长腿,川妹子,海纳百川",
      tagColor: ["pink", "green", "cyan", "blue", "purple", "orange", "red"],
    };
  },
  mounted() {
    this.getHomePage();
    this.getUserInfo();
  },
  computed: {
    tags: function () {
      if (this.userInfo.tags) {
        return this.userInfo.tags.split(",");
      } else {
        return "";
      }
    },
    homeId() {
      return this.$route.params.userId;
    },
  },
  methods: {
    getHomePage() {
      const user = {
        userId: this.homeId,
      };
      request({
        url: "/homepage/get",
        method: "post",
        data: user,
      }).then((res) => {
        if (res.data.data) {
          this.content = res.data.data.pageContent
            ? res.data.data.pageContent
            : this.content;
          this.homeLoading = false;
        }
      });
    },
    getUserInfo() {
      request({
        url: "/user/get_user",
        method: "post",
        data: { id: this.homeId },
      }).then((res) => {
        if (res.data.data) {
          this.userInfo = res.data.data;
          this.userLoading = false;
          console.log(this.userInfo);
        }
      });
    },
    // 标签
    // showInput() {
    //   this.inputVisible = true;
    //   this.$nextTick(function () {
    //     this.$refs.input.focus();
    //   });
    // },

    // handleInputChange(e) {
    //   this.inputValue = e.target.value;
    // },

    // handleClose(removedTag) {
    //   // console.log(this.userTag);
    //   // console.log(removedTag);
    //   const tags = this.tags.filter((tag) => tag !== removedTag);
    //   this.userTag = tags.join(",");
    //   // console.log(this.userTag);
    // },

    // handleInputConfirm() {
    //   const inputValue = this.inputValue;
    //   let tags = this.tags;
    //   if (inputValue && tags.indexOf(inputValue) === -1) {
    //     tags = [...tags, inputValue];
    //   }
    //   Object.assign(this, {
    //     userTag: tags.join(","),
    //     inputVisible: false,
    //     inputValue: "",
    //   });
    //   console.log(this.userTag);
    // },
  },
};
</script>

<style lang="less" scoped>
.page-container {
  margin-top: 16px;
  // position: relative;
}
.item-1 {
  padding: 16px;
}
.item-2 {
  padding: 0 16px 24px;
}
.item-3 {
  padding: 8px 0px;
}
.markdown-body {
  border: none;
  // z-index: 1000 !important;
}
.tags {
  margin-bottom: 8px;
  height: 28px;
  line-height: 26px;
  text-align: center;
  font-size: 14px;
}
</style>
