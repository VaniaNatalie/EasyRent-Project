const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/", {
      target: "https://easyrent-node-backend.herokuapp.com/",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/face-match-liveness", {
      target: "https://api.cloud.nodeflux.io/v1/analytics",
      changeOrigin: true,
      headers: {
        Authorization: `NODEFLUX-HMAC-SHA256 Credential=${process.env.NODEFLUX_ACCESS_KEY}/${process.env.NODEFLUX_DATE}/nodeflux.api.v1beta1.ImageAnalytic/StreamImageAnalytic, SignedHeaders=x-nodeflux-timestamp, Signature=${process.env.NODEFLUX_TOKEN}`,
        "x-nodeflux-timestamp": `${process.env.X_NODEFLUX_TIMESTAMP}`,
        "Content-Type": "application/json",
      },
    })
  );
  app.use(
    createProxyMiddleware("/ocr-ktp", {
      target: "https://api.cloud.nodeflux.io/v1/analytics",
      changeOrigin: true,
      headers: {
        Authorization: `NODEFLUX-HMAC-SHA256 Credential=${process.env.NODEFLUX_ACCESS_KEY}/${process.env.NODEFLUX_DATE}/nodeflux.api.v1beta1.ImageAnalytic/StreamImageAnalytic, SignedHeaders=x-nodeflux-timestamp, Signature=${process.env.NODEFLUX_TOKEN}`,
        "x-nodeflux-timestamp": `${process.env.X_NODEFLUX_TIMESTAMP}`,
        "Content-Type": "application/json",
      },
    })
  );
};
