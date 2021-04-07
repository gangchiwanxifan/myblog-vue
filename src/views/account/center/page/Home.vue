<template>
  <div class="page-container">
    <a-row :gutter="12">
      <a-col :span="18">
        <a-card
          :bordered="false"
          :bodyStyle="{ padding: '0px', minHeight: '450px' }"
        >
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
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card
          :bordered="false"
          :bodyStyle="{ padding: '0px', color: '#000' }"
        >
          <div class="item-1">
            <span style="font-size: 19px">账号信息</span>
          </div>
          <div class="item-2">
            <div class="item-3">
              <a-icon type="idcard" /> 用户ID：<span>1</span>
            </div>
            <div class="item-3">
              <a-icon type="user" /> 昵称：<span>gcwxf</span>
            </div>
            <div class="item-3">
              <a-icon type="crown" /> 角色：<span>管理员</span>
            </div>
            <div class="item-3">
              <a-icon type="clock-circle" /> 注册时间：<span
                >2021-01-01 16:03:11</span
              >
            </div>
          </div>
        </a-card>
        <a-card
          :bordered="false"
          :bodyStyle="{ padding: '0px', color: '#000', marginTop: '16px' }"
        >
          <div class="item-1">
            <span style="font-size: 19px">标签</span>
          </div>
          <div class="item-2">
            <template v-for="(tag, index) in tags">
              <a-tag
                class="tags"
                closable
                @close="() => handleClose(tag)"
                :key="tag"
                :color="tagColor[index % 7]"
                >{{ tag }}</a-tag
              >
            </template>
            <a-input
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
            </a-tag>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      content: "TA很懒，还没有编辑过主页...",
      inputVisible: false,
      inputValue: "",
      userTag: "很有想法的,专注设计,辣~,大长腿,川妹子,海纳百川",
      tagColor: ["pink", "green", "cyan", "blue", "purple", "orange", "red"],
    };
  },
  mounted() {
    this.getContent();
  },
  computed: {
    tags: function () {
      if (this.userTag) {
        return this.userTag.split(",");
      } else {
        return "";
      }
    },
  },
  methods: {
    getContent() {
      request({
        url: "/blog/test_blog",
        method: "post",
      }).then((res) => {
        if (res.data.data) {
          this.content = res.data.data.blogContent;
        }
      });
    },
    // 标签
    showInput() {
      this.inputVisible = true;
      this.$nextTick(function () {
        this.$refs.input.focus();
      });
    },

    handleInputChange(e) {
      this.inputValue = e.target.value;
    },

    handleClose(removedTag) {
      // console.log(this.userTag);
      // console.log(removedTag);
      const tags = this.tags.filter((tag) => tag !== removedTag);
      this.userTag = tags.join(",");
      // console.log(this.userTag);
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      Object.assign(this, {
        userTag: tags.join(","),
        inputVisible: false,
        inputValue: "",
      });
      console.log(this.userTag);
    },
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
