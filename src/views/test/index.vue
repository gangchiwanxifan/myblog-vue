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
    this.getCallBack();
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
    getCallBack() {
      const payVo = {
        userId: 1,
        timestamp: 1619765915503,
      };
      request({
        url: "/order/callback",
        method: "post",
        data: payVo,
      }).then((res) => {
        console.log(res.data);
      });
    },
  },
};
</script>
