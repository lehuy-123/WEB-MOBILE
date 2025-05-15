import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/BrandFilter.css';

function BrandFilter() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/brands')
      .then(res => setBrands(res.data))
      .catch(err => console.error('Lỗi tải danh mục hãng:', err));
  }, []);

  return (
    <div className="brand-filter">
      {brands.map(brand => (
        <button key={brand._id}>{brand.name}</button>
      ))}
    </div>
  );
}

export default BrandFilter;
