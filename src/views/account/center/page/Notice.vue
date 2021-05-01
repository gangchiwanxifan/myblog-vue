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
            <a-menu-item key="0" @click="updateMenu('0')">最新消息</a-menu-item>
            <a-menu-item key="1" @click="updateMenu('1')">历史消息</a-menu-item>
          </a-menu>
        </div>
        <div class="page-notice-right">
          <a-spin :spinning="loading">
            <a-list :pagination="pagination" :data-source="data">
              <a-list-item
                slot="renderItem"
                key="item.noticeId"
                slot-scope="item"
              >
                <a
                  v-if="selectedKeys[0] == 0"
                  slot="actions"
                  @click="hasCheck(item.noticeId)"
                  >标为已读</a
                >
                <a-list-item-meta>
                  <a-avatar slot="avatar" :src="item.avatar" />
                  <div slot="title">
                    <a
                      @click="
                        $router.push({ path: `/center/${item.noticeSendId}` })
                      "
                    >
                      {{ item.nickname }} </a
                    >&nbsp; <span> {{ event[item.event] }} </span>&nbsp;
                    <a
                      v-if="item.noticeBlogId"
                      @click="
                        $router.push({ path: `/blog/${item.noticeBlogId}` })
                      "
                    >
                      {{ "《" + item.blogTitle + "》" }}
                    </a>
                  </div>
                  <div slot="description">{{ item.createTime | timefix }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-spin>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import request from "@/utils/request";
import { timeTransform } from "@/utils/util";

const event = [
  "关注了你",
  "收藏了你的文章",
  "评论了你的文章",
  "回复了你的评论",
  "打赏了你的文章",
];

export default {
  mounted() {
    this.getNotice(0);
  },
  data() {
    return {
      event,
      pagination: {
        // onChange: () => {
        //   document.documentElement.scrollTop = 200;
        // },
        pageSize: 10,
        hideOnSinglePage: true,
      },
      loading: true,
      data: [],
      selectedKeys: ["0"],
    };
  },
  computed: {
    userId() {
      return this.$store.state.user.userInfo.userId;
    },
  },
  watch: {
    selectedKeys() {
      this.getNotice(...this.selectedKeys);
    },
  },
  filters: {
    timefix: function (value) {
      const time = timeTransform(value);
      return time;
    },
  },
  methods: {
    updateMenu(selectedKey) {
      if (this.selectedKeys != [selectedKey]) {
        this.selectedKeys = [selectedKey];
      }
    },
    getNotice(status) {
      this.loading = true;
      const notice = {
        noticeUserId: this.userId,
        noticeStatus: status,
      };
      request({
        url: "/notice/list",
        method: "post",
        data: notice,
      }).then((res) => {
        if (res.data.data) {
          this.data = res.data.data;
          this.loading = false;
        }
      });
    },
    hasCheck(noticeId) {
      const notice = {
        noticeId: noticeId,
        noticeStatus: 1,
      };
      request({
        url: "/notice/update",
        method: "post",
        data: notice,
      }).then((res) => {
        if (res.data.data) {
          this.$message.success("success!");
          this.data = this.data.filter((notice) => notice.noticeId != noticeId);
          if (this.data.length <= 0) {
            this.$emit("hasChecked");
          }
        }
      });
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
    min-height: 40vh;
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
