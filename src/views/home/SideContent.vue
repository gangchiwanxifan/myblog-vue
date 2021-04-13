<template>
  <a-card :bordered="false">
    <!-- 公告 -->
    <div class="side-module">
      <div class="side-tabs">
        <span class="side-title">
          <icon-font type="icon-tongzhi" /> 网站公告
        </span>
      </div>
      <div class="side-notice">
        <div>content...</div>
        <div>content...</div>
        <div>content...</div>
      </div>
    </div>
    <!-- 热门文章列表 -->
    <div class="side-module">
      <div class="side-tabs">
        <span class="side-title">
          <!-- <a-icon type="fire" theme="filled" /> -->
          <icon-font type="icon-fire" />
          热门文章
        </span>
      </div>
      <div class="side-rank">
        <div
          class="rank-item"
          v-for="(item, index) in blogList"
          :key="item.blogId"
          @click="$router.push({ path: `/blog/${item.blogId}` })"
        >
          <span
            class="rank-index"
            :class="{ 'rank-color-A': index < 3, 'rank-color-B': index >= 3 }"
            >{{ index + 1 }}</span
          >
          <a class="rank-title">{{ item.blogTitle | title }}</a>
        </div>
      </div>
    </div>
    <!-- 友情链接 -->
    <div class="side-module">
      <div class="side-tabs">
        <span class="side-title">
          <icon-font type="icon-lianjie" />
          友情链接
        </span>
      </div>
      <div class="side-links">
        <div>content...</div>
        <div>content...</div>
        <div>content...</div>
      </div>
    </div>

    <!-- <div class="side-title"><a-icon type="sound" /> 网站公告</div>
    <div>content...</div>
    <div>content...</div>
    <div>content...</div>
    <a-divider></a-divider>
    <div class="side-title"><a-icon type="fire" /> 热门文章</div>
    <div>content...</div>
    <div>content...</div>
    <div>content...</div>
    <a-divider></a-divider>
    <div class="side-title"><a-icon type="link" /> 友情链接</div>
    <div>content...</div>
    <div>content...</div>
    <div>content...</div> -->
  </a-card>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "sideContent",
  data() {
    return {
      blogList: [],
    };
  },
  mounted() {
    this.getHotList();
  },
  filters: {
    title: function (value) {
      var title = String(value);
      if (title.length > 18) {
        return title.substring(0, 18) + "...";
      }
      return value;
    },
  },
  methods: {
    getHotList() {
      request({
        url: "/blog/hot",
        method: "post",
      }).then((res) => {
        if (res.data.data) {
          this.blogList = res.data.data;
        }
      });
    },
    test(path) {
      // this.$route.push({ path: `/blog/${item.blogId}` })
      console.log(path);
    },
  },
};
</script>

<style lang="less" scoped>
.side-module {
  margin-bottom: 30px;
  .side-tabs {
    border-bottom: 1px solid #e5e9ef;
    min-height: 34px;
    .side-title {
      display: inline-block;
      font-size: 18px;
      color: #222;
    }
  }
  .side-rank {
    margin-top: 10px;
    .rank-item {
      line-height: 40px;
      .rank-color-A {
        background: #f25d8e;
      }
      .rank-color-B {
        background: #ccd0d7;
      }
      .rank-index {
        height: 18px;
        width: 18px;
        // background: #ff5000;
        line-height: 18px;
        border-radius: 4px;
        color: #fff;
        display: inline-block;
        text-align: center;
        margin-right: 6px;
      }
      .rank-title {
        color: #222;
        font-size: 12px;
      }
    }
  }
}
</style>
