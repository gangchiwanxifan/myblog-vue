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
      <commentsPage v-if="noTitleKey === 'list'" />
      <reportedPage v-else-if="noTitleKey === 'reported'" />
      <!-- <a slot="tabBarExtraContent" href="#">More</a> -->
    </a-card>
  </div>
</template>

<script>
import pageHeader from "@/components/PageHeader";
import commentsPage from "./commentsPage";
import reportedPage from "./reportedPage";

export default {
  components: {
    pageHeader,
    commentsPage,
    reportedPage,
  },
  data() {
    return {
      management: "评论管理",
      tabListNoTitle: [
        {
          key: "list",
          tab: "最新评论",
        },
        {
          key: "reported",
          tab: "违规评论",
        },
      ],
      noTitleKey: "list",
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
