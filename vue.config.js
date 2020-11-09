module.exports = {
  outputDir: process.env.VUE_APP_OUTPUT_DIR || "contract",
  publicPath: process.env.BASE_URL,
  devServer: {
    proxy: process.env.VUE_APP_DEV_PROXY_URL || "https://pantest.hiido.com",
    disableHostCheck: true,
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "手机签约";
      return args;
    });
  },
  css: {
    loaderOptions: {
      less: {
        // 若使用 less-loader@5，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            blue: "#14c6f2",
          },
        },
      },
    },
  },
};
