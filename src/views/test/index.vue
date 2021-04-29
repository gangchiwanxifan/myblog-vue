<template>
  <div>
    <h1>支付宝二维码支付</h1>
    <img :src="imgSrc" />
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      data: "",
      pay: { userId: 1, targetId: 2, price: 50 },
      imgSrc: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      request({
        url: "/alipay/pay",
        method: "post",
        responseType: "blob",
        data: {
          userId: 1,
          targetId: 2,
          price: 50,
        },
      }).then((res) => {
        let blob = new Blob([res.data], { type: "image/png" });
        let url = window.URL.createObjectURL(blob);
        this.imgSrc = url;
      });
    },
  },
};
</script>
