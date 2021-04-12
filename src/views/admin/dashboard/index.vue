<template>
  <div>
    <page-header :management="management">
      <div class="page-header-content">
        <div>
          <a-avatar class="avatar" size="large" src="/avatar.png" />
        </div>
        <div class="content">
          <div class="content-title">
            {{ timeFix }}， gcwxf<span class="welcome-text"
              >，{{ welcome }}</span
            >
          </div>
          <div>前端工程师 | 蚂蚁金服 - 某某某事业群 - VUE平台</div>
        </div>
      </div>
    </page-header>
  </div>
</template>

<script>
import pageHeader from "@/components/PageHeader";
import { timeFix, welcome } from "@/utils/util";

export default {
  components: {
    pageHeader,
  },
  data() {
    return {
      management: "工作台",
      timeFix: timeFix(),
      welcome: welcome(),
    };
  },
};
</script>

<style lang="less" scoped>
.page-header-content {
  padding-top: 12px;
  display: flex;
  .avatar {
    display: block;
    width: 72px;
    height: 72px;
    border-radius: 72px;
  }
  .content {
    position: relative;
    top: 4px;
    flex: 1 1 auto;
    margin-left: 24px;
    color: rgba(0, 0, 0, 0.45);
    line-height: 22px;
    .content-title {
      margin-bottom: 12px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }
  }
}
</style>
