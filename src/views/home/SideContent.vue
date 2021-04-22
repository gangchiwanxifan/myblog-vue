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
        <a-spin :spinning="noticeLoading">
          <div class="notice-container">
            <icon-font
              style="font-size: 25px; margin-right: 15px"
              type="icon-yinyong"
            />
            <span style="color: #6d757a; line-height: 30px">
              欢迎来到Simple Blog，基于Nginx的高可用内容创作社区🎉🎉🎉
            </span>
          </div>
        </a-spin>
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
        <a-spin :spinning="listLoading">
          <div
            class="rank-item"
            v-for="(item, index) in blogList"
            :key="item.blogId"
          >
            <span
              class="rank-index"
              :class="{ 'rank-color-A': index < 3, 'rank-color-B': index >= 3 }"
              >{{ index + 1 }}
            </span>
            <a-tooltip placement="right">
              <template slot="title">
                <span>{{ item.blogTitle }}</span>
              </template>
              <a
                class="rank-title"
                @click="$router.push({ path: `/blog/${item.blogId}` })"
                >{{ item.blogTitle | title }}
              </a>
            </a-tooltip>
          </div>
        </a-spin>
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
        <a-spin :spinning="linkLoading">
          <div class="link-container">
            <div class="link-item">
              <a
                target="_blank"
                href="https://github.com/gangchiwanxifan/myblog-vue"
              >
                <a-icon class="link-icon" type="github" />
                <span>myblog-vue</span>
              </a>
            </div>
            <div class="link-item">
              <a
                target="_blank"
                href="https://github.com/gangchiwanxifan/myblog-springboot"
              >
                <a-icon class="link-icon" type="github" />
                <span>myblog-springboot</span>
              </a>
            </div>
            <div class="link-item">
              <a target="_blank" href="https://www.bilibili.com/">
                <icon-font class="link-icon" type="icon-bilibili" />
                <span>哔哩哔哩</span>
              </a>
            </div>
            <div class="link-item">
              <a target="_blank" href="https://www.jianshu.com/">
                <icon-font class="link-icon" type="icon-jianshu" />
                <span>简书</span>
              </a>
            </div>
          </div>
        </a-spin>
      </div>
    </div>
  </a-card>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "sideContent",
  data() {
    return {
      noticeLoading: false,
      listLoading: true,
      linkLoading: false,
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
          this.listLoading = false;
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
.notice-container {
  margin-top: 10px;
  width: 200px;
  min-height: 12vh;
  margin-bottom: 30px;
}
.link-container {
  margin-top: 10px;
  .link-item {
    line-height: 35px;
    a {
      // color: #222222;
      color: #6d757a;
    }
    .link-icon {
      font-size: 16px;
      vertical-align: middle;
      margin-right: 10px;
    }
    span {
      vertical-align: middle;
      // font-size: 12px;
    }
  }
}
</style>
