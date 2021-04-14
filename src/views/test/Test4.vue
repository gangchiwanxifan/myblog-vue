<template>
  <div class="container">
    <search-box />
  </div>
</template>

<script>
import SearchBox from "@/components/SearchBox";

export default {
  components: {
    SearchBox,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  min-height: 50vh;
  padding: 50px;
  margin: 20px auto;
}
</style>
