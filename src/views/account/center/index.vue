<template>
  <div class="page-wide">
    <div class="h-inner" :style="{ backgroundImage: `url(${bgImg})` }">
      <div class="h-gradient"></div>
      <div class="h-user">
        <div class="h-info">
          <div class="h-avatar">
            <img :src="img" id="h-avatar" alt="" />
          </div>
          <div class="h-basic">
            <div>
              <span id="h-name">71369754782_bili</span>
            </div>
            <div class="h-basic-spacing">
              <span class="h-sign"> asdsafgsdgasdg </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-card
      :bordered="false"
      :style="{ backgroundColor: 'transparent' }"
      :headStyle="{ backgroundColor: '#fff' }"
      :tab-list="tabListNoTitle"
      :active-tab-key="noTitleKey"
      @tabChange="(key) => onTabChange(key, 'noTitleKey')"
    >
      <p v-if="noTitleKey === 'home'">主页</p>
      <p v-else-if="noTitleKey === 'blog'">文章</p>
      <p v-else-if="noTitleKey === 'catagory'">文集</p>
      <p v-else-if="noTitleKey === 'follow'">关注</p>
      <p v-else-if="noTitleKey === 'fans'">粉丝</p>
      <span slot="tabBarExtraContent">
        <a @click="onSideChange('follow')"><a-icon type="star" />我的关注</a>
        <a-divider type="vertical"></a-divider>
        <a @click="onSideChange('fans')"><a-icon type="team" />我的粉丝</a>
      </span>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgImg: "/center.png",
      img: "/avatar.png",
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
      ],
      noTitleKey: "home",
    };
  },
  methods: {
    onTabChange(key, type) {
      this[type] = key;
    },
    onSideChange(key) {
      this.noTitleKey = key;
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
  }
}
</style>
