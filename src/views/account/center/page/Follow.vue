<template>
  <div class="page-container">
    <a-card
      :bordered="false"
      :bodyStyle="{ height: '100%' }"
      :style="{ height: '100%' }"
    >
      <div class="page-head">
        <p class="page-head-title">全部关注</p>
      </div>
      <a-list item-layout="horizontal" :data-source="data">
        <div slot="footer">没有更多啦~</div>
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          >
            <div slot="title">
              <a>{{ item.title }}</a>
              &nbsp;
              <span style="color: #aaa; font-size: 12px; padding: 10px">
                2021/04/09 12:00:00
              </span>
            </div>
            <a-avatar
              size="large"
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-list-item-meta>
          <div slot="actions">
            <a-button><a-icon type="home" />进入TA的主页</a-button>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];
export default {
  data() {
    return {
      data,
    };
  },
};
</script>

<style lang="less" scoped>
.page-container {
  margin-top: 16px;
  .page-head {
    line-height: 30px;
    .page-head-title {
      color: #222;
      font-size: 18px;
    }
  }
}
</style>
