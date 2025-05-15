// src/components/ProductForm.jsx
import { useState } from 'react';
import axios from 'axios';
import '../styles/AdminProducts.css';

function ProductForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    image: '',
    brand: '',
    category: '',
    price: '',
    description: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/products', form);
      if (res.status === 201) {
        alert('✅ Thêm sản phẩm thành công');
        onSubmit(res.data);
        setForm({ name: '', image: '', brand: '', category: '', price: '', description: '' });
      }
    } catch (err) {
      console.error('❌ Thêm sản phẩm thất bại:', err);
      alert('Thêm thất bại, kiểm tra dữ liệu');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3>➕ Thêm sản phẩm</h3>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Tên sản phẩm" required />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Link ảnh" required />
      <input name="brand" value={form.brand} onChange={handleChange} placeholder="Thương hiệu" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Danh mục" />
      <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Giá" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Mô tả" rows="3" />
      <button type="submit">Lưu sản phẩm</button>
    </form>
  );
}

export default ProductForm;
