<template>
  <div class="container-index" style="background-color: #fff">
    <div style="max-width: 1000px; margin: 0 auto">
      <!-- <div>{{ blogList }}</div> -->
      <a-row :gutter="24">
        <a-col :span="16">
          <a-carousel autoplay style="padding: 12px 0px">
            <img src="/swiper/img2.png" alt="图片加载失败" />
            <img src="/swiper/img1.png" alt="图片加载失败" />
          </a-carousel>
          <a-card :bordered="false" :bodyStyle="{ padding: '12px 0px' }">
            <a-spin :spinning="loading" size="large">
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
                      @click="$router.push({ path: `/blog/${item.blogId}` })"
                      class="list-title"
                      >{{ item.blogTitle }}</a
                    >
                    <template slot="description">
                      <span>
                        <a-tag
                          v-for="tag in item.blogTags"
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
                    <span>
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
            </a-spin>
          </a-card>
        </a-col>
        <a-col :span="8">
          <side-content />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import SideContent from "./SideContent";

const listData = [];
for (let i = 0; i < 10; i++) {
  listData.push({
    href: "#/blog/1",
    title: `测试文章ant design vue part ${i}`,
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  });
}
export default {
  components: {
    SideContent,
  },
  data() {
    return {
      data: [],
      loading: true,
      listData,
      pagination: {
        onChange: () => {
          document.documentElement.scrollTop = 200;
        },
        pageSize: 7,
      },
      actions: [
        { type: "user", text: "gcwxf" },
        { type: "heart", text: "156" },
        { type: "message", text: "2" },
      ],
      tagColor: ["pink", "green", "cyan", "blue", "purple", "orange", "red"],
    };
  },
  mounted() {
    this.getList();
  },
  computed: {
    blogList() {
      if (this.data) {
        const list = this.data;
        for (let i = 0; i < list.length; i++) {
          list[i].blogTags = list[i].blogTags.split(",");
          // console.log(list[i].blogTas);
        }
        return list;
      } else {
        return [];
      }
    },
    // blogLink: function (blogId) {
    //   const link = "#/blog/" + blogId;
    //   return link;
    // },
  },
  methods: {
    getList() {
      request({
        url: "/blog/list",
        method: "post",
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

<style scoped>
.container-index {
  background-color: #fff;
  border-top: 1px solid #e7e7e7;
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
</style>
