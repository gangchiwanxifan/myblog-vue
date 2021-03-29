<template>
  <div class="page-wide">
    <div
      class="user-center-background"
      :style="{ backgroundImage: `url(${Img})`, height: '200px' }"
    ></div>
    <a-card
      :bordered="false"
      :style="{ backgroundColor: 'transparent' }"
      :headStyle="{ backgroundColor: '#fff' }"
      :tab-list="tabListNoTitle"
      :active-tab-key="noTitleKey"
      @tabChange="(key) => onTabChange(key, 'noTitleKey')"
    >
      <p v-if="noTitleKey === 'article'">article content</p>
      <p v-else-if="noTitleKey === 'app'">app content</p>
      <p v-else-if="noTitleKey === 'project'">project content</p>
      <span slot="tabBarExtraContent">
        <a href="#"> 关注</a>
        <a-divider type="vertical"></a-divider>
        <a href="#">粉丝</a>
      </span>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Img: "/center.png",
      contentList: {
        tab1: "content1",
        tab2: "content2",
      },
      tabListNoTitle: [
        {
          key: "article",
          tab: "article",
        },
        {
          key: "app",
          tab: "app",
        },
        {
          key: "project",
          tab: "project",
        },
      ],
      key: "tab1",
      noTitleKey: "app",
    };
  },
  methods: {
    onTabChange(key, type) {
      console.log(key, type);
      this[type] = key;
    },
  },
};
</script>

<style lang="less" scoped>
.page-wide {
  max-width: 1200px;
  margin: 2px auto;
}
</style>
