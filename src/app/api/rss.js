import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://www.ntv.com.tr/turkiye.rss');
    res.status(200).send(response.data);
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    res.status(500).send('Error fetching RSS feed');
  }
}