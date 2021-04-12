<template>
  <div style="background-color: #fff; margin-top: 29px">
    <div>
      <a-button @click="getComments(blogId)">获取评论</a-button>
    </div>
    {{ data }}
    <div>
      <blog-comments :comments="data" />
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import BlogComments from "@/components/BlogComments";

export default {
  components: {
    BlogComments,
  },
  data() {
    return {
      data: [],
      blogId: "7",
    };
  },
  methods: {
    getComments(blogId) {
      request({
        url: `/comment/${blogId}`,
        methods: "post",
      }).then((res) => {
        if (res.data.data) {
          this.data = res.data.data;
        }
      });
    },
  },
};
</script>

<style></style>
