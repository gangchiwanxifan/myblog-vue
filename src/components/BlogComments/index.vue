<template>
  <div>
    <div
      class="comment-container"
      v-for="comment in comments"
      :key="comment.commentId"
    >
      <div class="comment-inner">
        <img class="comment-avatar" :src="comment.avatar" />
        <div class="comment-content">
          <a class="comment-author">{{ comment.nickname }}</a>
          <p class="comment-detail">
            {{ comment.commentContent }}
          </p>
          <span class="comment-action">
            <span class="time"
              ><a-icon type="clock-circle" theme="filled" />
              {{ comment.createTime | timefix }}</span
            >
            <a
              @click="
                reply({
                  userId: comment.commentUserId,
                  nickname: comment.nickname,
                  commentId: comment.commentId,
                })
              "
            >
              <a-icon type="edit" theme="filled" /> 回复
            </a>
            <a v-if="comment.commentUserId == userId">
              <a-icon type="delete" theme="filled" /> 删除
            </a>
          </span>
        </div>
      </div>
      <div class="comment-children" v-if="comment.child">
        <blog-comments @reply="reply" :comments="comment.child" />
      </div>
      <!-- <span slot="actions" key="comment-nested-reply-to">Reply to</span>
      <a class="comment-author" slot="author">{{ comment.nickname }}</a>
      <img slot="avatar" class="comment-avatar" :src="comment.avatar" />
      <p slot="content" class="comment-content">
        {{ comment.commentContent }}
      </p> -->
    </div>
  </div>
</template>

<script>
import { timeTransform } from "@/utils/util";

export default {
  name: "BlogComments",
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    userId() {
      return this.$store.state.user.userInfo.userId;
    },
  },
  filters: {
    timefix: function (value) {
      const time = timeTransform(value);
      return time;
    },
  },
  methods: {
    reply(comment) {
      // console.log(comment);
      this.$emit("reply", comment);
    },
    test() {
      console.log();
    },
  },
};
</script>

<style lang="less" scoped>
.comment-container {
  padding: 5px 0;
  .comment-inner {
    position: relative;
    display: flex;
    // border-bottom: 1px solid #e8e8e8;
    padding-top: 15px;
    .comment-content {
      position: relative;
      flex: 1 1 auto;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 15px;
      .comment-author {
        vertical-align: middle;
        font-weight: bold;
        line-height: 18px;
        padding-bottom: 1px;
        font-family: Microsoft YaHei, arial;
        font-size: 12px;
        color: #fb7299;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        // margin-bottom: 4px;
      }
      .comment-detail {
        color: #222222;
        word-wrap: break-word;
        margin: 0 0;
        padding: 2px 0;
      }
      .comment-action {
        color: #99a2aa;
        font-size: 12px;
        .time {
          // margin: 0 20px 0 0;
        }
        a {
          margin-left: 20px;
          color: #99a2aa;
        }
      }
    }
    .comment-avatar {
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      flex-shrink: 0;
      margin-right: 20px;
    }
  }
  .comment-children {
    margin-left: 80px;
    .comment-inner {
      padding-top: 10px;
      .comment-content {
        padding-bottom: 10px;
      }
    }
    .comment-avatar {
      position: relative;
      width: 32px;
      height: 32px;
      flex-shrink: 0;
      margin-right: 10px;
    }
  }
}
</style>
