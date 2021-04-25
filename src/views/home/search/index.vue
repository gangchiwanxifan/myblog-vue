<template>
  <div class="container-index">
    <div style="max-width: 1000px; margin: 0 auto">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1">
          <span slot="tab">
            搜索列表
            <!-- <a-icon type="search" /> -->
          </span>
          <a-spin :spinning="loading" size="large">
            <div class="total-wrap">
              <span
                >有关'{{ keyword }}'的搜索结果，共{{ data.length }}条数据</span
              >
            </div>
            <div v-if="data.length">
              <a-list item-layout="vertical" size="large" :data-source="data">
                <a-list-item
                  slot="renderItem"
                  :key="item.title"
                  slot-scope="item"
                >
                  <!-- {{ item }} -->
                  <img
                    slot="extra"
                    height="125px"
                    alt="logo"
                    :src="item.blogAvatar"
                  />
                  <a-list-item-meta>
                    <a
                      slot="title"
                      @click="$router.push({ path: `/blog/${item.blogId}` })"
                      class="list-title"
                      >{{ item.blogTitle }}</a
                    >
                    <template slot="description">
                      <span>
                        <a-tag
                          v-for="tag in item.blogTags.split(',')"
                          :key="tag"
                          :color="tagColor[Math.floor(Math.random() * 7)]"
                          >{{ tag }}
                        </a-tag>
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
                    <span
                      @click="
                        $router.push({ path: `/center/${item.blogAuthorId}` })
                      "
                    >
                      <a-avatar
                        :src="item.avatar"
                        :size="24"
                        style="margin-right: 8px"
                      />
                      <!-- <a-icon type="user" style="margin-right: 8px" /> -->
                      {{ item.nickname }}
                    </span>
                    <span>
                      <!-- <a-icon type="heart" style="margin-right: 8px" /> -->
                      <icon-font type="icon-xihuan" style="margin-right: 8px" />
                      {{ item.favoriteCount }}
                    </span>
                    <span>
                      <!-- <a-icon type="message" style="margin-right: 8px" /> -->
                      <icon-font
                        type="icon-pinglun"
                        style="margin-right: 8px"
                      />
                      {{ item.commentCount }}
                    </span>
                    <span>
                      <!-- <a-icon type="eye" style="margin-right: 8px" /> -->
                      <icon-font
                        type="icon-xianshi"
                        style="margin-right: 8px"
                      />
                      {{ item.blogViews }}
                    </span>
                  </template>
                </a-list-item>

                <!-- footer -->
                <!-- <div slot="footer" style="text-align: center; margin-top: 16px">
                <a-button>加载更多</a-button>
              </div> -->
              </a-list>
            </div>
            <div v-else class="no-data" />
          </a-spin>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      loading: true,
      data: [],
      tagColor: ["pink", "green", "cyan", "blue", "purple", "orange", "red"],
      keyword: "",
    };
  },
  mounted() {
    this.keyword = this.$route.query.keyword;
    this.getList();
  },
  computed: {},
  watch: {
    $route(to, from) {
      if (to.query != from.query) {
        this.getList();
      }
    },
  },
  methods: {
    getList() {
      this.loading = true;
      request({
        url: "/blog/search",
        method: "post",
        data: { keyword: this.$route.query.keyword },
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
.container-index {
  background-color: #fff;
  // border-top: 1px solid #e7e7e7;
  min-height: 80vh;
}
.no-data {
  margin: 20px auto;
  width: 100%;
  height: 350px;
  background: url(/no-data2.png) no-repeat center top #fff;
  border-radius: 12px;
}
/deep/ .ant-tabs-nav {
  margin-top: 20px;
  .ant-tabs-tab {
    font-size: 18px;
    color: #00a1d6;
  }
  .ant-tabs-ink-bar {
    width: 100px;
    background-color: #00a1d6;
  }
}
.total-wrap {
  line-height: 16px;
  color: #99a2aa;
  font-size: 12px;
  // padding-left: 15px;
}
</style>
