<template>
  <div class="page-wide" :key="homeId">
    <div class="h-inner" :style="{ backgroundImage: `url(${bgImg})` }">
      <div class="h-gradient"></div>
      <div class="h-user">
        <div class="h-info">
          <div class="h-avatar">
            <img :src="userInfo.avatar" id="h-avatar" alt="" />
          </div>
          <div class="h-basic">
            <div>
              <span id="h-name"
                >{{ userInfo.nickname }}
                <icon-font
                  :type="
                    icon[userInfo.sex]
                      ? icon[userInfo.sex]
                      : 'icon - gougouchushou'
                  "
                />
              </span>
            </div>
            <div class="h-basic-spacing">
              <span class="h-sign"> {{ userInfo.introduction }} </span>
            </div>
          </div>
          <div class="h-side">
            <div class="h-side-follow">
              <a-button
                v-if="!isFollow"
                class="follow-btn"
                type="primary"
                @click="addFollow"
              >
                关注
              </a-button>
              <a-button
                v-else
                class="followed-btn"
                type="primary"
                @click="cancelFollow"
              >
                已关注
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-card
      :bordered="false"
      :style="{ backgroundColor: 'transparent' }"
      :headStyle="{ backgroundColor: '#fff' }"
      :bodyStyle="{ padding: '0px' }"
      :tab-list="tabListNoTitle"
      :active-tab-key="noTitleKey"
      @tabChange="(key) => onTabChange(key, 'noTitleKey')"
    >
      <home-page v-if="noTitleKey === 'home'"></home-page>
      <article-page v-else-if="noTitleKey === 'blog'"></article-page>
      <catagory-page v-else-if="noTitleKey === 'catagory'"></catagory-page>
      <notice-page v-else-if="noTitleKey === 'notice'"></notice-page>
      <follow-page v-else-if="noTitleKey === 'follow'"></follow-page>
      <fans-page v-else-if="noTitleKey === 'fans'"></fans-page>
      <span slot="tabBarExtraContent">
        <a
          @click="onSideChange('follow')"
          class="tab-link"
          :class="{ 'active-link': noTitleKey === 'follow' }"
        >
          <a-icon type="star" />
          {{ this.homeId == this.userId ? "我的关注" : "TA的关注" }}
        </a>
        <a-divider type="vertical"></a-divider>
        <a
          @click="onSideChange('fans')"
          class="tab-link"
          :class="{ 'active-link': noTitleKey === 'fans' }"
        >
          <a-icon type="team" />
          {{ this.homeId == this.userId ? "我的粉丝" : "TA的粉丝" }}
        </a>
      </span>
    </a-card>
  </div>
</template>

<script>
import request from "@/utils/request";
import {
  HomePage,
  ArticlePage,
  CatagoryPage,
  NoticePage,
  FollowPage,
  FansPage,
} from "./page";

const list2 = [
  {
    key: "home",
    tab: "主页",
  },
  {
    key: "blog",
    tab: "文章",
  },
];

const list1 = [
  {
    key: "home",
    tab: "主页",
  },
  {
    key: "blog",
    tab: "文章",
  },
  {
    key: "catagory",
    tab: "文集",
  },
  {
    key: "notice",
    tab: "消息",
  },
];

