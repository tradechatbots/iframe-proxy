const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use('/proxy', createProxyMiddleware({
  target: 'https://example.com',
  changeOrigin: true,
  pathRewrite: {
    '^/proxy\\?url=': '',
  },
  router: (req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    return url.searchParams.get('url') || 'https://example.com';
  }
}));

app.get('/', (req, res) => {
  res.send('Proxy server is running!');
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
