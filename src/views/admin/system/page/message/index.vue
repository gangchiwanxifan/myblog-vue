<template>
  <div>
    <a-form :labelCol="{ span: 4 }" :wrapperCol="{ span: 16 }">
      <a-form-item label="底部CopyRight">
        <a-input v-model="config.copyright"></a-input>
      </a-form-item>
      <a-form-item label="底部备案号">
        <a-input v-model="config.record"></a-input>
      </a-form-item>
      <a-form-item label="网站公告">
        <a-textarea v-model="config.notice" :rows="4"></a-textarea>
      </a-form-item>
      <a-form-item :wrapperCol="{ offset: 4 }">
        <a-button @click="save" type="primary">保存信息</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      loading: true,
      config: {},
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
          this.config = res.data.data;
          this.loading = false;
        }
      });
    },
    save() {
      this.$message.loading("正在保存", 0);
      request({
        url: "/config/update",
        method: "post",
        data: this.config,
      }).then((res) => {
        if (res.data.data) {
          this.$message.success("更新成功");
          this.getData();
        } else {
          this.$message.error("操作失败");
        }
      });
    },
  },
};
</script>

<style></style>
