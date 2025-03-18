module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 32, // 设计稿宽度或者目前正常分辨率的1/10
      propList: ["*"], // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
      selectorBlackList: ["mint-"], // 要忽略的选择器并保留为px。
    },
  },
};
