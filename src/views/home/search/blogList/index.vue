<template>
  <div>
    <a-spin :spinning="loading" size="large">
      <div class="total-wrap">
        <span>有关'{{ keyword }}'的搜索结果，共{{ data.length }}条数据</span>
      </div>
      <div v-if="data.length">
        <a-list item-layout="vertical" size="large" :data-source="data">
          <a-list-item slot="renderItem" :key="item.title" slot-scope="item">
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
                @click="$router.push({ path: `/center/${item.blogAuthorId}` })"
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
                <icon-font type="icon-pinglun" style="margin-right: 8px" />
                {{ item.commentCount }}
              </span>
              <span>
                <!-- <a-icon type="eye" style="margin-right: 8px" /> -->
                <icon-font type="icon-xianshi" style="margin-right: 8px" />
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
      tagColor: ["pink", "green", "cyan", "blue", "purple", "orange", "red"],
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
          url: "/blog/search",
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

<style></style>
