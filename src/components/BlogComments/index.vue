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
            <a @click="report(comment)"> <a-icon type="warning" />举报 </a>
            <a-popconfirm
              v-if="comment.commentUserId == userId"
              okText="确认"
              cancelText="取消"
              @confirm="deleteComment(comment)"
            >
              <div slot="title" class="message-title">
                <p>删除评论后，评论下所有回复都会被删除</p>
                <p>是否继续？</p>
              </div>
              <span slot="icon" />
              <a><a-icon type="delete" theme="filled" /> 删除</a>
            </a-popconfirm>
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
import request from "@/utils/request";

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
    deleteComment(comment) {
      this.$message.loading("正在删除，请稍等...");
      request({
        url: "/comment/delete",
        method: "post",
        data: comment,
      }).then((res) => {
        if (res.data.data) {
          this.$message.success("删除成功");
          this.$emit("updateComment");
        } else {
          this.$message.error("error");
        }
      });
    },
    report(record) {
      const comment = {
        commentId: record.commentId,
        reported: ++record.reported,
      };
      const _this = this;
      this.$confirm({
        title: "确定举报该评论?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          request({
            url: "/comment/update",
            method: "post",
            data: comment,
          }).then((res) => {
            if (res.data.data) {
              _this.$message.success("举报成功,等待管理员核实");
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

<style lang="less">
.message-title {
  text-align: center;
  p {
    margin: 0;
    font-size: 12px;
    color: #222222;
  }
}
.ant-popover-buttons {
  margin-bottom: 0px;
  text-align: center;
  button {
    font-size: 12px;
  }
}
.ant-popover-message-title {
  padding-left: 0px;
}
</style>
