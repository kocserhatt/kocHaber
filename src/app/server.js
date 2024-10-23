const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;

// CORS middleware'ini ekleyin
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/rss', async (req, res) => {
  try {
    const response = await axios.get('https://www.ntv.com.tr/turkiye.rss');
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching RSS feed');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});