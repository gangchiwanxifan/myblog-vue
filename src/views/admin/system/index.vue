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
      management: "系统配置",
    };
  },
};
</script>

<style></style>
