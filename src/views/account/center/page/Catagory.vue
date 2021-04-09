<template>
  <div class="page-container">
    <a-card
      :bordered="false"
      :bodyStyle="{ padding: '16px 0', height: '100%' }"
      :style="{ height: '100%' }"
    >
      <div class="page-catagory-main">
        <div class="page-catagory-left">
          <a-menu
            mode="inline"
            :style="{ border: '0', width: '100%' }"
            :selectedKeys="selectedKeys"
          >
            <a-menu-item key="111" @click="updateMenu('111')"
              ><a-icon type="book" />文章管理</a-menu-item
            >
            <a-menu-item key="222" @click="updateMenu('222')"
              ><a-icon type="book" />收藏文章</a-menu-item
            >
            <a-menu-item
              v-for="item in catagory"
              :key="item.catagoryId"
              @click="updateMenu(item.catagoryId)"
            >
              <a-icon type="book" /> {{ item.catagoryName }}
            </a-menu-item>
          </a-menu>
          <a-button class="add-catagory-btn"
            ><a-icon type="plus" />新建文集</a-button
          >
        </div>
        <div class="page-catagory-right">
          <div class="catagory-info">
            <div class="catagory-info-left">
              <img src="/catagory.png" alt="" />
            </div>
            <div class="catagory-info-right">
              <div class="edit-btn-group">
                <a-space>
                  <a-button>编辑信息</a-button>
                  <a-button type="danger"><a-icon type="delete" /></a-button>
                </a-space>
              </div>
              <div class="title">标题</div>
              <div class="description">还没有简介哦~</div>
            </div>
            <div class="clear"></div>
          </div>
          <a-divider></a-divider>
          <a-list item-layout="horizontal" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item">
              <img
                style="margin-right: 20px"
                width="160"
                alt="logo"
                :src="item.blogAvatar"
              />
              <a-list-item-meta>
                <div slot="description">
                  <div>{{ item.blogDescription.slice(0, 20) }}</div>
                  <div>最后修改时间：{{ item.updateTime }}</div>
                </div>
                <a
                  slot="title"
                  href="https://www.antdv.com/"
                  :style="{
                    color: '#000',
                    fontSize: '17px',
                    fontWeight: '500',
                  }"
                  >{{ item.blogTitle }}</a
                >
              </a-list-item-meta>
              <a-button>编辑</a-button>
              <a-divider type="vertical"></a-divider>
              <a-button type="danger" @click="showDeleteConfirm(item.blogId)"
                >删除</a-button
              >
            </a-list-item>
          </a-list>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  mounted() {
    this.getDrafts();
    this.getCatagory(this.$store.state.user.userInfo.userId);
  },
  data() {
    return {
      data: [],
      selectedKeys: ["111"],
      catagory: [],
    };
  },
  methods: {
    updateMenu(selectedKey) {
      if (this.selectedKeys != [selectedKey]) {
        this.selectedKeys = [selectedKey];
      }
    },
    getCatagory(userId) {
      request({
        url: "/catagory/list",
        method: "post",
        data: { userId: userId },
      }).then((res) => {
        this.catagory = res.data.data;
      });
    },
    getDrafts() {
      // const userId = this.$store.state.user.userInfo.userId;
      request({
        url: "blog/draft",
        method: "post",
        data: { userId: this.$store.state.user.userInfo.userId },
      }).then((res) => {
        if (res.data.data) {
          this.data = res.data.data;
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.page-container {
  margin-top: 16px;
  .page-catagory-main {
    width: 100%;
    display: flex;
    height: 100%;
    .page-catagory-left {
      border-right: 1px solid #e8e8e8;
      width: 210px;
      .add-catagory-btn {
        margin: 0 4px;
        width: 200px;
        text-align: left;
        border: 0;
        padding: 0 20px;
        background-color: #f4f5f7;
      }
    }
    .page-catagory-right {
      flex: 1 1;
      padding: 8px 40px;
      .catagory-info {
        // padding-bottom: 20px;
        .clear {
          clear: both;
          margin: 0;
          padding: 0;
        }
        .catagory-info-left {
          float: left;
          img {
            width: 110px;
          }
        }
        .catagory-info-right {
          float: right;
          width: calc(100% - 130px);
          .edit-btn-group {
            float: right;
          }
          .title {
            max-width: 660px;
            font-size: 18px;
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
      }
    }
  }
}
</style>
