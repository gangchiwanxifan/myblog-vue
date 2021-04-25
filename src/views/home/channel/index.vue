<template>
  <div class="container-index" style="background-color: #fff">
    <div style="max-width: 1000px; margin: 0 auto">
      <div class="page-main">
        <div class="page-left">
          <div class="page-left-head">
            <span class="page-left-title">全部栏目 </span>
            <a-icon type="down-circle" />
            <!-- <a-divider></a-divider> -->
          </div>
          <a-spin :spinning="channelLoading">
            <a-menu
              mode="inline"
              :style="{
                border: '0',
                width: '100%',
                minHeight: '70vh',
                marginBottom: '40px',
              }"
              :selectedKeys="selectedKeys"
            >
              <a-menu-item
                v-for="item in data"
                :key="item.channelId"
                @click="updateMenu(item.channelId)"
              >
                <div class="channel-item">
                  <img :src="item.channelAvatar" height="50px" alt="" />
                  <span class="item-name">{{ item.channelName }}</span>
                </div>
              </a-menu-item>
            </a-menu>
          </a-spin>
        </div>
        <div class="page-right">
          <div class="channel-info">
            <a-spin :spinning="channelLoading">
              <div class="channel-info-left">
                <img
                  :src="currentChannel ? currentChannel.channelAvatar : ''"
                  alt=""
                />
              </div>
              <div class="channel-info-right">
                <div class="edit-btn-group">
                  <a-button
                    v-if="loginStatus"
                    size="large"
                    shape="round"
                    style="color: #42c02e; border-color: #42c02e"
                    @click="
                      $router.push({
                        path: '/blog/edit',
                        query: { channelId: currentChannel.channelId },
                      })
                    "
                    >投稿</a-button
                  >
                </div>
                <div class="title">
                  {{ currentChannel ? currentChannel.channelName : "栏目名称" }}
                </div>
                <div class="description">
                  {{
                    currentChannel
                      ? currentChannel.channelDescription
                      : "栏目描述"
                  }}
                </div>
              </div>
              <div class="clear"></div>
            </a-spin>
            <a-tabs class="tabs" v-model="activeKey">
              <a-tab-pane key="false">
                <span class="tabs-item" slot="tab">
                  <a-icon type="file-text" theme="filled" />
                  最新收录
                </span>
              </a-tab-pane>
              <a-tab-pane key="true">
                <span class="tabs-item" slot="tab">
                  <a-icon type="fire" theme="filled" />
                  热门
                </span>
              </a-tab-pane>
            </a-tabs>
            <a-spin :spinning="listLoading" size="large">
              <a-list
                item-layout="vertical"
                size="large"
                :pagination="pagination"
                :data-source="blogList"
              >
                <a-list-item
                  slot="renderItem"
                  key="item.title"
                  slot-scope="item"
                >
                  <img
                    slot="extra"
                    height="125px"
                    alt="logo"
                    :src="item.blogAvatar"
                  />
                  <a-list-item-meta>
                    <a
                      slot="title"
                      :href="'#/blog/' + item.blogId"
                      class="list-title"
                      >{{ item.blogTitle }}</a
                    >
                    <template slot="description">
                      <span>
                        <a-tag
                          v-for="tag in item.blogTags"
                          :key="tag"
                          :color="tagColor[Math.floor(Math.random() * 7)]"
                          >{{ tag }}</a-tag
                        >
                        <!-- <a-tag :color="tagColor[Math.floor(Math.random() * 7)]"
                        >设计语言</a-tag
                      >
                      <a-tag :color="tagColor[Math.floor(Math.random() * 7)]"
                        >蚂蚁金服</a-tag
                      > -->
                      </span>
                      <!-- <div class="description">
                      {{ item.description }}
                    </div> -->
                    </template>
                  </a-list-item-meta>
                  <div class="description">
                    {{ item.blogDescription }}
                  </div>
                  <!--action-->
                  <template slot="actions">
                    <span>
                      <a-icon type="user" style="margin-right: 8px" />
                      {{ item.nickname }}
                    </span>
                    <span>
                      <a-icon type="heart" style="margin-right: 8px" />
                      {{ item.favoriteCount }}
                    </span>
                    <span>
                      <a-icon type="message" style="margin-right: 8px" />
                      {{ item.commentCount }}
                    </span>
                    <span>
                      <a-icon type="eye" style="margin-right: 8px" />
                      {{ item.blogViews }}
                    </span>
                  </template>
                </a-list-item>
                <!-- footer -->
                <!-- <div slot="footer" style="text-align: center; margin-top: 16px">
                <a-button>加载更多</a-button>
              </div> -->
              </a-list>
            </a-spin>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      channelLoading: true,
      listLoading: true,
      data: [],
      activeKey: "false",
      selectedKeys: [],
      listData: [],
      pagination: {
        // onChange: () => {
        //   document.documentElement.scrollTop = 200;
        // },
        pageSize: 5,
      },
      tagColor: ["pink", "green", "cyan", "blue", "purple", "orange", "red"],
    };
  },
  mounted() {
    this.getList();
    // console.log(this.data);
  },
  computed: {
    loginStatus() {
      return this.$store.state.user.loginStatus;
    },
    currentChannel: function () {
      if (this.data) {
        const channel = this.data.find(
          (channel) => channel.channelId == this.selectedKeys
        );
        return channel;
      } else {
        return {};
      }
    },
    blogList: function () {
      if (this.listData) {
        const list = this.listData;
        for (let i = 0; i < list.length; i++) {
          list[i].blogTags = list[i].blogTags.split(",");
          // console.log(list[i].blogTas);
        }
        return list;
      } else {
        return [];
      }
    },
  },
  methods: {
    updateMenu(selectedKey) {
      if (this.selectedKeys != [selectedKey]) {
        this.selectedKeys = [selectedKey];
      }
    },
    // 获取栏目列表
    getList() {
      // this.loading = true;
      request({
        url: "/channel/list",
        method: "get",
      }).then((res) => {
        this.data = res.data.data;
        this.channelLoading = false;
        // console.log(this.data);
        // this.loading = false;
      });
    },
    // 获取文章列表
    getBlogs(id, flag) {
      this.listLoading = true;
      request({
        url: "/blog/list_channel",
        method: "post",
        data: { channelId: id, sortByViews: flag },
      }).then((res) => {
        if (res.data.data) {
          this.listData = res.data.data;
          this.listLoading = false;
          // console.log(this.listData);
        }
      });
    },
  },
  watch: {
    data() {
      if (this.data) {
        this.selectedKeys = [this.data[0].channelId];
      }
    },
    selectedKeys() {
      if (this.selectedKeys) {
        this.getBlogs(...this.selectedKeys, this.activeKey);
      }
    },
    activeKey() {
      if (this.selectedKeys) {
        this.getBlogs(...this.selectedKeys, this.activeKey);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container-index {
  background-color: #fff;
  // border-top: 1px solid #e7e7e7;
}
.page-main {
  display: flex;
  .page-left {
    border-right: 1px solid #e8e8e8;
    // border-top: 1px solid #e8e8e8;
    width: 230px;
    .page-left-head {
      padding: 10px 23px;
      border-bottom: 1px solid #e8e8e8;
    }
    .page-left-title {
      color: #333333;
      font-weight: 500;
      font-size: 16px;
    }
    .ant-menu-item {
      height: auto;
      padding: 5px 24px;
    }
    .item-name {
      margin-left: 10px;
      color: #333;
      font-size: 14px;
      vertical-align: middle;
    }
  }
  .page-right {
    flex: 1 1;
    padding: 40px 40px;
    .channel-info {
      // padding-bottom: 20px;
      .clear {
        clear: both;
        margin: 0;
        padding: 0;
      }
      .channel-info-left {
        float: left;
        img {
          width: 80px;
        }
      }
      .channel-info-right {
        float: right;
        width: calc(100% - 100px);
        .edit-btn-group {
          float: right;
        }
        .title {
          font-size: 21px;
          font-weight: 700;
          vertical-align: middle;
          max-width: 660px;
          color: #212121;
          letter-spacing: 0;
          line-height: 18px;
          margin-top: 8px;
          // text-overflow: ellipsis;
          // overflow: hidden;
          // white-space: nowrap;
        }
        .description {
          margin-top: 10px;
          color: #999;
        }
      }
      .tabs {
        padding-top: 20px;
        .tabs-item {
          color: #646464;
          font-size: 15px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
