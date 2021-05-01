<template>
  <a-modal
    title="上传图片"
    :visible="visible"
    :maskClosable="false"
    :width="modalWidth"
    :footer="null"
    @cancel="cancelHandel"
  >
    <a-row>
      <!-- <img :src="previews.url" :style="previews.img" /> -->
      <a-col :xs="24" :md="12" :style="{ height: '350px' }">
        <vue-cropper
          ref="cropper"
          :img="options.img"
          :info="true"
          :autoCrop="options.autoCrop"
          :autoCropWidth="CropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixedBox="options.fixedBox"
          @realTime="realTime"
        >
        </vue-cropper>
      </a-col>
      <a-col :xs="24" :md="12" :style="{ height: '350px' }">
        <div class="avatar-upload-preview" :style="preStyle">
          <img :src="previews.url" :style="previews.img" />
        </div>
      </a-col>
    </a-row>
    <br />
    <a-row>
      <a-col :lg="2" :md="2">
        <a-upload
          name="file"
          :beforeUpload="beforeUpload"
          :showUploadList="false"
        >
          <a-button icon="upload">选择图片</a-button>
        </a-upload>
      </a-col>
      <a-col :lg="{ span: 1, offset: 2 }" :md="2">
        <a-button icon="plus" @click="changeScale(1)" />
      </a-col>
      <a-col :lg="{ span: 1, offset: 1 }" :md="2">
        <a-button icon="minus" @click="changeScale(-1)" />
      </a-col>
      <a-col :lg="{ span: 1, offset: 1 }" :md="2">
        <a-button icon="undo" @click="rotateLeft" />
      </a-col>
      <a-col :lg="{ span: 1, offset: 1 }" :md="2">
        <a-button icon="redo" @click="rotateRight" />
      </a-col>
      <a-col :lg="{ span: 2, offset: 6 }" :md="2">
        <a-button type="primary" @click="finish()">保存</a-button>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import request from "@/utils/request";

export default {
  props: {
    modalWidth: {
      type: Number,
      default: 800,
    },
    CropWidth: {
      type: Number,
      default: 200,
    },
    preStyle: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      visible: false,
      options: {
        img: "",
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: true,
      },
      previews: {},
    };
  },
  methods: {
    edit(img) {
      this.visible = true;
      // 会出现跨域问题
      this.options.img = img;
      // let _this = this;
      // // 设置头像base64
      // this.setAvatarBase64(img, (base64) => {
      //   _this.options.img = base64;
      // });
    },
    // // 设置头像base64
    // setAvatarBase64(src, callback) {
    //   let _this = this;
    //   let image = new Image();
    //   // 处理缓存
    //   image.src = src + "?v=" + Math.random();
    //   // 支持跨域图片
    //   image.crossOrigin = "*";
    //   image.onload = function () {
    //     let base64 = _this.transBase64FromImage(image);
    //     callback && callback(base64);
    //   };
    // },
    // // 将网络图片转换成base64格式
    // transBase64FromImage(image) {
    //   let canvas = document.createElement("canvas");
    //   canvas.width = image.width;
    //   canvas.height = image.height;
    //   let ctx = canvas.getContext("2d");
    //   ctx.drawImage(image, 0, 0, image.width, image.height);
    //   // 可选其他值 image/jpeg
    //   return canvas.toDataURL("image/png");
    // },
    cancelHandel() {
      this.visible = false;
    },
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    beforeUpload(file) {
      // console.log(file.type);
      const isJpgOrPng =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      } else {
        const reader = new FileReader();
        // 把Array Buffer转化为blob 如果是base64不需要
        // 转化为base64
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.options.img = reader.result;
        };
      }
      return false;
    },
    // 预览
    realTime(data) {
      this.previews = data;
    },
    // 上传图片（点击上传按钮）
    finish() {
      const _this = this;
      const file = new FormData();
      // 输出
      this.$refs.cropper.getCropBlob((data) => {
        const img = window.URL.createObjectURL(data);
        this.model = true;
        this.modelSrc = img;
        file.append("file", data, "xxx.png");
        request({
          url: "/api/upload",
          method: "post",
          data: file,
        }).then((response) => {
          _this.$emit("ok", response.data.data);
          _this.visible = false;
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.avatar-upload-preview {
  position: absolute;
  // top: 50%;
  // transform: translate(50%, -50%);
  top: 22%;
  left: 22%;
  width: 200px;
  height: 200px;
  // border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
