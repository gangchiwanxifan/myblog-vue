<template>
  <div class="page-wide">
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
                <a-icon type="man" style="color: blue" />
              </span>
            </div>
            <div class="h-basic-spacing">
              <span class="h-sign"> {{ userInfo.introduction }} </span>
            </div>
          </div>
          <div class="h-side">
            <div class="h-side2"><a-button>关注</a-button></div>
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
        <a @click="onSideChange('follow')"><a-icon type="star" />我的关注</a>
        <a-divider type="vertical"></a-divider>
        <a @click="onSideChange('fans')"><a-icon type="team" />我的粉丝</a>
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
      tabListNoTitle: [
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
          tab: "通知",
        },
      ],
      noTitleKey: "home",
    };
  },
  mounted() {
    if (this.homeId == this.userId) {
      this.userInfo = this.$store.state.user.userInfo;
    } else {
      this.tabListNoTitle = list2;
      this.getUser();
    }
  },
  computed: {
    homeId() {
      return this.$route.params.userId;
    },
    userId() {
      return this.$store.state.user.userInfo.userId;
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
        line-height: 18px;
        font-size: 18px;
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
      .h-side2 {
        margin: 0 20px 17px 0;
      }
    }
  }
}
</style>
