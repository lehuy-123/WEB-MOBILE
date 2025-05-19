import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchProducts } from '../api/productAPI';
import '../styles/ProductListPage.css';

// Hàm build cây danh mục từ mảng phẳng
function buildCategoryTree(categories) {
  const map = {};
  categories.forEach(cat => { map[cat._id] = { ...cat, children: [] }; });
  const tree = [];
  categories.forEach(cat => {
    if (cat.parentId) {
      if (map[cat.parentId]) map[cat.parentId].children.push(map[cat._id]);
    } else {
      tree.push(map[cat._id]);
    }
  });
  return tree;
}

function SidebarCategory({ tree, selected, setSelected }) {
  const [open, setOpen] = useState({});
  const toggleOpen = (catId) => {
    setOpen({ ...open, [catId]: !open[catId] });
  };

  return (
    <aside className="sidebar-category">
      <h3>Danh mục</h3>
      <ul>
        {tree.map(cat => (
          <li key={cat._id}>
            <div
              className={`cat-parent${selected === cat.slug ? ' active' : ''}`}
              onClick={() => setSelected(cat.slug)}
              style={{ fontWeight: selected === cat.slug ? 'bold' : 'normal', cursor: 'pointer' }}
            >
              {cat.name}
              {cat.children?.length > 0 && (
                <span
                  onClick={e => { e.stopPropagation(); toggleOpen(cat._id); }}
                  style={{ marginLeft: 8, color: '#999', cursor: 'pointer' }}
                >
                  {open[cat._id] ? '-' : '+'}
                </span>
              )}
            </div>
            {cat.children && cat.children.length > 0 && open[cat._id] && (
              <ul className="cat-children">
                {cat.children.map(child => (
                  <li
                    key={child._id}
                    className={selected === child.slug ? 'active' : ''}
                    onClick={() => setSelected(child.slug)}
                    style={{
                      marginLeft: 14,
                      fontWeight: selected === child.slug ? 'bold' : 'normal',
                      cursor: 'pointer'
                    }}
                  >{child.name}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
        <li>
          <div
            className={`cat-parent${!selected ? ' active' : ''}`}
            style={{ color: '#2c70ca', cursor: 'pointer', marginTop: 14 }}
            onClick={() => setSelected('')}
          >Tất cả sản phẩm</div>
        </li>
      </ul>
    </aside>
  );
}

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(''); // slug đang chọn

  useEffect(() => {
    fetchProducts().then(setProducts);
    axios.get('http://localhost:5001/api/categories')
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  const tree = buildCategoryTree(categories);

  // Sửa filter theo chuẩn e-commerce
  const filtered = !category
    ? products
    : (() => {
        const selectedCat = categories.find(cat => cat.slug === category);
        if (!selectedCat) return [];
        if (!selectedCat.parentId) {
          // Danh mục cha: chỉ lấy sản phẩm gán trực tiếp vào cha, không lấy sản phẩm sub
          return products.filter(
            p => p.category === category && (!p.subcategory || p.subcategory === '')
          );
        } else {
          // Danh mục con: chỉ lấy sản phẩm có subcategory === slug con
          return products.filter(p => p.subcategory === category);
        }
      })();

  return (
    <div className="main-flex-container">
      <SidebarCategory
        tree={tree}
        selected={category}
        setSelected={setCategory}
      />
      <main className="main-product-content">
        <h2 style={{ margin: '18px 0 22px' }}>🛒 Danh sách sản phẩm</h2>
        <div className="product-grid">
          {filtered.length === 0 ? (
            <div>Không có sản phẩm nào</div>
          ) : filtered.map(p => (
            <div key={p._id || p.id} className="product-card">
              {p.image ? (
                <img src={`http://localhost:5001/uploads/${p.image}`} alt={p.name} className="product-image" />
              ) : (
                <div className="no-image">Không có ảnh</div>
              )}
              <h4>{p.name}</h4>
              <p>{typeof p.price === 'number' ? `${p.price.toLocaleString()} VND` : 'Chưa có giá'}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProductListPage;
