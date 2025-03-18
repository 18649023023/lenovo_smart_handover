const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = process.env.PORT || 3000;

// 代理配置
const apiProxy = createProxyMiddleware("/api", {
  target: "http://121.43.52.187:8009/api/", // 代理目标地址
  changeOrigin: true, // 修改请求头中的Host字段为代理目标地址的主机名
  pathRewrite: {
    "^/api": "", // 将请求路径中的/api替换为空字符串
  },
});

// 应用代理中间件
app.use("/api", apiProxy);

// 静态文件服务
app.use(express.static(path.join(__dirname, "dist")));

// 所有其他请求都返回index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
