require("dotenv/config");
const express = require("express");
const spotify = require("./lib/spotify");

const app = express();

app.get("/search", async (req, res) => {
  const params = req.query;

  const result = await spotify.search(params);

  return res.json(result);
});

app.listen(process.env.PORT || "3000");