// src/components/ProductForm.jsx
import { useEffect, useState } from 'react';
import '../styles/AdminProducts.css';

function ProductForm({ onSubmit, editingProduct }) {
  const [form, setForm] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    variants: [{ color: '', ram: '', storage: '', price: '', stock: '', image: '' }]
  });

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || '',
        brand: editingProduct.brand || '',
        category: editingProduct.category || '',
        description: editingProduct.description || '',
        variants: editingProduct.variants?.length
          ? editingProduct.variants
          : [{ color: '', ram: '', storage: '', price: '', stock: '', image: '' }]
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

  const addVariant = () => {
    setForm({
      ...form,
      variants: [...form.variants, { color: '', ram: '', storage: '', price: '', stock: '', image: '' }]
    });
  };

  const removeVariant = (index) => {
    const updated = form.variants.filter((_, i) => i !== index);
    setForm({ ...form, variants: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mainPrice = Number(form.variants[0]?.price || 0);
    const mainImage = form.variants[0]?.image || '';

    const productData = {
      ...form,
      price: mainPrice,
      image: mainImage,
    };

    onSubmit && onSubmit(productData);

    if (!editingProduct) {
      setForm({
        name: '', brand: '', category: '', description: '',
        variants: [{ color: '', ram: '', storage: '', price: '', stock: '', image: '' }]
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3>{editingProduct ? ' Sửa sản phẩm' : ' Thêm sản phẩm'}</h3>

      <div className="form-grid">
        <div><label>Tên sản phẩm</label><input name="name" value={form.name} onChange={handleChange} required /></div>
        <div><label>Thương hiệu</label><input name="brand" value={form.brand} onChange={handleChange} /></div>
        <div><label>Danh mục</label><input name="category" value={form.category} onChange={handleChange} /></div>
        <div className="full-width"><label>Mô tả sản phẩm</label><textarea name="description" value={form.description} onChange={handleChange} /></div>
      </div>

      {form.variants.map((variant, idx) => (
        <div key={idx} className="variant-block">
          <h4> Biến thể {idx + 1}</h4>
          <div className="form-grid">
            <div><label>Màu</label><input name="color" value={variant.color} onChange={(e) => handleVariantChange(idx, e)} /></div>
            <div><label>RAM</label><input name="ram" value={variant.ram} onChange={(e) => handleVariantChange(idx, e)} /></div>
            <div><label>Bộ nhớ</label><input name="storage" value={variant.storage} onChange={(e) => handleVariantChange(idx, e)} /></div>
            <div><label>Giá</label><input type="number" name="price" value={variant.price} onChange={(e) => handleVariantChange(idx, e)} /></div>
            <div><label>Tồn kho</label><input type="number" name="stock" value={variant.stock} onChange={(e) => handleVariantChange(idx, e)} /></div>
            <div className="full-width"><label>Ảnh minh hoạ</label><input name="image" value={variant.image} onChange={(e) => handleVariantChange(idx, e)} /></div>
          </div>
          {form.variants.length > 1 && (
            <button type="button" onClick={() => removeVariant(idx)} className="btn-variant-remove">❌ Xoá biến thể</button>
          )}
        </div>
      ))}

      <button type="button" onClick={addVariant} className="btn-add-variant">➕ Thêm biến thể</button>
      <button type="submit" className="btn-submit">{editingProduct ? '💾 Lưu chỉnh sửa' : ' Thêm sản phẩm'}</button>
    </form>
  );
}

export default ProductForm;
