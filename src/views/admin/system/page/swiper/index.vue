<template>
  <div>
    <a-spin :spinning="loading" size="large">
      <a-form :labelCol="{ span: 4 }" :wrapperCol="{ span: 16 }">
        <a-form-item label="轮播图一">
          <a-upload
            name="file"
            :before-upload="beforeUpload"
            action="/api/upload"
            @change="handleChange1"
            :multiple="false"
          >
            <div class="ant-upload-preview">
              <div class="mask">
                <a-icon type="cloud-upload-o" />
              </div>
              <img :src="swiper1" />
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="轮播图二">
          <!-- @click="$refs.modal.edit(img) -->
          <a-upload
            name="file"
            :before-upload="beforeUpload"
            action="/api/upload"
            @change="handleChange2"
            :multiple="false"
          >
            <div class="ant-upload-preview">
              <div class="mask">
                <a-icon type="cloud-upload-o" />
              </div>
              <img :src="swiper2" />
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item :wrapperCol="{ offset: 5 }">
          <a-button
            style="width: 400px"
            shape="round"
            type="primary"
            @click="save"
            >保存更改
          </a-button>
          <a-button shape="round" style="margin-left: 5px" @click="reset"
            >重置
          </a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      loading: true,
      swiper1: "",
      swiper2: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      request({
        url: "/config",
        method: "post",
      }).then((res) => {
        if (res.data.data) {
          this.swiper1 = res.data.data.swiper1;
          this.swiper2 = res.data.data.swiper2;
          this.loading = false;
        }
      });
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp";
      if (!isJpgOrPng) {
        this.$message.error("请上传图片文件!");
      }
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 1MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    handleChange1(info) {
      if (info.file.status === "done") {
        if (info.file.response.data) {
          let data = info.file.response.data;
          this.swiper1 = data;
        }
      }
      if (info.file.status === "error") {
        this.$message.error("上传失败");
      }
    },
    handleChange2(info) {
      if (info.file.status === "done") {
        if (info.file.response.data) {
          let data = info.file.response.data;
          this.swiper2 = data;
        }
      }
      if (info.file.status === "error") {
        this.$message.error("上传失败");
      }
    },
    save() {
      const config = {
        configId: 1,
        swiper1: this.swiper1,
        swiper2: this.swiper2,
      };
      this.$message.loading("正在保存", 0);
      request({
        url: "/config/update",
        method: "post",
        data: config,
      }).then((res) => {
        if (res.data.data) {
          this.$message.success("更新成功");
          this.getData();
        } else {
          this.$message.error("操作失败");
        }
      });
    },
    reset() {
      this.swiper1 = "/swiper/img1.png";
      this.swiper2 = "/swiper/img2.png";
      this.save();
    },
  },
};
</script>

<style lang="less" scoped>
.ant-upload-preview {
  position: relative;
  // margin: 0 auto;
  // width: 100%;
  width: 500px;
  height: 216px;
  // border-radius: 5%;
  box-shadow: 0 0 4px #ccc;
  margin-left: 20px;
  margin-top: 15px;

  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    // width: 100%;
    // max-width: 500px;
    // height: 100%;
    width: 500px;
    height: 216px;
    // border-radius: 5%;
    overflow: hidden;
    object-fit: cover;
  }
}
</style>
