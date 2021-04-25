<template>
  <div>
    <a-spin :spinning="spinning">
      <mavon-editor
        class="blog-editor"
        toolbarsBackground="#FA541C11"
        :toolbars="toolbars"
        v-model="content"
        @imgAdd="imgAdd"
        ref="md"
      />
      <a-button @click="handlePage" type="primary" class="submit-btn"
        >提交</a-button
      >
    </a-spin>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      content: "",
      spinning: true,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        // table: true, // 表格
        fullscreen: true, // 全屏编辑
        // readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        // help: true, // 帮助
        /* 1.3.5 */
        // undo: true, // 上一步
        // redo: true, // 下一步
        // trash: true, // 清空
        // save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        // navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
    };
  },
  computed: {
    userId() {
      return this.$store.state.user.userInfo.userId;
    },
  },
  mounted() {
    this.getHomePage();
  },
  methods: {
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp";
      if (!isJpgOrPng) {
        this.$message.error("请上传图片文件! (jpg/pbg/webp)", 3);
      }
      // console.log(file.size);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.info("限制上传图片大小为2MB", 3);
      }
      return isJpgOrPng && isLt2M;
    },
    // 将图片上传，返回地址替换到md中
    imgAdd(pos, $file) {
      let file = new FormData();
      // console.log($file);
      if (this.beforeUpload($file)) {
        file.append("file", $file);
        request({
          url: "/api/upload",
          method: "post",
          data: file,
        }).then((res) => {
          if (res.data.data) {
            this.$refs.md.$img2Url(pos, res.data.data);
          } else {
            this.$message.error("图片上传出错");
            this.$refs.md.$refs.toolbar_left.$imgDelByFilename($file.name);
          }
        });
      } else {
        this.$refs.md.$refs.toolbar_left.$imgDelByFilename($file.name);
      }
    },
    // 获取用户主页
    getHomePage() {
      request({
        url: "/homepage/get",
        method: "post",
        data: { userId: this.userId },
      }).then((res) => {
        if (res.data.data) {
          this.content = res.data.data.pageContent
            ? res.data.data.pageContent
            : "";
          this.spinning = false;
        } else {
          this.$message.error("获取主页信息失败", 1);
          this.spinning = false;
        }
      });
    },
    // 提交主页
    handlePage() {
      this.spinning = true;
      const homePage = {
        userId: this.userId,
        pageContent: this.content,
      };
      request({
        url: "/homepage/update",
        method: "post",
        data: homePage,
      }).then((res) => {
        if (res.data.data) {
          this.$message.success("修改成功", 1);
          this.spinning = false;
        } else {
          this.$message.success("修改失败", 1);
          this.spinning = false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.blog-editor {
  margin-top: 20px;
  z-index: 1000 !important;
}
.submit-btn {
  width: 100%;
  height: 40px;
  margin-top: 30px;
  font-size: 18px;
}
</style>
