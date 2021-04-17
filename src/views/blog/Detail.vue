<template>
  <div class="page-container" @click="closeSel">
    <div class="_3Pnjry">
      <div class="_1pUUKr">
        <div class="_2VdqdF"><a-icon type="like" theme="filled" /></div>
        <div class="P63n6G">点赞</div>
      </div>
      <div class="_1pUUKr">
        <div class="_2VdqdF">￥</div>
        <div class="P63n6G">赞赏</div>
      </div>
    </div>
    <a-spin :spinning="blogLoading" size="large">
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
        >
          {{ tag }}
        </a-tag>
        <a-divider />
        <div>
          <div class="follow-box">
            <img
              :src="blogDetail.avatar"
              style="border-radius: 50%; cursor: pointer"
              @click="
                $router.push({ path: `/center/${blogDetail.blogAuthorId}` })
              "
            />
            <div
              class="follow-content"
              @click="
                $router.push({ path: `/center/${blogDetail.blogAuthorId}` })
              "
              style="cursor: pointer"
            >
              <div class="follow-user">{{ blogDetail.nickname }}</div>
              <div class="follow-info">{{ blogDetail.introduction }}</div>
            </div>
            <div class="follow-btn">
              <a-button @click="show">关注</a-button>
            </div>
          </div>
          <span class="pay-info">"小礼物走一走，来Simple Blog关注我"</span>
          <a-button id="pay-btn" class="pay-btn" shape="round" type="primary">
            ￥赞赏支持
          </a-button>
        </div>
      </a-card>
    </a-spin>
    <!-- 评论部分 -->
    <a-card class="comment-card" :bordered="false">
      <h2>评论</h2>
      <a-comment>
        <img class="comment-avatar" slot="avatar" :src="userInfo.avatar" />
        <div slot="content">
          <a-textarea
            id="emojiInput"
            class="comment-content"
            :placeholder="placeholder"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            :rows="4"
            v-model="value"
          />
          <a-button
            v-if="!this.replyCommentId"
            type="primary"
            class="comment-btn comment-submit-btn"
            @click="handleComment"
            >发表评论</a-button
          >
          <span v-else>
            <a-button
              type="primary"
              class="comment-btn comment-submit-btn"
              @click="handleComment"
              >回复</a-button
            >
            <a-button type="danger" class="comment-btn" @click="cancelReply"
              >取消</a-button
            >
          </span>
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
      <a-spin :spinning="commentLoading">
        <div>
          <div v-if="!hasComment" class="no-reply">看看下面~来抢沙发吧</div>
          <div v-else>
            <blog-comments @reply="reply" :comments="comments" />
            <div class="no-reply">没有更多评论</div>
          </div>
        </div>
      </a-spin>
    </a-card>
  </div>
</template>

<script>
import request from "@/utils/request";
import { VEmojiPicker } from "v-emoji-picker";
import BlogComments from "@/components/BlogComments/index.vue";

export default {
  components: {
    VEmojiPicker,
    BlogComments,
  },
  data() {
    return {
      value: "",
      emojiVisible: false,
      blogDetail: {},
      placeholder: "发一条友善的评论",
      comments: [],
      replyCommentId: "",
      tagColor: ["pink", "green", "cyan", "blue", "purple", "orange", "red"],
      blogLoading: true,
      commentLoading: true,
    };
  },
  mounted() {
    this.getBlog(this.blogId);
    this.getComments(this.blogId);
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
    userInfo: function () {
      return this.$store.state.user.userInfo;
    },
    blogId: function () {
      return this.$route.params.id;
    },
    hasComment: function () {
      if (this.comments.length) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    show() {
      console.log(this.comments);
      console.log(this.hasComment);
    },
    getBlog(blogId) {
      // this.blogLoading = true;
      request({
        url: "/blog/detail",
        method: "post",
        data: { blogId: blogId },
      }).then((res) => {
        if (res.data.data) {
          this.blogDetail = res.data.data;
          this.blogLoading = false;
          console.log(this.blogLoading);
        }
      });
    },
    getComments(blogId) {
      this.commentLoading = true;
      request({
        url: `/comment/${blogId}`,
        methods: "post",
      }).then((res) => {
        if (res.data.data) {
          this.comments = res.data.data;
          // console.log(res.data.data);
          this.commentLoading = false;
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
    // 发表评论
    handleComment() {
      if (this.value) {
        const data = {
          commentBlogId: this.blogId,
          commentUserId: this.userInfo.userId,
          commentContent: this.value,
          parentId: this.replyCommentId,
        };
        request({
          url: "/comment/save",
          method: "post",
          data: data,
        }).then((res) => {
          if (res.data.data) {
            this.$message.success("评论成功~");
            this.resetComment();
            this.getComments(this.blogId);
          } else {
            this.$message.error("发生未知错误");
          }
        });
      } else {
        this.$message.warning("请输入评论内容~");
      }
    },
    reply(comment) {
      // console.log(comment);
      document.getElementById("emojiInput").scrollIntoView({
        behavior: "smooth", // 默认 auto
        block: "center", // 默认 center
        inline: "nearest", // 默认 nearest
      });
      this.placeholder = "回复 @" + comment.nickname + ":";
      this.replyCommentId = comment.commentId;
    },
    cancelReply() {
      // console.log("取消回复");
      this.resetComment();
    },
    resetComment() {
      this.placeholder = "发一条友善的评论";
      this.replyCommentId = "";
      this.value = "";
    },
  },
};
</script>

<style lang="less" scoped>
.page-container {
  margin: 20px auto;
  max-width: 1200px;
  ._3Pnjry {
    position: fixed;
    z-index: 98;
    top: 240px;
    left: calc((100vw - 1200px) / 2 - 75px);
  }
  ._1pUUKr,
  ._2VdqdF {
    display: flex;
    align-items: center;
  }
  ._1pUUKr {
    position: relative;
    flex-direction: column;
    margin-bottom: 25px;
    cursor: pointer;
    color: #969696;
  }
  ._2VdqdF {
    justify-content: center;
    width: 48px;
    height: 48px;
    font-size: 18px;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 5%);
    background-color: #fff;
  }
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
    .pay-info {
      display: block;
      width: 285px;
      margin: 0 auto;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 16px;
      color: #404040;
    }
    .pay-btn {
      width: 210px;
      display: block;
      margin: 0 auto;
      height: 45px;
      font-size: 16px;
      background-color: #00a1d6;
      border: 1px solid #00a1d6;
    }
    .follow-box {
      display: flex;
      position: relative;
      width: 60%;
      background-color: #fafafa;
      border-radius: 4px;
      padding: 12px 16px;
      margin: 0 auto 16px;
      img {
        height: 50px;
      }
      .follow-content {
        padding-left: 20px;
      }
      .follow-info {
        color: #969696;
      }
      .follow-user {
        color: #404040;
        font-size: 16px;
        padding-bottom: 5px;
      }
      .follow-btn {
        vertical-align: center;
        margin-left: auto;
        margin-top: 9px;
      }
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
      margin: 5px 20px 0 0;
      width: 60px;
      height: 60px;
    }
    .comment-content {
      width: 60%;
      font-size: 16px;
    }
    .comment-btn {
      margin-left: 10px;
      height: 82px;
      width: 82px;
      padding: 0px;
    }
    .comment-submit-btn {
      background-color: #00a1d6;
      border: 1px solid #00a1d6;
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
  .no-reply {
    width: 60%;
    color: #99a2aa;
    text-align: center;
    padding: 30px 0;
    font-size: 12px;
  }
}
</style>
