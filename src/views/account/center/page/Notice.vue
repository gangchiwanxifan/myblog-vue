<template>
  <div class="page-container">
    <a-card
      :bordered="false"
      :bodyStyle="{ padding: '16px 0', height: '100%' }"
      :style="{ height: '100%' }"
    >
      <div class="page-notice-main">
        <div class="page-notice-left">
          <a-menu
            mode="inline"
            :style="{ border: '0', width: '100%' }"
            :selectedKeys="selectedKeys"
          >
            <a-menu-item key="1" @click="updateMenu('1')">最新通知</a-menu-item>
            <a-menu-item key="2" @click="updateMenu('2')">全部通知</a-menu-item>
          </a-menu>
        </div>
        <div class="page-notice-right">
          <a-list>
            <a-list-item :key="index" v-for="(item, index) in activity">
              <a-list-item-meta>
                <a-avatar slot="avatar" :src="item.user.avatar" />
                <div slot="title">
                  <span>{{ item.user.nickname }}</span
                  >&nbsp; 在&nbsp;<a href="#">{{ item.project.name }}</a
                  >&nbsp; <span>{{ item.project.action }}</span
                  >&nbsp;
                  <a href="#">{{ item.project.event }}</a>
                </div>
                <div slot="description">{{ item.time }}</div>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import request from "@/utils/request";
const activity = [
  {
    id: 1,
    user: {
      nickname: "@name",
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
    },
    project: {
      name: "白鹭酱油开发组",
      action: "更新",
      event: "番组计划",
    },
    time: "2018-08-23 14:47:00",
  },
  {
    id: 1,
    user: {
      nickname: "蓝莓酱",
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png",
    },
    project: {
      name: "白鹭酱油开发组",
      action: "更新",
      event: "番组计划",
    },
    time: "2018-08-23 09:35:37",
  },
  {
    id: 1,
    user: {
      nickname: "@name",
      avatar: "@image(64x64)",
    },
    project: {
      name: "白鹭酱油开发组",
      action: "创建",
      event: "番组计划",
    },
    time: "2017-05-27 00:00:00",
  },
  {
    id: 1,
    user: {
      nickname: "曲丽丽",
      avatar: "@image(64x64)",
    },
    project: {
      name: "高逼格设计天团",
      action: "更新",
      event: "六月迭代",
    },
    time: "2018-08-23 14:47:00",
  },
  {
    id: 1,
    user: {
      nickname: "@name",
      avatar: "@image(64x64)",
    },
    project: {
      name: "高逼格设计天团",
      action: "created",
      event: "六月迭代",
    },
    time: "2018-08-23 14:47:00",
  },
  {
    id: 1,
    user: {
      nickname: "曲丽丽",
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
    },
    project: {
      name: "高逼格设计天团",
      action: "created",
      event: "六月迭代",
    },
    time: "2018-08-23 14:47:00",
  },
];

export default {
  mounted() {
    this.getDrafts();
  },
  data() {
    return {
      activity,
      data: [],
      selectedKeys: ["1"],
    };
  },
  methods: {
    updateMenu(selectedKey) {
      if (this.selectedKeys != [selectedKey]) {
        this.selectedKeys = [selectedKey];
      }
    },
    getDrafts() {
      // const userId = this.$store.state.user.userInfo.userId;
      request({});
    },
  },
};
</script>

<style lang="less" scoped>
.page-container {
  margin-top: 16px;
  .page-notice-main {
    width: 100%;
    display: flex;
    height: 100%;
    .page-notice-left {
      border-right: 1px solid #e8e8e8;
      width: 210px;
    }
    .page-notice-right {
      flex: 1 1;
      padding: 8px 40px;
    }
  }
}
</style>
