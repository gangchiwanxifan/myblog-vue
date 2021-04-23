<template>
  <div>
    <div class="page-header-wrap">
      <div class="header-content">
        <div>
          <a-breadcrumb>
            <a-breadcrumb-item>主页</a-breadcrumb-item>
            <a-breadcrumb-item>{{ management }}</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div class="header-heading">
          <span class="header-heading-title">{{ management }}</span>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    management: String,
  },
};
</script>

<style lang="less" scoped>
.page-header-wrap {
  background-color: #fff;
  margin: 0px -15px;
  .header-content {
    padding: 10px 24px;
  }
  .header-heading {
    margin-top: 8px;
    .header-heading-title {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 600;
      font-size: 20px;
      line-height: 32px;
    }
  }
}
</style>
