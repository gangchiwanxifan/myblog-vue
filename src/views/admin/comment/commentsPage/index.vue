<template>
  <div>
    <a-spin :spinning="loading" size="large">
      <a-list
        class="demo-loadmore-list"
        item-layout="horizontal"
        :data-source="data"
      >
        <div
          v-if="showLoadingMore"
          slot="loadMore"
          :style="{
            textAlign: 'center',
            marginTop: '12px',
            height: '32px',
            lineHeight: '32px',
          }"
        >
          <a-button
            class="page-btn1"
            shape="round"
            type="primary"
            :disabled="disabled1"
            @click="onLoadMore(-1)"
          >
            上一页
          </a-button>
          <a-button
            class="page-btn2"
            shape="round"
            type="primary"
            @click="onLoadMore(1)"
          >
            下一页
          </a-button>
        </div>
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions">
            <a-popconfirm
              title="确认删除该评论？"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteComment(item)"
            >
              <span slot="icon"></span>
              <a-icon type="delete" />删除评论
            </a-popconfirm>
          </a>

          <!-- <a slot="actions">more</a> -->
          <a-list-item-meta>
            <a slot="title">{{ item.nickname }}</a>
            <span slot="description">{{ item.commentContent }}</span>
            <img width="40px" slot="avatar" :src="item.avatar" />
          </a-list-item-meta>
          <div style="color: #9b9b9b">{{ item.createTime }}</div>
        </a-list-item>
      </a-list>
    </a-spin>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
      pageNum: 1,
    };
  },
  computed: {
    disabled1() {
      return this.pageNum == 1 ? true : false;
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      request({
        url: `/comment/page/${this.pageNum}`,
        method: "post",
      }).then((res) => {
        if (res.data.data) {
          this.data = res.data.data;
          this.loading = false;
        }
      });
    },
    onLoadMore(num) {
      this.loading = true;
      request({
        url: `/comment/page/${this.pageNum + num}`,
        method: "post",
      }).then((res) => {
        if (res.data.data.length) {
          this.data = res.data.data;
          this.pageNum += num;
          this.loading = false;
        } else {
          this.$message.info("没有更多啦~");
          this.loading = false;
        }
      });
    },
    deleteComment(comment) {
      this.$message.loading("正在处理，请稍后...", 0);
      request({
        url: "/comment/deletebyid",
        method: "post",
        data: { commentId: comment.commentId },
      }).then((res) => {
        if (res.data.data) {
          this.$message.success("删除成功");
          this.getList();
        } else {
          this.$message.error("操作失败");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.page-btn1 {
  float: left;
  width: 100px;
}
.page-btn2 {
  float: right;
  width: 100px;
}
// /deep/ .ant-popover-message-title {
//   padding-left: 0px;
// }
</style>

<style>
.ant-popover-message-title {
  padding-left: 0px;
}
</style>
