<template>
  <div class="search-container">
    <input
      v-model="content"
      class="search-input"
      type="text"
      :placeholder="placeholder"
      @focus="changeBtn"
      @blur="recoverBtn"
      @keyup.enter="search()"
    />
    <a class="search-btn" :style="btnStyle" @click="search()">
      <a-icon type="search" />
    </a>
  </div>
</template>

<script>
const placeholders = [
  "你有一封来自月亮妹妹的情书",
  "搜索",
  "这个人设太带感了！",
  "用火影的方式打开巨人最终话",
];

export default {
  data() {
    this.$message.config({
      top: `50px`,
    });
    return {
      content: "",
      placeholder:
        placeholders[Math.floor(Math.random() * placeholders.length)],
      btnStyle: {},
    };
  },
  methods: {
    changeBtn() {
      this.btnStyle = { backgroundColor: "#969696", color: "#fff" };
    },
    recoverBtn() {
      this.btnStyle = {};
    },
    search() {
      if (this.content) {
        this.$router.push({
          path: "/search",
          query: { keyword: this.content },
        });
        this.content = "";
      } else {
        this.$message.info("请输入搜索内容");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
  position: relative;
  display: inline-block;
  .search-input {
    width: 260px;
    padding: 0 40px 0 20px;
    height: 38px;
    font-size: 14px;
    border: 1px solid #eee;
    border-radius: 40px;
    background: #eee;
    transition: width 0.7s, color 0.7s;
    outline: none;
  }
  .search-input:focus {
    width: 340px;
  }
  .search-btn {
    position: absolute;
    top: 12px;
    right: 5px;
    text-align: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #969696;
    font-size: 17px;
    line-height: 30px;
  }
}
</style>
