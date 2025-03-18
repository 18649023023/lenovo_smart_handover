const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = defineConfig({
  // productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: (config) => {
    config.module.rules.push({
      test: /\.worker.js$/,

      use: {
        loader: "worker-loader",

        options: {
          inline: true,

          name: "workerName.[hash].js",
        },
      },
    });
  },
  parallel: false,
  configureWebpack: {
    //解决Invalid options in vue.config.js: "plugins" is not allowed的问题
    // externals: {
    //   'echarts': 'echarts' // 配置使用CDN
    // },
    plugins: [
      // new BundleAnalyzerPlugin(),
      // 配置jQuery
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
      }),
    ],
    resolve: {
      fallback: {
        path: false,
        stream: false,
        zlib: false,
        fs: false,
      },
    },
  },
  devServer: {
    port: 8082,
    open: false,
    allowedHosts: "all",
    client: {
      overlay: false,
    },
    proxy: {
      "/LKApi": {
        target: "https://support.tpitc.cn/LKApi/", // target host
        ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          "^/LKApi": "", // rewrite path
        },
      },
      // "/accessToken": {
      //   target: "https://support.tpitc.cn/LKApi/", // target host
      //   ws: true, // proxy websockets
      //   changeOrigin: true, // needed for virtual hosted sites
      //   pathRewrite: {
      //     "^/accessToken": "", // rewrite path
      //   },
      // },
    },
  },
});
