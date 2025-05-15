// src/components/ProductForm.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminProducts.css';

function ProductForm({ onSubmit, editingProduct }) {
  const [form, setForm] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    variants: [{ color: '', ram: '', storage: '', price: '', stock: '', images: [] }],
    image: null
  });

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || '',
        brand: editingProduct.brand || '',
        category: editingProduct.category || '',
        description: editingProduct.description || '',
        image: null,
        variants: editingProduct.variants?.length
          ? editingProduct.variants.map(variant => ({
              color: variant.color || '',
              ram: variant.ram || '',
              storage: variant.storage || '',
              price: variant.price || '',
              stock: variant.quantity || '',
              images: variant.images || []
            }))
          : [{ color: '', ram: '', storage: '', price: '', stock: '', images: [] }]
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (index, e) => {
    const updated = [...form.variants];
    updated[index][e.target.name] = e.target.value;
    setForm({ ...form, variants: updated });
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (!token) {
      alert('❌ Vui lòng đăng nhập để upload ảnh');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:5001/api/products/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const imageUrl = res.data.imageUrl;
      if (!imageUrl) throw new Error('Không nhận được URL ảnh từ server');

      const updated = [...form.variants];
      updated[index].images = [...(updated[index].images || []), imageUrl];
      setForm({ ...form, variants: updated });
    } catch (err) {
      console.error('Lỗi upload ảnh:', err);
      alert('❌ Upload ảnh thất bại: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setForm({ ...form, image: file });
  };

  const addVariant = () => {
    setForm({
      ...form,
      variants: [...form.variants, { color: '', ram: '', storage: '', price: '', stock: '', images: [] }]
    });
  };

  const removeVariant = (index) => {
    const updated = form.variants.filter((_, i) => i !== index);
    setForm({ ...form, variants: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mainPrice = Number(form.variants[0]?.price || 0);
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('brand', form.brand);
    formData.append('category', form.category);
    formData.append('description', form.description);
    formData.append('price', mainPrice);
    formData.append('image', form.image);
    formData.append('variants', JSON.stringify(
      form.variants.map(v => ({
        color: v.color,
        ram: v.ram,
        storage: v.storage,
        price: Number(v.price) || 0,
        quantity: Number(v.stock) || 0,
        images: v.images || []
      }))
    ));
    formData.append('content', '');
    formData.append('specs', JSON.stringify([]));

    onSubmit && onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3>{editingProduct ? '✏️ Sửa sản phẩm' : '➕ Thêm sản phẩm'}</h3>

      <div className="form-grid">
        <div><label>Tên sản phẩm</label><input name="name" value={form.name} onChange={handleChange} required /></div>
        <div><label>Thương hiệu</label><input name="brand" value={form.brand} onChange={handleChange} /></div>
        <div><label>Danh mục</label><input name="category" value={form.category} onChange={handleChange} /></div>
        <div className="full-width"><label>Mô tả sản phẩm</label><textarea name="description" value={form.description} onChange={handleChange} /></div>
        <div className="full-width"><label>Ảnh sản phẩm chính</label><input type="file" accept="image/*" onChange={handleMainImageChange} /></div>
      </div>

      {form.variants.map((variant, idx) => (
        <div key={idx} className="variant-block">
          <h4>🍀 Biến thể #{idx + 1}</h4>
          <div className="form-grid">
            <div><label>Màu</label><input name="color" value={variant.color} onChange={(e) => handleVariantChange(idx, e)} /></div>
            <div><label>RAM</label><input name="ram" value={variant.ram} onChange={(e) => handleVariantChange(idx, e)} /></div>
            <div><label>Bộ nhớ</label><input name="storage" value={variant.storage} onChange={(e) => handleVariantChange(idx, e)} /></div>
            <div><label>Giá</label><input type="number" name="price" value={variant.price} onChange={(e) => handleVariantChange(idx, e)} /></div>
            <div><label>Tồn kho</label><input type="number" name="stock" value={variant.stock} onChange={(e) => handleVariantChange(idx, e)} /></div>
            <div className="full-width">
              <label>Ảnh minh hoạ</label>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, idx)} />
              {variant.images?.length > 0 && (
                <div>
                  {variant.images.map((img, i) => (
                    <img key={i} src={img} alt={`Ảnh sản phẩm ${i + 1}`} height={60} style={{ marginRight: '10px' }} />
                  ))}
                </div>
              )}
            </div>
          </div>
          {form.variants.length > 1 && (
            <button type="button" onClick={() => removeVariant(idx)} className="btn-variant-remove">❌ Xoá biến thể</button>
          )}
        </div>
      ))}

      <button type="button" onClick={addVariant} className="btn-add-variant">➕ Thêm biến thể</button>
      <button type="submit" className="btn-submit">{editingProduct ? '💾 Lưu chỉnh sửa' : '✅ Thêm sản phẩm'}</button>
    </form>
  );
}

export default ProductForm;
