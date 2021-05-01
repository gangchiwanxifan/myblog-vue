<template>
  <div>
    <a-spin :spinning="loading" size="large">
      <div class="total-wrap">
        <span>有关'{{ keyword }}'的搜索结果，共{{ data.length }}条数据</span>
      </div>
      <div v-if="data.length">
        <a-list v-if="data.length" item-layout="horizontal" :data-source="data">
          <div slot="footer">没有更多啦~</div>
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta :description="item.introduction">
              <div slot="title">
                <a style="font-size: 16px; color: rgb(251, 114, 153)">{{
                  item.nickname
                }}</a>
                &nbsp;
                <span style="color: #aaa; font-size: 12px; padding: 10px">
                  {{ item.createTime }}
                </span>
              </div>
              <img
                class="avatar"
                size="large"
                slot="avatar"
                :src="item.avatar"
              />
            </a-list-item-meta>
            <div slot="actions">
              <a-button
                type="primary"
                style="background-color: rgb(251, 114, 153); border: 0"
                @click="$router.push({ path: `/center/${item.userId}` })"
              >
                <a-icon type="home" />TA的主页</a-button
              >
            </div>
          </a-list-item>
        </a-list>
      </div>
      <div v-else class="no-data" />
    </a-spin>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  props: {
    keyword: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading: true,
      data: [],
    };
  },
  mounted() {
    this.getList();
  },
  watch: {
    keyword() {
      this.getList();
    },
  },
  methods: {
    getList() {
      if (this.keyword) {
        this.loading = true;
        request({
          url: "/user/search",
          method: "post",
          data: { keyword: this.keyword },
        }).then((res) => {
          if (res.data.data) {
            this.data = res.data.data;
            this.loading = false;
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.avatar {
  border-radius: 50%;
  width: 50px;
}
</style>
