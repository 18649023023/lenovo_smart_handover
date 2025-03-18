module.exports = {
  // presets: [
  //   [
  //     "@vue/app",
  //     {
  //       useBuiltIns: "entry",
  //       polyfills: ["es6.promise", "es6.symbol"],
  //     },
  //   ],
  //   [
  //     "@babel/preset-env",
  //     {
  //       modules: false,
  //       useBuiltIns: "entry",
  //       corejs: 2,
  //     },
  //   ],
  // ],
  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true,
      },
      "vant",
    ],
  ],
  presets: [
    "@vue/cli-plugin-babel/preset",
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: 3,
        targets: {
          ios: "8",
          android: "4",
          chrome: "58",
        },
      },
    ],
  ],
  plugins: [
    "@babel/plugin-transform-arrow-functions", // 箭头函数转换
    "@babel/plugin-proposal-optional-chaining", // 可选链（?.）转换
  ],
};