export default {
  components: {
    HomePage,
    ArticlePage,
    CatagoryPage,
    NoticePage,
    FollowPage,
    FansPage,
  },
  data() {
    return {
      bgImg: "/center.png",
      img: "/avatar.png",
      userInfo: {},
      tabListNoTitle: list1,
      icon: ["icon-gougouchushou", "icon-nan", "icon-nv1"],
      noTitleKey: "home",
      isFollow: false,
    };
  },
  mounted() {
    if (this.homeId == this.userId) {
      this.userInfo = this.$store.state.user.userInfo;
    } else {
      this.tabListNoTitle = list2;
      this.getUser();
    }
    this.checkFollow();
  },
  computed: {
    homeId() {
      return this.$route.params.userId;
    },
    userId() {
      return this.$store.state.user.userInfo.userId;
    },
    follow() {
      const follow = {
        followUserId: this.homeId,
        followFanId: this.userId,
      };
      return follow;
    },
  },
  methods: {
    onTabChange(key, type) {
      this[type] = key;
    },
    onSideChange(key) {
      this.noTitleKey = key;
    },
    getUser() {
      request({
        url: "/user/get_user",
        method: "post",
        data: { id: this.homeId },
      }).then((res) => {
        if (res.data.data) {
          this.userInfo = res.data.data;
          // console.log(this.userInfo);
        }
      });
    },
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
      if (this.userId == this.homeId) {
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
  },
  watch: {
    $route(to, from) {
      //监听路由是否变化
      if (to.params != from.params) {
        this.checkFollow();
        this.noTitleKey = "home";
        if (this.homeId == this.userId) {
          this.tabListNoTitle = list1;
          this.userInfo = this.$store.state.user.userInfo;
        } else {
          this.tabListNoTitle = list2;
          this.getUser();
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.page-wide {
  max-width: 1200px;
  margin: 2px auto;
}
.h-inner {
  padding-top: 116px;
  position: relative;
  .h-gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 84px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAAAABdCAMAAADNEjtLAAABEVBMVEUDAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAACnjvHuAAAAW3RSTlMBAgMEBQYHCAkKCwwNDxAREhQVFhgZGxweHyEiJCUnKSosLS8xMjQ2ODk7PT5AQkNFR0hKTE5PUVNUVldZW1xeX2FiZGVnaGprbG5vcHFzdHV2d3h5ent8fX5/XoZ4lgAAAPVJREFUeAHt1AERADAQAiDdrX/mDyKEIAAAjGkDsOk3AAIEECCAAAEECCBAAAECCBBAgAACBBAggAABBAggQAABAggQQIAAAgQQIIAAAQQIIEAAAQIIEECAAAIEECCAAAEECAgQQIAAAgQQIIAAAQQIIEAAAQIIEECAAAIEECCAAAEECCBAAAECCBBAgAACBBAggAABBAggQAABAggQQIAAAgQQIIAAAQECCBBAgAACBBAggAABBAggQAABAggQQIAAAgQQIIAAAQQIIEAAAQIIEECAAAIEECCAAAEECCBAAAECCBBAgAACBAQIIEAAAQIseAEYdZ9sAcJDX4ICAAAAAElFTkSuQmCC);
    background-repeat: repeat-x;
  }
  .h-user {
    position: relative;
    z-index: 1;
  }
  .h-info {
    margin-left: 20px;
    padding-bottom: 16px;
    height: 84px;
    .h-avatar {
      // position: relative;
      float: left;
      width: 64px;
      height: 64px;
      border: 2px solid hsla(0, 0%, 100%, 0.4);
      border-radius: 52px;
      box-sizing: unset;
      #h-avatar {
        width: 64px;
        height: 64px;
        background: #fff;
        border-radius: 48px;
      }
    }
    .h-basic {
      float: left;
      color: #fff;
      font-size: 0;
      margin: 10px 0 0 20px;
      #h-name {
        display: inline-block;
        margin-right: 5px;
        font-weight: 700;
        line-height: 20px;
        font-size: 20px;
        vertical-align: middle;
      }

      .h-basic-spacing {
        margin-top: 8px;
      }
      .h-sign {
        background: transparent;
        border-radius: 4px;
        border: none;
        box-shadow: none;
        color: #d6dee4;
        font-size: 12px;
        font-family: Microsoft Yahei;
        line-height: 26px;
        height: 26px;
        margin-left: -5px;
        padding: 0 5px;
        top: -1px;
        width: 730px;
        font-weight: 400;
      }
    }
    .h-side {
      position: absolute;
      right: 0;
      bottom: 0;
      .h-side-follow {
        margin: 0 30px 17px 0;
        .follow-btn {
          width: 76px;
          box-shadow: 0 0 0 2px #fff;
          background: #fb7299;
        }
        .followed-btn {
          width: 76px;
          background: rgba(0, 0, 0, 0.45);
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 30%);
          border-color: transparent;
        }
      }
    }
  }
}
.tab-link {
  color: #99a2aa;
}
.active-link {
  color: #fa541c !important;
}
</style>
