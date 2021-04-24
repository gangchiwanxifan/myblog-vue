<template>
  <div>
    <page-header :management="management"></page-header>

    <a-card
      style="width: 100%; margin-top: 20px"
      :bodyStyle="{ minHeight: '60vh' }"
      :bordered="false"
      :tab-list="tabListNoTitle"
      :active-tab-key="noTitleKey"
      @tabChange="(key) => onTabChange(key, 'noTitleKey')"
    >
      <sb-swiper v-if="noTitleKey === 'swiper'" />
      <sb-link v-else-if="noTitleKey === 'link'" />
      <sb-message v-else-if="noTitleKey === 'message'" />
    </a-card>
  </div>
</template>

<script>
import pageHeader from "@/components/PageHeader";
import sbLink from "./page/link";
import sbSwiper from "./page/swiper";
import sbMessage from "./page/message";

export default {
  components: {
    pageHeader,
    sbLink,
    sbSwiper,
    sbMessage,
  },
  data() {
    return {
      role: 0,
      management: "系统配置",
      tabListNoTitle: [
        {
          key: "swiper",
          tab: "轮播图",
        },
        {
          key: "link",
          tab: "友情链接",
        },
        {
          key: "message",
          tab: "站点信息",
        },
      ],
      noTitleKey: "swiper",
    };
  },
  methods: {
    onTabChange(key, type) {
      // console.log(key, type);
      this[type] = key;
    },
  },
};
</script>

<style></style>
