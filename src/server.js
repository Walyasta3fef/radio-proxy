const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.get('/proxy', (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('URL is required');
  try {
    req.pipe(request(url)).pipe(res);
  } catch (error) {
    res.status(500).send('Error fetching URL.');
  }
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
