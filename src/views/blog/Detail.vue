<template>
  <div class="page-container" @click="closeSel">
    <div class="_3Pnjry" v-if="loginStatus">
      <div v-if="isFavorite" @click="cancelFavorite" class="_1pUUKr">
        <div class="_2VdqdF" style="background-color: #00a1d6; color: #fff">
          <a-icon type="like" theme="filled" />
        </div>
        <div class="P63n6G" style="color: #00a1d6">已赞</div>
      </div>
      <div v-else class="_1pUUKr" @click="addFavorite">
        <div class="_2VdqdF"><a-icon type="like" theme="filled" /></div>
        <div class="P63n6G">点赞</div>
      </div>
      <div class="_1pUUKr" @click="showModal">
        <div class="_2VdqdF">￥</div>
        <div class="P63n6G">赞赏</div>
      </div>
    </div>
    <a-spin :spinning="blogLoading" size="large">
      <a-card class="page-container-card" :bordered="false">
        <div class="page-title">
          <template v-if="loginStatus">
            <a class="favorite" v-if="!isFavorite" @click="addFavorite">
              <a-icon type="plus" /> 收藏
            </a>
            <a class="favorite" v-else @click="cancelFavorite">
              <a-icon type="check" /> 已收藏
            </a>
          </template>
          <h1 class="page-title-blog">
            <span>{{ blogDetail.blogTitle }}</span>
          </h1>
          <div class="page-title-author">
            <span
              @click="
                $router.push({ path: `/center/${blogDetail.blogAuthorId}` })
              "
            >
              <a>
                <img class="title-avatar" :src="blogDetail.avatar" />
                <span class="item" style="padding: 0 7px">{{
                  blogDetail.nickname
                }}</span>
              </a>
            </span>
            <span class="item">
              <span
                @click="
                  $router.push({
                    path: '/channel',
                    query: { channelId: blogDetail.blogChannelId },
                  })
                "
              >
                分类：<a>{{ blogDetail.channelName }}</a>
              </span>
            </span>
            <span class="item">浏览：{{ blogDetail.blogViews }}</span>
            <span class="update-time"
              >最后修改于：{{ blogDetail.updateTime }}</span
            >
          </div>
        </div>
        <mavon-editor
          :value="blogDetail.blogContent"
          :subfield="false"
          :defaultOpen="'preview'"
          :toolbarsFlag="false"
          :editable="false"
          :scrollStyle="true"
          :boxShadow="false"
          :previewBackground="'#fff'"
          :ishljs="true"
        />
        <a-tag
          class="tags"
          v-for="tag in tags"
          :key="tag"
          :color="tagColor[Math.floor(Math.random() * 7)]"
        >
          {{ tag }}
        </a-tag>
        <a-divider />
        <div>
          <div class="follow-box">
            <img
              :src="blogDetail.avatar"
              style="border-radius: 50%; cursor: pointer"
              @click="
                $router.push({ path: `/center/${blogDetail.blogAuthorId}` })
              "
            />
            <div
              class="follow-content"
              @click="
                $router.push({ path: `/center/${blogDetail.blogAuthorId}` })
              "
              style="cursor: pointer"
            >
              <div class="follow-user">{{ blogDetail.nickname }}</div>
              <div class="follow-info">{{ blogDetail.introduction }}</div>
            </div>
            <div class="follow-btn" v-if="loginStatus">
              <a-button
                class="follow"
                type="primary"
                @click="addFollow"
                v-if="!isFollow"
                ><a-icon type="plus" />关注</a-button
              >
              <a-button
                class="followed"
                type="primary"
                @click="cancelFollow"
                v-else
                ><a-icon type="check" />已关注</a-button
              >
            </div>
          </div>
          <span class="pay-info">"小礼物走一走，来Simple Blog关注我"</span>
          <a-button
            id="pay-btn"
            @click="showModal"
            class="pay-btn"
            shape="round"
            type="primary"
          >
            ￥赞赏支持
          </a-button>
        </div>
      </a-card>
    </a-spin>
    <!-- 评论部分 -->
    <a-card class="comment-card" :bordered="false">
      <h2>评论</h2>
      <a-comment v-if="loginStatus">
        <img class="comment-avatar" slot="avatar" :src="userInfo.avatar" />
        <div slot="content">
          <a-textarea
            id="emojiInput"
            class="comment-content"
            :placeholder="placeholder"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            :rows="4"
            v-model="value"
          />
          <a-button
            v-if="!this.replyCommentId"
            type="primary"
            class="comment-btn comment-submit-btn"
            @click="handleComment"
            >发表评论</a-button
          >
          <span v-else>
            <a-button
              type="primary"
              class="comment-btn comment-submit-btn"
              @click="handleComment"
              >回复</a-button
            >
            <a-button type="danger" class="comment-btn" @click="cancelReply"
              >取消</a-button
            >
          </span>
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
      <a-spin :spinning="commentLoading">
        <div v-if="loginStatus">
          <div v-if="!hasComment" class="no-reply">看看下面~来抢沙发吧</div>
          <div v-else>
            <blog-comments
              @updateComment="updateComment"
              @reply="reply"
              :comments="comments"
            />
            <div class="no-reply">没有更多评论</div>
          </div>
        </div>
        <div v-else>
          <div class="no-reply">登录后才能使用评论功能噢~</div>
        </div>
      </a-spin>
    </a-card>
    <!-- 打赏弹窗 -->
    <a-modal v-model="visible" :width="640" :footer="null" @cancel="onCancel">
      <div class="charge-modal-container">
        <div class="title">
          <img :src="blogDetail.avatar" />
          <div class="content">赞赏支持</div>
        </div>
        <div class="money-btn-group">
          <div
            v-for="(item, index) in money"
            :key="item"
            class="btn"
            :class="{ selected: index == choice }"
            @click="select(index)"
          >
            <span><icon-font type="icon-lingshi" /> {{ item }}</span>
          </div>
        </div>
        <a-spin v-if="payMethod == 1" :spinning="qrLoading">
          <div class="pay-img-container">
            <div class="mask" v-if="timeout" @click="getQrCode()">
              <a-icon type="reload" />
            </div>
            <img :src="qrSrc" class="pay-img" />
          </div>
        </a-spin>
        <div class="choose-method">选择支付方式</div>
        <div class="method-btn-group">
          <a-tooltip placement="top">
            <template slot="title">
              <span>网站暂时不支持微信支付</span>
            </template>
            <div class="pay-btn">
              <icon-font type="icon-zhifu" /> <span>微信支付</span>
            </div>
          </a-tooltip>
          <!-- <a-tooltip placement="top">
            <template slot="title">
              <span>网站暂时不支持支付宝</span>
            </template>
            <div class="pay-btn">
              <icon-font type="icon-umidd17" /><span>支付宝</span>
            </div>
          </a-tooltip> -->
          <div
            class="pay-btn"
            :class="{ selected: payMethod == 1 }"
            @click="selectMethod(1)"
          >
            <icon-font type="icon-umidd17" /><span>支付宝</span>
          </div>
          <div
            class="pay-btn"
            :class="{ selected: payMethod == 0 }"
            @click="selectMethod(0)"
          >
            <icon-font type="icon-jinbi" /><span>余额支付</span>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: center; align-items: center">
        <a-button
          v-if="payMethod == 0"
          class="handle-btn"
          type="primary"
          @click="handlePay"
          ><span>确认支付 ￥{{ money[choice] }}</span>
        </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import request from "@/utils/request";
