<template>
  <div>
    <mavon-editor
      class="blog-editor"
      toolbarsBackground="#FA541C11"
      :toolbars="toolbars"
      v-model="content"
      @imgAdd="imgAdd"
      ref="md"
    />
    <a-button type="primary" class="submit-btn">提交</a-button>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      content: "",
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
  methods: {
    // 将图片上传，返回地址替换到md中
    imgAdd(pos, $file) {
      let file = new FormData();
      file.append("file", $file);
      request({
        url: "/api/upload",
        method: "post",
        data: file,
      }).then((res) => {
        if (res.data.data) {
          // console.log(res);
          this.$refs.md.$img2Url(pos, res.data.data);
        } else {
          this.$message.error("图片上传出错");
          // console.log(res);
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
