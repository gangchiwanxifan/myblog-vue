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
      management: "权限管理",
    };
  },
};
</script>

<style></style>
