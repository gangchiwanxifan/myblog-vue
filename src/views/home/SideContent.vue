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
              {{ notice }}
            </span>
          </div>
        </a-spin>
      </div>
    </div>
    <!-- 热门文章列表 -->
    <div class="side-module">
      <div class="side-tabs">
        <span class="side-title">
          <icon-font type="icon-fire" />
          热门文章
        </span>
        <span
          :style="{
            float: 'right',
            fontSize: '13px',
            color: '#b4b4b4',
            marginTop: '3px',
            cursor: 'pointer',
          }"
          @click="getHotList"
        >
          <a-icon
            :style="{
              transform: `rotate(${role}deg)`,
              transition: '.5s ease',
            }"
            type="sync"
          />
          换一批
        </span>
      </div>
      <div class="side-rank" :style="{ minHeight: '204px' }">
        <a-spin :spinning="listLoading">
          <div
            class="rank-item"
            v-for="(item, index) in blogList"
            :key="item.blogId"
          >
            <span
              class="rank-index"
              :class="{
                'rank-color-A': index < 3 && pageNum == 2,
                'rank-color-B': index >= 3 || pageNum != 2,
              }"
              >{{ index + 5 * pageNum - 9 }}
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
            <div v-for="link in links" :key="link.linkId" class="link-item">
              <a target="_blank" :href="link.linkUrl">
                <a-icon class="link-icon" type="link" />
                <span>{{ link.linkName }}</span>
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
  props: {
    notice: {
      type: String,
      default: "欢迎来到Simple Blog",
    },
  },
  data() {
    return {
      noticeLoading: false,
      listLoading: true,
      linkLoading: false,
      blogList: [],
      links: [],
      role: 0,
      pageNum: 1,
    };
  },
  mounted() {
    this.getHotList();
    this.getLinks();
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
      this.role += 360;
      this.listLoading = true;
      request({
        url: `/blog/hot/${this.pageNum}`,
        method: "post",
      }).then((res) => {
        if (res.data.data.length) {
          this.blogList = res.data.data;
          this.listLoading = false;
          this.pageNum = (this.pageNum % 5) + 1;
        } else {
          if (this.pageNum != 1) {
            this.pageNum = 1;
            this.getHotList();
          }
        }
      });
    },
    getLinks() {
      request({
        url: "/link",
        method: "post",
      }).then((res) => {
        if (res.data.data) {
          this.links = res.data.data;
        }
      });
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
