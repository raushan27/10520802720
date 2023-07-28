const express = require("express");
const app = express();
const axios = require("axios");
const port = 8008;
const timeout = 500;

app.get("/numbers", async (req, res) => {
  const urls = req.query.url;
  const result = new Set();
  const promises = urls.map((url) => axios.get(url, { timeout }));
  try {
    const responses = await Promise.all(promises);
    for (const response of responses) {
      const numbers = response.data.numbers;
      for (const number of numbers) {
        result.add(number);
      }
    }
  } catch (error) {
    console.error(error);
  }
  res.json(Array.from(result).sort((a, b) => a - b));
});

app.listen(port, () => {
  console.log(
    `number-management-service listening at http://localhost:${port}`
  );
});