import { VEmojiPicker } from "v-emoji-picker";
import BlogComments from "@/components/BlogComments/index.vue";

export default {
  components: {
    VEmojiPicker,
    BlogComments,
  },
  data() {
    return {
      value: "",
      emojiVisible: false,
      blogDetail: {},
      placeholder: "发一条友善的评论",
      comments: [],
      replyCommentId: "",
      tagColor: ["pink", "green", "cyan", "blue", "purple", "orange", "red"],
      blogLoading: true,
      commentLoading: true,
      visible: false,
      money: [2, 5, 10, 20, 50, 100],
      choice: 0,
      payMethod: 0,
      isFavorite: false,
      isFollow: false,
      qrSrc: "",
      qrLoading: true,
      timestamp: "",
      stimer: null,
      count: 1,
      timeout: true,
    };
  },
  mounted() {
    this.getBlog(this.blogId);
    this.getComments(this.blogId);
  },
  computed: {
    tags: function () {
      if (this.blogDetail.blogTags) {
        return this.blogDetail.blogTags.split(",");
      } else {
        return null;
      }
    },
    userInfo: function () {
      return this.$store.state.user.userInfo;
    },
    blogId: function () {
      return this.$route.params.id;
    },
    loginStatus() {
      return this.$store.state.user.loginStatus;
    },
    hasComment: function () {
      if (this.comments.length) {
        return true;
      } else {
        return false;
      }
    },
    favorite() {
      const favorite = {
        favoriteUserId: this.userInfo.userId,
        favoriteBlogId: this.blogId,
      };
      return favorite;
    },
    follow() {
      const follow = {
        followUserId: this.blogDetail.blogAuthorId,
        followFanId: this.userInfo.userId,
      };
      return follow;
    },
  },
  methods: {
    selectMethod(method) {
      this.payMethod = method;
      if (method == 1) {
        this.getQrCode();
      }
    },
    getBlog(blogId) {
      // this.blogLoading = true;
      request({
        url: "/blog/detail",
        method: "post",
        data: { blogId: blogId },
      }).then((res) => {
        if (res.data.data) {
          this.blogDetail = res.data.data;
          this.blogLoading = false;
          this.checkFavorite();
          this.checkFollow();
          // console.log(this.blogDetail);
          // console.log(this.blogLoading);
        }
      });
    },
    getComments(blogId) {
      this.commentLoading = true;
      request({
        url: `/comment/${blogId}`,
        methods: "post",
      }).then((res) => {
        if (res.data.data) {
          this.comments = res.data.data;
          // console.log(res.data.data);
          this.commentLoading = false;
        }
      });
    },
    showEmoji() {
      this.emojiVisible = !this.emojiVisible;
    },
    updateComment() {
      this.getComments(this.blogId);
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
    // 发表评论
    handleComment() {
      if (this.value) {
        const data = {
          commentBlogId: this.blogId,
          commentUserId: this.userInfo.userId,
          commentContent: this.value,
          parentId: this.replyCommentId,
        };
        this.$message.loading("正在评论，请稍等...", 0);
        request({
          url: "/comment/save",
          method: "post",
          data: data,
        }).then((res) => {
          if (res.data.data) {
            this.$message.success("评论成功~");
            this.resetComment();
            this.getComments(this.blogId);
          } else {
            this.$message.error("发生未知错误");
          }
        });
      } else {
        this.$message.warning("请输入评论内容~");
      }
    },
    reply(comment) {
      // console.log(comment);
      document.getElementById("emojiInput").scrollIntoView({
        behavior: "smooth", // 默认 auto
        block: "center", // 默认 center
        inline: "nearest", // 默认 nearest
      });
      this.placeholder = "回复 @" + comment.nickname + ":";
      this.replyCommentId = comment.commentId;
    },
    cancelReply() {
      // console.log("取消回复");
      this.resetComment();
    },
    resetComment() {
      this.placeholder = "发一条友善的评论";
      this.replyCommentId = "";
      this.value = "";
    },
    showModal() {
      if (
        this.loginStatus &&
        this.userInfo.userId != this.blogDetail.blogAuthorId
      ) {
        this.payMethod = 0;
        this.visible = true;
      } else if (this.loginStatus) {
        this.$message.info("不能打赏自己的文章~");
      } else {
        this.$message.info("请先登录~");
      }
    },
    select(index) {
      this.choice = index;
    },
    handlePay() {
      const map = {
        user: {
          userId: this.userInfo.userId,
          balance: this.money[this.choice],
        },
        author: {
          userId: this.blogDetail.blogAuthorId,
        },
        fakeUser: {
          userId: this.blogDetail.blogId,
        },
      };
      this.$message.loading("处理中，请稍等...", 0);
      var _this = this;
      request({
        url: "/user/reward",
        method: "post",
        data: map,
      }).then((res) => {
        if (res.data.data === true) {
          console.log(res.data.data);
          this.$message.success("感谢赞赏（づ￣3￣）づ╭❤～");
          // 更新余额信息
          const user = this.userInfo;
          user.balance = user.balance - this.money[this.choice];
          this.$store.commit("SET_USER_INFO", user);
          // 保存记录
          _this.saveOrder();
          this.visible = false;
        } else if (res.data.data === false) {
          // console.log(res.data.data);
          this.$message.info("余额不足 ┌(。Д。)┐");
          // this.visible = false;
        } else {
          console.log(res.data.data);
          this.$message.error("出现未知错误");
          this.visible = false;
        }
      });
    },
    saveOrder() {
      const data = {
        orderUserId: this.userInfo.userId,
        orderTargetId: this.blogDetail.blogAuthorId,
        orderPrice: this.money[this.choice],
        orderBlogId: this.blogDetail.blogId,
        orderBlogTitle: this.blogDetail.blogTitle,
      };
      // console.log(data);
      request({
        url: "/order/save",
        method: "post",
        data: data,
        // data: {
        //   orderUserId: this.userInfo.userId,
        //   orderTargetId: this.blogDetail.blogAuthorId,
        //   orderPrice: this.money[this.choice],
        // },
      });
    },
    // 点赞收藏
    checkFavorite() {
      // console.log(this.favorite);
      request({
        url: "/favorite/check",
        method: "post",
        data: this.favorite,
      }).then((res) => {
        if (res.data.data) {
          this.isFavorite = true;
        }
      });
    },
    addFavorite() {
      this.$message.loading("请稍等...", 0);
      request({
        url: "/favorite/add",
        method: "post",
        data: this.favorite,
      }).then((res) => {
        if (res.data.data) {
          this.$message.success("收藏成功~");
          this.isFavorite = true;
        } else {
          this.$message.error("error");
        }
      });
    },
    cancelFavorite() {
      this.$message.loading("请稍等...", 0);
      request({
        url: "/favorite/cancel",
        method: "post",
        data: this.favorite,
      }).then((res) => {
        if (res.data.data) {
          this.$message.success("取消收藏成功~");

          this.isFavorite = false;
        } else {
          this.$message.error("error");
        }
      });
    },
    // 关注
    checkFollow() {
      request({
        url: "/follow/check",
        method: "post",
        data: this.follow,
      }).then((res) => {
        if (res.data.data) {
          this.isFollow = true;
        } else {
          this.isFollow = false;
        }
      });
    },
    addFollow() {
      if (this.userInfo.userId == this.blogDetail.blogAuthorId) {
        this.$message.info("o(*￣▽￣*)ブ你时时刻刻都在关注你自己~");
      } else {
        this.$message.loading("请稍等...", 0);
        request({
          url: "/follow/add",
          method: "post",
          data: this.follow,
        }).then((res) => {
          if (res.data.data) {
            this.$message.success("关注成功~");
            this.isFollow = true;
          } else {
            this.$message.error("error");
          }
        });
      }
    },
    cancelFollow() {
      this.$message.loading("请稍等...", 0);
      request({
        url: "/follow/cancel",
        method: "post",
        data: this.follow,
      }).then((res) => {
        if (res.data.data) {
          this.$message.success("取关成功~");
          this.isFollow = false;
        } else {
          this.$message.error("error");
        }
      });
    },
    getQrCode() {
      this.timeout = false;
      this.qrLoading = true;
      let timestamp = new Date().getTime();
      request({
        url: "/alipay/pay",
        method: "post",
        responseType: "blob",
        data: {
          userId: this.userInfo.userId,
          targetId: this.blogDetail.blogAuthorId,
          price: this.money[this.choice],
          orderMethod: 1,
          orderType: 0,
          blogId: this.blogDetail.blogId,
          timestamp: timestamp,
        },
      }).then((res) => {
        if (res.data) {
          let blob = new Blob([res.data], { type: "image/png" });
          let url = window.URL.createObjectURL(blob);
          this.qrSrc = url;
          this.timestamp = timestamp;
          this.payCallBack(timestamp);
          this.qrLoading = false;
        }
      });
    },
    payCallBack(timestamp) {
      var that = this;
      if (this.stimer) {
        clearInterval(this.stimer);
      }
      this.count = 1;
      that.stimer = setInterval(function () {
        if (that.count > 60) {
          that.timeout = true;
          that.$message.info("该二维码已失效，请刷新重试~");
          if (that.stimer) clearInterval(that.stimer);
        }
        request({
          url: "/order/callback",
          method: "post",
          data: {
            userId: that.userInfo.userId,
            timestamp: timestamp,
          },
        }).then((res) => {
          if (res.data.data > 0) {
            if (that.stimer) clearInterval(that.stimer);
            that.$message.success("支付成功~");
            that.onCancel();
          } else {
            that.count++;
          }
        });
      }, 3000);
    },
    onCancel() {
      this.visible = false;
      if (this.stimer) clearInterval(this.stimer);
    },
  },
  watch: {
    choice: function () {
      if (this.payMethod == 1) {
        this.getQrCode();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.page-container {
  margin: 20px auto;
  max-width: 1200px;
  ._3Pnjry {
    position: fixed;
    z-index: 98;
    top: 240px;
    left: calc((100vw - 1200px) / 2 - 75px);
  }
  ._1pUUKr,
  ._2VdqdF {
    display: flex;
    align-items: center;
  }
  ._1pUUKr {
    position: relative;
    flex-direction: column;
    margin-bottom: 25px;
    cursor: pointer;
    color: #969696;
  }
  ._2VdqdF {
    justify-content: center;
    width: 48px;
    height: 48px;
    font-size: 18px;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 5%);
    background-color: #fff;
  }
  // width: 200px;
  // height: 200px;
  // background-color: #fff;
  // box-shadow: 0 0 12px rgba(0, 0, 0, 10%);
  // margin: 20px 20px;
  .page-container-card {
    // margin: 20px 20px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 10%);
    .page-title {
      padding: 10px 25px;
      padding-bottom: 0px;
      .favorite {
        float: right;
        font-size: 17px;
        font-weight: 700;
      }
      .page-title-blog {
        font-size: 28px;
        font-weight: 600;
        color: #34495e;
        // padding: 0 0 10px;
        line-height: 32px;
      }
      .page-title-author {
        margin-top: 20px;
        font-size: 14px;
        color: #999999;
        .item {
          padding: 0 10px;
        }
        .update-time {
          float: right;
        }
        .title-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }
      }
    }
    .markdown-body {
      border: none;
      z-index: 1000 !important;
    }
    .pay-info {
      display: block;
      width: 285px;
      margin: 0 auto;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 16px;
      color: #404040;
    }
    .pay-btn {
      width: 210px;
      display: block;
      margin: 0 auto;
      height: 45px;
      font-size: 16px;
      background-color: #00a1d6;
      border: 1px solid #00a1d6;
    }
    .follow-box {
      display: flex;
      position: relative;
      width: 60%;
      background-color: #fafafa;
      border-radius: 4px;
      padding: 12px 16px;
      margin: 0 auto 16px;
      img {
        height: 50px;
      }
      .follow-content {
        padding-left: 20px;
      }
      .follow-info {
        color: #969696;
      }
      .follow-user {
        color: #404040;
        font-size: 16px;
        padding-bottom: 5px;
      }
      .follow-btn {
        vertical-align: center;
        margin-left: auto;
        margin-top: 9px;
        .follow {
          background: #00a1d6;
          border-radius: 4px;
          border: 0;
        }
        .followed {
          background: rgba(0, 0, 0, 0.45);
          border-radius: 4px;
          border: 0;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 30%);
        }
      }
    }
  }

  .tags {
    height: 30px;
    line-height: 26px;
    text-align: center;
    font-size: 16px;
  }
  .comment-card {
    margin-top: 15px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 10%);
    .comment-avatar {
      margin: 5px 20px 0 0;
      width: 60px;
      height: 60px;
    }
    .comment-content {
      width: 60%;
      font-size: 16px;
    }
    .comment-btn {
      margin-left: 10px;
      height: 82px;
      width: 82px;
      padding: 0px;
    }
    .comment-submit-btn {
      background-color: #00a1d6;
      border: 1px solid #00a1d6;
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
  }
  .no-reply {
    width: 60%;
    color: #99a2aa;
    text-align: center;
    padding: 30px 0;
    font-size: 12px;
  }
}
.charge-modal-container {
  text-align: center;
  padding: 24px 40px;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
    img {
      width: 50px;
      border-radius: 50%;
      border: 1px solid #eee;
    }
    .content {
      font-size: 24px;
      font-weight: 500;
      margin-left: 16px;
      color: #404040;
    }
  }
  .money-btn-group {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 162.5px;
    height: 56px;
    font-size: 16px;
    color: #969696;
    margin-bottom: 12px;
    margin-right: 12px;
    border-radius: 10px;
    border: 1px solid #eee;
    cursor: pointer;
    &:nth-child(3) {
      margin-right: 0;
    }
    &:nth-child(6) {
      margin-right: 0;
    }
    & > span {
      font-size: 28px;
      font-style: italic;
    }
  }
  .choose-method {
    font-size: 15px;
    margin: 12px 0;
    color: #404040;
  }
  .method-btn-group {
    display: flex;
  }
  .pay-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 162.5px;
    height: 56px;
    font-size: 30px;
    // color: #969696;
    margin-bottom: 12px;
    margin-right: 12px;
    border-radius: 10px;
    border: 1px dashed #eee;
    cursor: not-allowed;
    opacity: 0.5;
    &:nth-child(3) {
      margin-right: 0;
      cursor: pointer;
      opacity: 1;
      // border: 1px solid #00a1d6;
    }
    &:nth-child(2) {
      // margin-right: 0;
      cursor: pointer;
      opacity: 1;
      // border: 1px solid #00a1d6;
    }
    & > span {
      font-size: 16px;
      font-style: normal;
      margin-left: 4px;
    }
  }
  .selected {
    border: 1px solid #00a1d6;
    border-color: #00a1d6;
    color: #00a1d6;
  }
}
.handle-btn {
  height: 44px;
  font-size: 18px;
  font-weight: normal;
  padding: 0px 48px;
  margin-bottom: 20px;
  background-color: #00a1d6;
  border-color: #00a1d6;
}
.pay-img-container {
  position: relative;
  .pay-img,
  .mask {
    width: 150px;
    height: 150px;
  }
  .mask {
    display: inline-block;
    opacity: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
  i {
    font-size: 4rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -2rem;
    margin-top: -2rem;
    color: #d6d6d6;
  }
}
</style>
