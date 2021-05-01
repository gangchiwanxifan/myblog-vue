<template>
  <div class="container-index" style="background-color: #fff">
    <div style="max-width: 1000px; margin: 0 auto">
      <a-row :gutter="24">
        <a-col :span="16">
          <a-spin :spinning="loading" size="large">
            <a-carousel
              class="lunbotu"
              autoplay
              style="padding: 12px 0px; min-height: 30vh"
            >
              <a :href="config.swiper1Url" target="_blank">
                <img :src="config.swiper1" alt="别急！等一下" />
              </a>
              <a :href="config.swiper2Url" target="_blank">
                <img :src="config.swiper2" alt="别急！等一下" />
              </a>
            </a-carousel>
          </a-spin>
          <a-card
            :bordered="false"
            :bodyStyle="{ padding: '12px 0px', minHeight: '60vh' }"
          >
            <a-spin :spinning="loading" size="large">
              <a-list item-layout="vertical" size="large" :data-source="data">
                <a-list-item
                  slot="renderItem"
                  :key="item.title"
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
                      @click="$router.push({ path: `/blog/${item.blogId}` })"
                      class="list-title"
                      >{{ item.blogTitle }}</a
                    >
                    <template slot="description">
                      <span v-if="item.blogTags">
                        <a-tag
                          v-for="tag in item.blogTags.split(',')"
                          :key="tag"
                          :color="tagColor[Math.floor(Math.random() * 7)]"
                          >{{ tag }}
                        </a-tag>
                      </span>
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
                <div slot="footer" style="text-align: center; margin: 16px 0">
                  <a-button
                    v-if="showMore && !loading"
                    @click="loadMore"
                    :loading="loadingMore"
                    type="primary"
                    shape="round"
                    class="load-btn"
                  >
                    加载更多
                  </a-button>
                  <span class="load-text" v-else-if="!showMore && !loading"
                    >w(ﾟДﾟ)w 没有更多啦~
                  </span>
                </div>
              </a-list>
            </a-spin>
          </a-card>
        </a-col>
        <a-col :span="8">
          <side-content :notice="config.notice" />
        </a-col>
      </a-row>
    </div>
    <a-back-top>
      <div class="float-nav">
        <div @click.stop="$router.push({ path: '/blog/1' })" class="item">
          <span>问题</span>
          <span>反馈</span>
        </div>
      </div>
    </a-back-top>
  </div>
</template>

<script>
import request from "@/utils/request";
import SideContent from "./SideContent";

export default {
  components: {
    SideContent,
  },
  data() {
    return {
      data: [],
      loading: true,
      // pagination: {
      //   onChange: () => {
      //     document.documentElement.scrollTop = 200;
      //   },
      //   pageSize: 7,
      // },
      config: {},
      pageNum: 1,
      loadingMore: false,
      showMore: true,
      tagColor: ["pink", "green", "cyan", "blue", "purple", "orange", "red"],
    };
  },
  mounted() {
    this.getList();
    this.getConfig();
  },
  computed: {
    // blogList() {
    //   if (this.data) {
    //     const list = this.data;
    //     for (let i = 0; i < list.length; i++) {
    //       list[i].blogTags = list[i].blogTags.split(",");
    //       // console.log(list[i].blogTas);
    //     }
    //     return list;
    //   } else {
    //     return [];
    //   }
    // },
    // blogLink: function (blogId) {
    //   const link = "#/blog/" + blogId;
    //   return link;
    // },
  },
  methods: {
    getList() {
      request({
        url: `/blog/page/${this.pageNum}`,
        method: "get",
      }).then((res) => {
        if (res.data.data) {
          this.data = res.data.data;
          // setTimeout(() => {
          //   this.loading = false;
          // }, 1000);
          this.loading = false;
          if (res.data.data.length !== 6) {
            this.showMore = false;
          }
        }
      });
    },
    getConfig() {
      request({
        url: "/config",
        method: "post",
      }).then((res) => {
        if (res.data.data) {
          this.config = res.data.data;
        }
      });
    },
    loadMore() {
      this.loadingMore = true;
      request({
        url: `/blog/page/${++this.pageNum}`,
        method: "get",
      }).then((res) => {
        if (res.data.data) {
          this.data = this.data.concat(res.data.data);
          this.loadingMore = false;
          if (res.data.data.length !== 6) {
            this.showMore = false;
          }
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container-index {
  background-color: #fff;
  /* border-top: 1px solid #e7e7e7; */
}
.description {
  color: #999;
}
.list-title {
  color: #333;
  font-size: 18px;
  font-weight: 500;
}
.side-title {
  color: #333;
  font-weight: 800;
}
.load-btn {
  width: 80%;
}
.load-text {
  color: #99a2aa;
  font-size: 12px;
}
.lunbotu {
  img {
    width: 100%;
    max-height: 285px;
  }
}

.float-nav {
  // position: fixed;
  // left: 6px;
  // bottom: 100px;
  .item {
    background: #f7f9fa;
    border: 1px solid #e5e9ef;
    border-radius: 3px;
    width: 45px;
    height: 45px;
    margin-bottom: 8px;
    transition: all 0.3s;
    cursor: pointer;
    color: #999;
    text-align: center;
    font-size: 12px;
    &:hover {
      background: #fa541c;
      color: #fff;
    }
    span {
      display: block;
      &:first-child {
        margin-top: 4px;
      }
    }
  }
}
</style>
