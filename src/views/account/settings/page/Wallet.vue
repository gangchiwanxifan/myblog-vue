<template>
  <div class="wallet-containier">
    <div class="user">
      <img class="avatar" :src="userInfo.avatar" />
      <div class="info">
        <a class="name">{{ userInfo.nickname }}</a>
        <div class="has-phone">{{ phone }}</div>
      </div>
    </div>
    <div class="middle">
      <div class="account-money">账户余额</div>
      <span class="money-main">{{ userInfo.balance }}</span>
      <span class="money-sub">.00元</span>
      <div class="action">
        <a-button class="withdrawal" shape="round" @click="warn">提现</a-button>
        <span class="warn">*当前不支持提现</span>
      </div>
    </div>
    <div class="meta">
      <div class="charge">
        <a-button class="charge-btn" @click="showModal"
          ><a-icon type="thunderbolt" theme="filled" />余额充值</a-button
        >
      </div>
    </div>

    <a-table
      :columns="columns"
      :data-source="orders"
      rowKey="orderId"
      :loading="loading"
      :pagination="{ defaultPageSize: 4 }"
      :style="{ marginTop: '20px' }"
    >
      <span slot="payType"> 赞赏 </span>

      <span slot="action" slot-scope="record">
        <template v-if="record.orderUserId == userInfo.userId">
          你打赏了
          <a @click="$router.push({ path: `/center/${record.orderTargetId}` })">
            {{ record.orderTargetName }}
          </a>
          的文章
        </template>
        <template v-else>
          <a @click="$router.push({ path: `/center/${record.orderUserId}` })">
            {{ record.orderUserName }}
          </a>
          打赏了你的文章
        </template>
        <a @click="$router.push({ path: `/blog/${record.orderBlogId}` })">
          《{{ record.orderBlogTitle }}》
        </a>
      </span>

      <span slot="orderPrice" slot-scope="record">
        {{ record.orderUserId == userInfo.userId ? "-" : "" }} ￥
        {{ record.orderPrice }}.00
      </span>

      <span slot="orderType" slot-scope="type">
        {{ payMethods[type] }}
      </span>
    </a-table>

    <a-modal v-model="visible" :width="640" :footer="null">
      <div class="charge-modal-container">
        <div class="title">
          <img :src="userInfo.avatar" />
          <div class="content">余额充值</div>
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
          <a-tooltip placement="top">
            <template slot="title">
              <span>网站暂时不支持支付宝</span>
            </template>
            <div class="pay-btn">
              <icon-font type="icon-umidd17" /><span>支付宝</span>
            </div>
          </a-tooltip>
          <div class="pay-btn">
            <icon-font type="icon-F8523125E92F6969F7377D0C42335F33" /><span
              >无中生有</span
            >
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: center; align-items: center">
        <a-button class="handle-btn" type="primary" @click="handlePay"
          ><span>确认支付 ￥{{ money[choice] }}</span></a-button
        >
      </div>
    </a-modal>
  </div>
</template>

<script>
import request from "@/utils/request";

const payMethods = ["支付宝", "余额支付", "微信支付"];

const columns = [
  {
    title: "时间",
    dataIndex: "createTime",
    key: "createTime",
    width: "20%",
  },
  {
    title: "类型",
    key: "payType",
    scopedSlots: { customRender: "payType" },
  },
  {
    title: "详情",
    key: "action",
    scopedSlots: { customRender: "action" },
    ellipsis: true,
    width: "40%",
  },
  {
    title: "金额",
    // dataIndex: "orderPrice",
    key: "orderPrice",
    scopedSlots: { customRender: "orderPrice" },
  },
  {
    title: "支付方式",
    dataIndex: "orderType",
    key: "orderType",
    scopedSlots: { customRender: "orderType" },
  },
];

export default {
  data() {
    this.$message.config({
      maxCount: 1,
    });
    return {
      visible: false,
      money: [2, 5, 10, 20, 50, 100],
      choice: 0,
      orders: [],
      columns,
      payMethods,
      loading: true,
    };
  },
  mounted() {
    this.getOrder();
    this.$store.dispatch("fetchUserInfo", this.userInfo.userId);
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    phone() {
      return this.userInfo.phone ? "已绑定手机" : "未绑定手机";
    },
  },
  methods: {
    getOrder() {
      this.loading = true;
      request({
        url: "/order/list",
        method: "get",
        params: { userId: this.userInfo.userId },
      }).then((res) => {
        if (res.data.data) {
          this.orders = res.data.data;
          this.loading = false;
        }
      });
    },
    warn() {
      this.$message.warn("当前不支持提现~", 2);
    },
    showModal() {
      this.visible = true;
    },
    select(index) {
      this.choice = index;
    },
    handlePay() {
      this.$message.loading("支付中，请稍等...", 0);
      const user = {
        userId: this.userInfo.userId,
        balance: this.money[this.choice],
      };
      request({
        url: "/user/pay",
        method: "post",
        data: user,
      }).then((res) => {
        if (res.data.data) {
          this.$store.dispatch("fetchUserInfo", user.userId);
          this.$message.success("充值成功", 1);
          this.visible = false;
          this.choice = 0;
        } else {
          this.$message.error("发生未知错误");
          this.choice = 0;
          this.visible = false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.wallet-containier {
  // background-color: rgb(201, 212, 209);
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  .user {
    padding-top: 40px;
    padding-bottom: 40px;
    display: flex;
    width: 30%;
    .avatar {
      height: 80px;
      border-radius: 50%;
    }
    .info {
      padding: 10px;
    }
    .name {
      font-size: 21px;
      font-weight: 700;
      color: #333;
    }
    .has-phone {
      color: #969696;
      font-size: 12px;
    }
  }
  .middle {
    width: 40%;
    padding: 10px 55px;
    border-left: 1px solid #e4e4e4;
    border-right: 1px solid #e4e4e4;
    .account-money {
      margin-right: 20px;
      font-size: 16px;
      color: #969696;
      display: inline-block;
    }
    .money-main {
      font-size: 28px;
    }
    .money-sub {
      font-size: 18px;
    }
    .action {
      margin-top: 20px;
      .withdrawal {
        color: #42c02e;
        border-color: #42c02e;
        width: 80px;
        margin-right: 15px;
        font-size: 15px;
      }
      .warn {
        font-size: 13px;
        color: #969696;
      }
    }
  }
  .meta {
    width: 30%;
    position: relative;
    .charge {
      // width: 100%;
      // height: 100%;
      position: relative;
      .charge-btn {
        width: 140px;
        height: 45px;
        font-size: 18px;
        line-height: 45px;
        text-align: center;
        color: #fff;
        background-color: #fa541c;
        display: block;
        margin: 0 auto;
        margin-top: 45px;
      }
    }
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
  .selected {
    border-color: #fa541c;
    color: #fa541c;
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
      border: 1px solid #fa541c;
    }
    & > span {
      font-size: 16px;
      font-style: normal;
      margin-left: 4px;
    }
  }
}
.handle-btn {
  height: 44px;
  font-size: 18px;
  font-weight: normal;
  padding: 0px 48px;
  margin-bottom: 20px;
}
</style>
