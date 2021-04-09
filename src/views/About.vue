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
      data: [],
      selectedKeys: [],
    };
  },
  mounted() {
    this.getList();
    // console.log(this.data);
  },
  methods: {
    updateMenu(selectedKey) {
      if (this.selectedKeys != [selectedKey]) {
        this.selectedKeys = [selectedKey];
      }
    },
    // 获取栏目列表
    getList() {
      this.loading = true;
      request({
        url: "/channel/list",
        method: "get",
      }).then((res) => {
        this.data = res.data.data;
        // console.log(this.data);
        // this.loading = false;
      });
    },
  },
  watch: {
    data() {
      if (this.data) {
        this.selectedKeys = [this.data[0].channelId];
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container-index {
  background-color: #fff;
  border-top: 1px solid #e7e7e7;
}
.page-main {
  display: flex;
  .page-left {
    border-right: 1px solid #e8e8e8;
    // border-top: 1px solid #e8e8e8;
    width: 210px;
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
    }
  }
}
</style>
