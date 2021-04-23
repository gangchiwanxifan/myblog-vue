import request from "@/utils/request";

const user = {
  state: {
    loginStatus: false,
    userInfo: {},
    rememberMe: false,
    account: {},
  },
  mutations: {
    SET_LOGIN_STATUS: (state, status) => {
      state.loginStatus = status;
    },
    SET_USER_INFO: (state, info) => {
      state.userInfo = info;
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account;
    },
    SET_REMEMBER: (state, rememberMe) => {
      state.rememberMe = rememberMe;
    },
  },
  actions: {
    // 获取用户信息
    fetchUserInfo({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: "/user/get_user",
          method: "post",
          data: { id: id },
        })
          .then((res) => {
            const result = res.data.data;
            commit("SET_LOGIN_STATUS", true);
            commit("SET_USER_INFO", result);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 登出
    clearUserInfo({ commit }) {
      commit("SET_LOGIN_STATUS", false);
      commit("SET_USER_INFO", {});
    },
    // 取消记住密码
    clearRemember({ commit }) {
      commit("SET_ACCOUNT", {});
      commit("SET_REMEMBER", false);
    },
  },
};

export default user;
