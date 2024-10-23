"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import 'bootstrap/dist/css/bootstrap.min.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await axios.get('/api/rss');
        parseString(response.data, (err, result) => {
          if (err) {
            console.error('Error parsing XML:', err);
          } else {
            if (result && result.feed && result.feed.entry) {
              const items = result.feed.entry;
              setNews(items);
            } else {
              console.error('Unexpected RSS format:', result);
            }
          }
          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching RSS feed:', error);
        setLoading(false);
      }
    };

    fetchRSS();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <h1>Yükleniyor...</h1>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" style={{ fontSize: "30px" }} href="#">Koc Haber</a>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="row">
          {news.map((item, index) => {
            // Resim URL'sini almak için content alanını kontrol et
            let imageUrl = '';
            if (item.content && item.content[0]._) {
              const contentHtml = item.content[0]._;
              const imgMatch = contentHtml.match(/<img[^>]+src="([^">]+)"/);
              if (imgMatch && imgMatch[1]) {
                imageUrl = imgMatch[1];
              }
            }

            return (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100">
                  {imageUrl && (
                    <img src={imageUrl} className="card-img-top" alt={item.title[0]._} />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{item.title[0]._}</h5>
                    <a href={item.link[0].$.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      Devamını Oku...
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default News;