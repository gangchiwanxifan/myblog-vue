module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // antd主题色配置
          "primary-color": "#FA541C",
        },
        javascriptEnabled: true,
      },
    },
  },
  // svg-loader
  // chainWebpack: config => {
  //   const svgRule = config.module.rule("svg");

  //   // 清除已有的所有 loader。
  //   // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
  //   svgRule.uses.clear();

  //   // 添加要替换的 loader
  //   svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  // },
  devServer: {
    // proxy: "http://127.0.0.1:9100",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9100",
        pathRewrite: {
          "^/api": "/",
        },
        // changeOrigin: true
      },
      //   // '/foo': {
      //   //   target: '<other_url>'
      //   // }
    },
  },
};
