<template>
  <div class="container-index" style="background-color: #fff">
    <div style="max-width: 1000px; margin: 0 auto">
      <a-row :gutter="24">
        <a-col :span="16">
          <a-carousel autoplay style="padding: 12px 0px">
            <img src="/swiper/img2.png" alt="图片加载失败" />
            <img src="/swiper/img1.png" alt="图片加载失败" />
          </a-carousel>
          <a-card :bordered="false" :bodyStyle="{ padding: '12px 0px' }">
            <a-list
              item-layout="vertical"
              size="large"
              :pagination="pagination"
              :data-source="listData"
            >
              <a-list-item slot="renderItem" key="item.title" slot-scope="item">
                <img
                  slot="extra"
                  height="125px"
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
                <a-list-item-meta>
                  <a slot="title" :href="item.href" class="list-title">{{
                    item.title
                  }}</a>
                  <template slot="description">
                    <span>
                      <a-tag :color="tagColor[Math.floor(Math.random() * 7)]"
                        >Ant Design</a-tag
                      >
                      <a-tag :color="tagColor[Math.floor(Math.random() * 7)]"
                        >设计语言</a-tag
                      >
                      <a-tag :color="tagColor[Math.floor(Math.random() * 7)]"
                        >蚂蚁金服</a-tag
                      >
                    </span>
                    <!-- <div class="description">
                      {{ item.description }}
                    </div> -->
                  </template>
                </a-list-item-meta>
                <div class="description">
                  {{ item.description }}
                </div>
                <!--action-->
                <template v-for="{ type, text } in actions" slot="actions">
                  <span :key="type">
                    <a-icon :type="type" style="margin-right: 8px" />
                    {{ text }}
                  </span>
                </template>
              </a-list-item>

              <!-- footer -->
              <!-- <div slot="footer" style="text-align: center; margin-top: 16px">
                <a-button>加载更多</a-button>
              </div> -->
            </a-list>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card :bordered="false">
            <div class="side-title"><a-icon type="sound" /> 网站公告</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <a-divider></a-divider>
            <div class="side-title"><a-icon type="fire" /> 热门文章</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <a-divider></a-divider>
            <div class="side-title"><a-icon type="link" /> 友情链接</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
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
  data() {
    return {
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
