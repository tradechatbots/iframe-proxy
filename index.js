const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/proxy", (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("Missing URL");

  request(
    {
      url: targetUrl,
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    },
    (error, response, body) => {
      if (error) return res.status(500).send("Error fetching site");

      res.set("Content-Type", response.headers["content-type"] || "text/html");
      res.removeHeader("x-frame-options");
      res.removeHeader("content-security-policy");
      res.send(body);
    }
  );
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
