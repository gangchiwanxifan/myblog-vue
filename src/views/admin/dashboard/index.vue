<template>
  <div>
    <page-header :management="management">
      <div class="page-header-content">
        <div>
          <a-avatar class="avatar" size="large" :src="userInfo.avatar" />
        </div>
        <div class="content">
          <div class="content-title">
            {{ timeFix }}， {{ userInfo.nickname
            }}<span class="welcome-text">，{{ welcome }}</span>
          </div>
          <div>{{ userInfo.introduction }}</div>
        </div>
      </div>
    </page-header>
    <a-row :gutter="24" style="margin-top: 20px">
      <!-- 文章 -->
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="文章" :total="info.article">
          <a-tooltip title="文章总数" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <template slot="footer">
            <span class="footer" @click="$router.push({ path: '/admin/blog' })"
              >查看详情
            </span>
            <a-icon type="right" />
          </template>
        </chart-card>
      </a-col>
      <!-- 栏目 -->
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="栏目" :total="info.channel">
          <a-tooltip title="栏目总数" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <template slot="footer">
            <span
              class="footer"
              @click="$router.push({ path: '/admin/channel' })"
              >查看详情
            </span>
            <a-icon type="right" />
          </template>
        </chart-card>
      </a-col>
      <!-- 评论 -->
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="评论" :total="info.comment">
          <a-tooltip title="评论总数" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <template slot="footer">
            <span
              class="footer"
              @click="$router.push({ path: '/admin/comment' })"
              >查看详情
            </span>
            <a-icon type="right" />
          </template>
        </chart-card>
      </a-col>
      <!-- 用户 -->
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="用户" :total="info.user">
          <a-tooltip title="用户总数" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <template slot="footer">
            <span class="footer" @click="$router.push({ path: '/admin/user' })">
              查看详情
            </span>
            <a-icon type="right" />
          </template>
        </chart-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import pageHeader from "@/components/PageHeader";
import { timeFix, welcome } from "@/utils/util";
import ChartCard from "@/components/ChartCard";
import request from "@/utils/request";

export default {
  components: {
    pageHeader,
    ChartCard,
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
  },
  data() {
    return {
      management: "工作台",
      timeFix: timeFix(),
      welcome: welcome(),
      loading: false,
      info: {},
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      request({
        url: "/config/info",
        method: "post",
      }).then((res) => {
        if (res.data.data) {
          this.info = res.data.data;
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.page-header-content {
  padding-top: 12px;
  display: flex;
  .avatar {
    display: block;
    width: 72px;
    height: 72px;
    border-radius: 72px;
  }
  .content {
    position: relative;
    top: 4px;
    flex: 1 1 auto;
    margin-left: 24px;
    color: rgba(0, 0, 0, 0.45);
    line-height: 22px;
    .content-title {
      margin-bottom: 12px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }
  }
}
.footer {
  cursor: pointer;
}
</style>
