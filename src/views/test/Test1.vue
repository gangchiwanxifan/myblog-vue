<template>
  <div class="page-container">
    <a-card class="page-container-card" :bordered="false">
      <div class="page-title">
        <a class="favorite"><a-icon type="plus" /> 收藏</a>
        <h1 class="page-title-blog">
          <span>{{ blog.blogTitle }}</span>
        </h1>
        <div class="page-title-author">
          <span>
            <a>
              <img class="title-avatar" src="/avatar.png" />
              <span class="item" style="padding: 0 7px">gcwxf</span>
            </a>
          </span>
          <span class="item">
            <span>分类：<a>读书</a></span>
          </span>
          <span class="item">浏览：1726</span>
          <span class="update-time">最后修改于：{{ blog.updateTime }}</span>
        </div>
      </div>
      <mavon-editor
        :value="blog.blogContent"
        :subfield="false"
        :defaultOpen="'preview'"
        :toolbarsFlag="false"
        :editable="false"
        :scrollStyle="true"
        :boxShadow="false"
        :previewBackground="'#fff'"
        :ishljs="true"
      />
      <a-divider />
      <a-tag
        class="tags"
        v-for="tag in tags"
        :key="tag"
        :color="tagColor[Math.floor(Math.random() * 7)]"
        >{{ tag }}</a-tag
      >
    </a-card>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      blog: {},
      tagColor: ["pink", "green", "cyan", "blue", "purple", "orange", "red"],
    };
  },
  mounted() {
    this.getBlog();
  },
  computed: {
    tags: function () {
      if (this.blog.blogTags) {
        return this.blog.blogTags.split(",");
      } else {
        return null;
      }
    },
  },
  methods: {
    getBlog() {
      request({
        url: "/blog/test_blog",
        method: "post",
      }).then((res) => {
        if (res.data.data) {
          this.blog = res.data.data;
        }
      });
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
  }

  .tags {
    height: 30px;
    line-height: 26px;
    text-align: center;
    font-size: 16px;
  }
}
</style>
