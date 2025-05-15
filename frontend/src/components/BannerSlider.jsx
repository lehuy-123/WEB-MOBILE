import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/BannerSlider.css';

function BannerSlider() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/banners')
      .then(res => setBanners(res.data))
      .catch(err => console.error('Lỗi tải banner:', err));
  }, []);

  return (
    <div className="banner-slider">
      {banners.map((b) => (
        <a key={b.id} href={b.link}>
          <img src={b.image} alt={b.title} className="banner-image" />
        </a>
      ))}
    </div>
  );
}

export default BannerSlider;
