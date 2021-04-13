<template>
  <div>
    <template v-for="(tag, index) in tags">
      <a-tag
        class="tags"
        :key="tag"
        :color="color[index % 5]"
        closable
        @close="() => handleClose(tag)"
      >
        {{ tag }}
      </a-tag>
    </template>
    <a-input
      v-if="inputVisible"
      ref="input"
      type="text"
      size="small"
      :style="{ width: '78px' }"
      :value="inputValue"
      @change="handleInputChange"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
    <a-tag
      class="tags"
      v-else
      style="background: #fff; border-style: dashed; cursor: pointer"
      @click="showInput"
    >
      <a-icon type="plus" /> New Tag
    </a-tag>
  </div>
</template>
<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      inputVisible: false,
      inputValue: "",
      // Math.floor(Math.random() * 5)
      color: ["pink", "green", "cyan", "blue", "purple"],
    };
  },
  methods: {
    handleClose(removedTag) {
      const tags = this.tags.filter((tag) => tag !== removedTag);
      this.$emit("updateTags", tags);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(function () {
        this.$refs.input.focus();
      });
    },

    handleInputChange(e) {
      this.inputValue = e.target.value;
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      this.$emit("updateTags", tags);
      Object.assign(this, {
        // tags: tags,
        inputVisible: false,
        inputValue: "",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.tags {
  height: 30px;
  line-height: 26px;
  text-align: center;
  font-size: 16px;
  margin-bottom: 10px;
}
</style>
