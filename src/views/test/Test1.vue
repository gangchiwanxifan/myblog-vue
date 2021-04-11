<template>
  <div class="page-container" @click="closeSel">
    <a-card :bordered="false">
      <a-comment>
        <img class="comment-avatar" slot="avatar" src="/avatar.png" />
        <div slot="content">
          <a-textarea
            id="emojiInput"
            class="comment-content"
            placeholder="发一条友善的评论"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            :rows="4"
            v-model="value"
          />
          <a-button type="primary" class="comment-submit">发表评论</a-button>
          <div>
            <a-button id="show-btn" class="emoji-btn" @click="showEmoji"
              ><a-icon type="smile" />表情</a-button
            >
          </div>
          <div class="emoji-box-container">
            <v-emoji-picker
              v-show="emojiVisible"
              class="emoji-box"
              id="emoji-box"
              :showSearch="false"
              :emojisByRow="8"
              @select="selectEmoji"
            />
          </div>
        </div>
      </a-comment>
    </a-card>
  </div>
</template>

<script>
import { VEmojiPicker } from "v-emoji-picker";

export default {
  components: {
    VEmojiPicker,
  },
  data() {
    return {
      value: "",
      emojiVisible: false,
    };
  },
  methods: {
    showEmoji() {
      this.emojiVisible = !this.emojiVisible;
    },
    closeSel(event) {
      var showBtn = document.getElementById("show-btn");
      var emojiBox = document.getElementById("emoji-box");
      if (emojiBox && showBtn) {
        if (
          !(showBtn.contains(event.target) || emojiBox.contains(event.target))
        ) {
          this.emojiVisible = false;
        }
      }
    },
    // 表情输入
    selectEmoji(emoji) {
      var elInput = document.getElementById("emojiInput"); //获取输入框元素
      var start = elInput.selectionStart; // 记录光标开始的位置
      var end = elInput.selectionEnd; // 记录选中的字符 最后的字符的位置
      if (start === undefined || end === undefined) return;
      var txt = elInput.value;
      // 将表情添加到选中的光标位置
      var result = txt.substring(0, start) + emoji.data + txt.substring(end);
      elInput.value = result; // 赋值给input的value
      // 重置光标位置
      elInput.focus();
      elInput.selectionStart = start + emoji.data.length;
      elInput.selectionEnd = start + emoji.data.length;
      this.value = result; // 赋值(注意这里一定要赋值给表情输入框绑定的那个值)
    },
  },
};
</script>

<style lang="less" scoped>
.page-container {
  margin: 20px auto;
  max-width: 1200px;
}
.comment-avatar {
  margin: 20px 20px 0 0;
  width: 48px;
  height: 48px;
}
.comment-content {
  width: 60%;
  font-size: 16px;
}
.comment-submit {
  margin-left: 10px;
  height: 82px;
  width: 82px;
  padding: 0px;
}
.emoji-btn {
  margin-top: 5px;
  border: 0;
  box-shadow: 0 0 12px rgba(0, 0, 0, 10%);
  font-weight: 600;
  color: #99a2aa;
}
.emoji-box-container {
  position: relative;
  .emoji-box {
    box-shadow: 10px 11px 12px rgba(106, 115, 133, 30%);
    position: absolute;
    z-index: 1000;
    top: -32px;
    left: 90px;
    width: 50%;
    min-width: 325px;
  }
}
</style>
