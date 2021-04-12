<template>
  <div>
    <a-comment
      class="comment-container"
      v-for="comment in comments"
      :key="comment.commentId"
    >
      <span slot="actions" key="comment-nested-reply-to">Reply to</span>
      <a class="comment-author" slot="author">{{ comment.nickname }}</a>
      <img slot="avatar" class="comment-avatar" :src="comment.avatar" />
      <p slot="content" class="comment-content">
        {{ comment.commentContent }}
      </p>
      <div class="children" v-if="comment.child">
        <blog-comments :comments="comment.child" />
      </div>
    </a-comment>
  </div>
</template>

<script>
export default {
  name: "BlogComments",
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped>
.comment-container {
  // padding: 2px 0;
  .ant-comment-inner {
    padding: 2px 0;
  }
  .comment-author {
    vertical-align: middle;
    font-weight: bold;
    line-height: 18px;
    padding-bottom: 1px;
    font-family: Microsoft YaHei, arial;
    font-size: 12px;
    color: #6d757a;
  }
  .comment-avatar {
    width: 48px;
    height: 48px;
  }
  .comment-content {
    color: #222222;
  }
}
</style>
