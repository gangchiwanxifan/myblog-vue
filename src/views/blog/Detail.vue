<template>
  <div class="page-container" @click="closeSel">
    <a-card class="page-container-card" :bordered="false">
      <div class="page-title">
        <a class="favorite"><a-icon type="plus" /> 收藏</a>
        <h1 class="page-title-blog">
          <span>{{ blogDetail.blogTitle }}</span>
        </h1>
        <div class="page-title-author">
          <span>
            <a>
              <img class="title-avatar" :src="blogDetail.avatar" />
              <span class="item" style="padding: 0 7px">{{
                blogDetail.nickname
              }}</span>
            </a>
          </span>
          <span class="item">
            <span
              >分类：<a>{{ blogDetail.channelName }}</a></span
            >
          </span>
          <span class="item">浏览：{{ blogDetail.blogViews }}</span>
          <span class="update-time"
            >最后修改于：{{ blogDetail.updateTime }}</span
          >
        </div>
      </div>
      <mavon-editor
        :value="blogDetail.blogContent"
        :subfield="false"
        :defaultOpen="'preview'"
        :toolbarsFlag="false"
        :editable="false"
        :scrollStyle="true"
        :boxShadow="false"
        :previewBackground="'#fff'"
        :ishljs="true"
      />
      <a-tag
        class="tags"
        v-for="tag in tags"
        :key="tag"
        :color="tagColor[Math.floor(Math.random() * 7)]"
        >{{ tag }}</a-tag
      >
      <a-divider />
      <div>
        <a-button class="pay-btn" shape="round" type="primary"
          >赞赏支持</a-button
        >
      </div>
    </a-card>
    <!-- 评论部分 -->
    <a-card class="comment-card" :bordered="false">
      <h2>评论</h2>
      <a-comment>
        <img class="comment-avatar" slot="avatar" src="/avatar.png" />
        <div slot="content">
          <a-textarea
            id="emojiInput"
            class="comment-content"
            placeholder="发一条友善的评论"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            :rows="4"
            v-model="value"
          />
          <a-button type="primary" class="comment-submit">发表评论</a-button>
          <div>
            <a-button id="show-btn" class="emoji-btn" @click="showEmoji"
              ><a-icon type="smile" />表情</a-button
            >
          </div>
          <div class="emoji-box-container">
            <v-emoji-picker
              v-show="emojiVisible"
              class="emoji-box"
              id="emoji-box"
              :showSearch="false"
              :emojisByRow="8"
              @select="selectEmoji"
            />
          </div>
        </div>
      </a-comment>
    </a-card>
  </div>
</template>

<script>
import request from "@/utils/request";
import { VEmojiPicker } from "v-emoji-picker";

export default {
  components: {
    VEmojiPicker,
  },
  data() {
    return {
      value: "",
      emojiVisible: false,
      blogDetail: {},
      tagColor: ["pink", "green", "cyan", "blue", "purple", "orange", "red"],
    };
  },
  mounted() {
    this.getBlog(this.$route.params.id);
    // console.log(this.$route.params.id);
  },
  computed: {
    tags: function () {
      if (this.blogDetail.blogTags) {
        return this.blogDetail.blogTags.split(",");
      } else {
        return null;
      }
    },
  },
  methods: {
    getBlog(blogId) {
      request({
        url: "/blog/detail",
        method: "post",
        data: { blogId: blogId },
      }).then((res) => {
        if (res.data.data) {
          this.blogDetail = res.data.data;
        }
      });
    },
    showEmoji() {
      this.emojiVisible = !this.emojiVisible;
    },
    closeSel(event) {
      var showBtn = document.getElementById("show-btn");
      var emojiBox = document.getElementById("emoji-box");
      if (emojiBox && showBtn) {
        if (
          !(showBtn.contains(event.target) || emojiBox.contains(event.target))
        ) {
          this.emojiVisible = false;
        }
      }
    },
    // 表情输入
    selectEmoji(emoji) {
      var elInput = document.getElementById("emojiInput"); //获取输入框元素
      var start = elInput.selectionStart; // 记录光标开始的位置
      var end = elInput.selectionEnd; // 记录选中的字符 最后的字符的位置
      if (start === undefined || end === undefined) return;
      var txt = elInput.value;
      // 将表情添加到选中的光标位置
      var result = txt.substring(0, start) + emoji.data + txt.substring(end);
      elInput.value = result; // 赋值给input的value
      // 重置光标位置
      elInput.focus();
      elInput.selectionStart = start + emoji.data.length;
      elInput.selectionEnd = start + emoji.data.length;
      this.value = result; // 赋值(注意这里一定要赋值给表情输入框绑定的那个值)
    },
  },
};
</script>

<style lang="less" scoped>
.page-container {
  margin: 20px auto;
  max-width: 1200px;
  // width: 200px;
  // height: 200px;
  // background-color: #fff;
  // box-shadow: 0 0 12px rgba(0, 0, 0, 10%);
  // margin: 20px 20px;
  .page-container-card {
    // margin: 20px 20px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 10%);
    .page-title {
      padding: 10px 25px;
      padding-bottom: 0px;
      .favorite {
        float: right;
        font-size: 17px;
        font-weight: 700;
      }
      .page-title-blog {
        font-size: 28px;
        font-weight: 600;
        color: #34495e;
        // padding: 0 0 10px;
        line-height: 32px;
      }
      .page-title-author {
        margin-top: 20px;
        font-size: 14px;
        color: #999999;
        .item {
          padding: 0 10px;
        }
        .update-time {
          float: right;
        }
        .title-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }
      }
    }
    .markdown-body {
      border: none;
      z-index: 1000 !important;
    }
    .pay-btn {
      width: 300px;
      display: block;
      margin: 0 auto;
    }
  }

  .tags {
    height: 30px;
    line-height: 26px;
    text-align: center;
    font-size: 16px;
  }
  .comment-card {
    margin-top: 15px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 10%);
    .comment-avatar {
      margin: 20px 20px 0 0;
      width: 48px;
      height: 48px;
    }
    .comment-content {
      width: 60%;
      font-size: 16px;
    }
    .comment-submit {
      margin-left: 10px;
      height: 82px;
      width: 82px;
      padding: 0px;
    }
    .emoji-btn {
      margin-top: 5px;
      border: 0;
      box-shadow: 0 0 12px rgba(0, 0, 0, 10%);
      font-weight: 600;
      color: #99a2aa;
    }
    .emoji-box-container {
      position: relative;
      .emoji-box {
        box-shadow: 10px 11px 12px rgba(106, 115, 133, 30%);
        position: absolute;
        z-index: 1000;
        top: -32px;
        left: 90px;
        width: 50%;
        min-width: 325px;
      }
    }
  }
}
</style>
