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
              title="确认清楚举报信息？"
              ok-text="Yes"
              cancel-text="No"
              @confirm="reset(item)"
            >
              <span slot="icon"></span>
              忽略
            </a-popconfirm>
          </a>
          <a slot="actions">
            <a-popconfirm
              title="确认删除该评论？"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteComment(item)"
            >
              <span slot="icon"></span>
              删除
            </a-popconfirm>
          </a>

          <!-- <a slot="actions">more</a> -->
          <a-list-item-meta>
            <a slot="title">{{ item.nickname }}</a>
            <span slot="description">{{ item.commentContent }}</span>
            <img width="40px" slot="avatar" :src="item.avatar" />
          </a-list-item-meta>
          <div style="padding-right: 50px; color: #9b9b9b">
            {{ item.createTime }}
          </div>
          <div class="reported">
            <span class="text">被举报</span>
            <a-tag class="tag" :color="tagColor(item.reported)">{{
              item.reported
            }}</a-tag>
            <span class="text">次</span>
          </div>
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
        url: `/comment/reported/${this.pageNum}`,
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
        url: `/comment/reported/${this.pageNum + num}`,
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
    reset(item) {
      const comment = { commentId: item.commentId, reported: 0 };
      this.$message.loading("正在处理，请稍后...", 0);
      request({
        url: "/comment/update",
        method: "post",
        data: comment,
      }).then((res) => {
        if (res.data.data) {
          this.$message.success("重置成功");
          this.getList();
        } else {
          this.$message.error("操作失败");
        }
      });
    },
    tagColor(count) {
      if (count <= 3) {
        return "green";
      } else if (count <= 9) {
        return "orange";
      } else {
        return "red";
      }
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
.reported {
  vertical-align: middle;
  text-align: center;
  // height: 30px;
  .text {
    color: #9b9b9b;
    font-size: 12px;
    margin-right: 5px;
  }
  .tag {
    // font-size: 17px;
    // line-height: 20px;
    min-width: 30px;
  }
}
</style>

<style>
.ant-popover-message-title {
  padding-left: 0px;
}
</style>
