import request from "@/utils/request";

const user = {
  state: {
    loginStatus: false,
    userInfo: {},
  },
  mutations: {
    SET_LOGIN_STATUS: (state, status) => {
      state.loginStatus = status;
    },
    SET_USER_INFO: (state, info) => {
      state.userInfo = info;
    },
  },
  actions: {
    // 获取用户信息
    fetchUserInfo({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: "/user/getuser",
          method: "post",
          data: { id },
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
  },
};

export default user;
