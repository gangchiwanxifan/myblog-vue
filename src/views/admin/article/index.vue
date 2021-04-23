<template>
  <div>
    <page-header :management="management" />
    <div class="article-content">
      <a-form layout="inline" style="margin-bottom: 20px">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="查询文章">
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
        :data-source="data"
        rowKey="blogId"
        :loading="loading"
        :pagination="{ defaultPageSize: 6 }"
      >
        <div slot="avatar" slot-scope="avatar">
          <img :src="avatar" alt="图片没了" style="height: 60px" />
        </div>
        <span slot="blogTitle" slot-scope="text, record">
          <a-tooltip placement="top">
            <template slot="title">
              <span>{{ text }}</span>
            </template>
            <a
              style="color: rgba(0, 0, 0, 0.65)"
              @click="linkTo(record.blogId)"
            >
              {{ text }}
            </a>
          </a-tooltip>
        </span>
        <span slot="tags" slot-scope="text">
          <template v-for="(tag, index) in text.split(',')">
            <a-tag
              :key="index"
              :color="tagColor[Math.floor(Math.random() * 7)]"
            >
              {{ tag }}
            </a-tag>
          </template>
        </span>
        <span slot="action" slot-scope="record">
          <a @click="sendBack(record)">退回</a>
          <a-divider type="vertical" />
          <a @click="deleteBlog(record)">删除</a>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import pageHeader from "@/components/PageHeader";
import request from "@/utils/request";

const columns = [
  {
    title: "封面",
    dataIndex: "blogAvatar",
    key: "blogAvatar",
    scopedSlots: { customRender: "avatar" },
    width: "20%",
  },
  {
    title: "标题",
    dataIndex: "blogTitle",
    key: "blogTitle",
    slots: "title",
    scopedSlots: { customRender: "blogTitle" },
    width: "20%",
    ellipsis: true,
  },
  {
    title: "作者",
    dataIndex: "nickname",
    key: "nickname",
  },
  {
    title: "标签",
    dataIndex: "blogTags",
    key: "blogTags",
    scopedSlots: { customRender: "tags" },
    width: "30%",
    ellipsis: true,
  },
  {
    title: "访问量",
    dataIndex: "blogViews",
    key: "blogViews",
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  components: {
    pageHeader,
  },
  mounted() {
    this.getList();
  },
  data() {
    return {
      management: "文章管理",
      keyword: "",
      columns,
      data: null,
      loading: false,
      tagColor: ["pink", "green", "cyan", "blue", "purple", "orange", "red"],
    };
  },
  methods: {
    getList() {
      this.loading = true;
      request({
        url: "/blog/list",
        method: "get",
      }).then((res) => {
        if (res.data.data) {
          this.data = res.data.data;
          this.loading = false;
        }
      });
    },
    linkTo(blogId) {
      let url = this.$router.resolve({ path: `/blog/${blogId}` }).href;
      window.open(url, "_blank");
    },
    reset() {
      this.getList();
      this.rowkey = "";
    },
    search() {
      this.loading = true;
      request({
        url: "/blog/search",
        method: "post",
        data: { keyword: this.keyword },
      }).then((res) => {
        if (res.data.data) {
          this.data = res.data.data;
          this.loading = false;
        }
      });
    },
    sendBack(record) {
      const _this = this;
      this.$confirm({
        title: "确定将该文章退回至草稿箱?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          _this.loading = true;
          request({
            url: "/blog/update",
            method: "post",
            data: { blogId: record.blogId, blogStatus: 1 },
          }).then((res) => {
            if (res.data.data) {
              _this.$message.success("退回成功");
              // _this.getList();
              _this.data = _this.data.filter(
                (blog) => blog.blogId != record.blogId
              );
              _this.loading = false;
            } else {
              _this.$message.error("退回失败");
              _this.loading = false;
            }
          });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    deleteBlog(record) {
      const _this = this;
      this.$confirm({
        title: "确定删除该文章?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          _this.loading = true;
          request({
            url: "/blog/delete",
            method: "post",
            data: { blogId: record.blogId },
          }).then((res) => {
            if (res.data.data) {
              _this.$message.success("删除成功");
              // _this.getList();
              _this.data = _this.data.filter(
                (blog) => blog.blogId != record.blogId
              );
              _this.loading = false;
            } else {
              _this.$message.error("删除失败");
              _this.loading = false;
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
.article-content {
  background-color: #fff;
  min-height: 60vh;
  margin: 24px 16px;
  padding: 24px;
}
</style>
