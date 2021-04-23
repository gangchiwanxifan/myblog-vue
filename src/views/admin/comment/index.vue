<template>
  <div>
    <page-header :management="management" />
  </div>
</template>

<script>
import pageHeader from "@/components/PageHeader";

export default {
  components: {
    pageHeader,
  },
  data() {
    return {
      management: "评论管理",
    };
  },
};
</script>

<style></style>
