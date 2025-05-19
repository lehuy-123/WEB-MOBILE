import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminProducts.css';

function ProductForm({ onSubmit, editingProduct }) {
  // Lưu toàn bộ category động từ backend
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '',
    brand: '',
    category: '',
    subcategory: '',
    description: '',
    variants: [{ color: '', ram: '', storage: '', price: '', stock: '', images: [] }],
    image: null,
    flagship: false,
  });

  // Quản lý trạng thái thêm danh mục
  const [newCategory, setNewCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddSubcategory, setShowAddSubcategory] = useState(false);

  // Lấy danh mục động từ backend
  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/categories');
      setCategories(res.data || []);
    } catch {
      setCategories([]);
      alert('Không thể tải danh mục từ server!');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Khi sửa sản phẩm
  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || '',
        brand: editingProduct.brand || '',
        category: editingProduct.category || '',
        subcategory: editingProduct.subcategory || '',
        description: editingProduct.description || '',
        image: null,
        flagship: !!editingProduct.flagship,
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

  // ==== Thêm danh mục CHA vào backend ====
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await axios.post('http://localhost:5001/api/categories', { name: newCategory });
      setNewCategory('');
      setShowAddCategory(false);
      fetchCategories();
    } catch (err) {
      alert('Không thể thêm danh mục: ' + (err.response?.data?.message || err.message));
    }
  };

  // ==== Thêm danh mục CON vào backend ====
  const handleAddSubcategory = async () => {
    if (!newSubcategory.trim() || !form.category) return;
    try {
      // Tìm _id của danh mục cha (theo slug)
      const parent = categories.find(cat => cat.slug === form.category && !cat.parentId);
      if (!parent) {
        alert('Không tìm thấy danh mục cha!');
        return;
      }
      await axios.post('http://localhost:5001/api/categories', {
        name: newSubcategory,
        parentId: parent._id
      });
      setNewSubcategory('');
      setShowAddSubcategory(false);
      fetchCategories();
    } catch (err) {
      alert('Không thể thêm danh mục con: ' + (err.response?.data?.message || err.message));
    }
  };

  // ==== Xử lý chọn danh mục cha/con ====
  const handleCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value, subcategory: '' });
    setShowAddSubcategory(false);
    setNewSubcategory('');
  };
  const handleSubcategoryChange = (e) => setForm({ ...form, subcategory: e.target.value });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFlagshipChange = (e) => setForm({ ...form, flagship: e.target.checked });

  // ==== Biến thể, ảnh, nộp form như cũ ====
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
        headers: { Authorization: `Bearer ${token}` }
      });
      const imageUrl = res.data.imageUrl;
      if (!imageUrl) throw new Error('Không nhận được URL ảnh từ server');
      const updated = [...form.variants];
      updated[index].images = [...(updated[index].images || []), imageUrl];
      setForm({ ...form, variants: updated });
    } catch (err) {
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
    formData.append('category', form.category);      // <-- Lưu slug
    formData.append('subcategory', form.subcategory);// <-- Lưu slug
    formData.append('description', form.description);
    formData.append('price', mainPrice);
    formData.append('image', form.image);
    formData.append('flagship', form.flagship ? 'true' : 'false');
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

  // ==== Lấy danh mục con theo slug cha ====
  const selectedCategory = categories.find(cat => cat.slug === form.category && !cat.parentId);
  const subcategories = categories.filter(
    cat => String(cat.parentId) === String(selectedCategory?._id)
  );

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3>{editingProduct ? '✏️ Sửa sản phẩm' : '➕ Thêm sản phẩm'}</h3>
      <div className="form-grid">
        <div>
          <label>Tên sản phẩm</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Thương hiệu</label>
          <input name="brand" value={form.brand} onChange={handleChange} />
        </div>
        {/* ==== Danh mục CHA ==== */}
        <div>
          <label>Danh mục</label>
          <div style={{ display: 'flex', gap: 6 }}>
            <select
              name="category"
              value={form.category}
              onChange={handleCategoryChange}
              required
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.filter(cat => !cat.parentId).map(cat => (
                <option key={cat._id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
            <button type="button" onClick={() => setShowAddCategory(v => !v)}>+ Thêm mới</button>
          </div>
          {showAddCategory && (
            <div style={{ marginTop: 4 }}>
              <input
                type="text"
                placeholder="Tên danh mục mới"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
              />
              <button type="button" onClick={handleAddCategory}>Thêm</button>
              <button type="button" onClick={() => setShowAddCategory(false)}>Huỷ</button>
            </div>
          )}
        </div>
        {/* ==== Danh mục CON ==== */}
        <div>
          <label>Danh mục con</label>
          <div style={{ display: 'flex', gap: 6 }}>
            <select
              name="subcategory"
              value={form.subcategory}
              onChange={handleSubcategoryChange}
              disabled={!form.category}
              required
            >
              <option value="">-- Chọn danh mục con --</option>
              {subcategories.map(sub => (
                <option key={sub._id} value={sub.slug}>{sub.name}</option>
              ))}
            </select>
            <button type="button" disabled={!form.category} onClick={() => setShowAddSubcategory(v => !v)}>+ Thêm mới</button>
          </div>
          {showAddSubcategory && (
            <div style={{ marginTop: 4 }}>
              <input
                type="text"
                placeholder="Tên danh mục con mới"
                value={newSubcategory}
                onChange={e => setNewSubcategory(e.target.value)}
                disabled={!form.category}
              />
              <button type="button" onClick={handleAddSubcategory} disabled={!form.category}>Thêm</button>
              <button type="button" onClick={() => setShowAddSubcategory(false)}>Huỷ</button>
            </div>
          )}
        </div>
        <div style={{ margin: '8px 0 0 0' }}>
          <label>
            <input
              type="checkbox"
              checked={!!form.flagship}
              onChange={handleFlagshipChange}
              style={{ marginRight: 6 }}
            />
            Sản phẩm Flagship
          </label>
        </div>
        <div className="full-width">
          <label>Mô tả sản phẩm</label>
          <textarea name="description" value={form.description} onChange={handleChange} />
        </div>
        <div className="full-width">
          <label>Ảnh sản phẩm chính</label>
          <input type="file" accept="image/*" onChange={handleMainImageChange} />
        </div>
      </div>
      {/* Biến thể giữ nguyên như cũ */}
      {form.variants.map((variant, idx) => (
        <div key={idx} className="variant-block">
          <h4>🍀 Biến thể #{idx + 1}</h4>
          <div className="form-grid">
            <div><label>Màu</label><input name="color" value={variant.color} onChange={e => handleVariantChange(idx, e)} /></div>
            <div><label>RAM</label><input name="ram" value={variant.ram} onChange={e => handleVariantChange(idx, e)} /></div>
            <div><label>Bộ nhớ</label><input name="storage" value={variant.storage} onChange={e => handleVariantChange(idx, e)} /></div>
            <div><label>Giá</label><input type="number" name="price" value={variant.price} onChange={e => handleVariantChange(idx, e)} /></div>
            <div><label>Tồn kho</label><input type="number" name="stock" value={variant.stock} onChange={e => handleVariantChange(idx, e)} /></div>
            <div className="full-width">
              <label>Ảnh minh hoạ</label>
              <input type="file" accept="image/*" onChange={e => handleImageUpload(e, idx)} />
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
