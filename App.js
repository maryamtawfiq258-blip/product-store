import { useState } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('add');
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    if (editId !== null) {
      setProducts(
        products.map((p) =>
          p.id === editId ? { ...p, name, price, image: image || p.image } : p
        )
      );
      setEditId(null);
    } else {
      const newProduct = {
        id: Date.now(),
        name,
        price: Number(price),
        image: image || 'https://via.placeholder.com/80',
      };
      setProducts([...products, newProduct]);
    }

    setName('');
    setPrice('');
    setImage(null);
    setCurrentPage('products');
  };

  const handleStartEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setEditId(product.id);
    setCurrentPage('add');
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setName('');
    setPrice('');
    setImage(null);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const totalProducts = products.length;
  const totalPrice = products.reduce((sum, p) => sum + Number(p.price), 0);

  return (
    <div style={{ 
      maxWidth: '850px', 
      margin: '40px auto', 
      padding: '35px', 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
      direction: 'rtl',
      backgroundColor: '#fcecf2',
      borderRadius: '20px',
      boxShadow: '0 12px 30px rgba(214, 143, 175, 0.25)',
      border: '1px solid #f7d9e5'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '12px', 
        marginBottom: '35px',
        borderBottom: '2px solid #f4c2d7',
        paddingBottom: '18px',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={() => { setCurrentPage('add'); handleCancelEdit(); }}
          style={{ 
            padding: '12px 22px', 
            backgroundColor: currentPage === 'add' ? '#b86baf' : '#f4c2d7', 
            color: currentPage === 'add' ? '#fff' : '#6e3857', 
            border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold',
            boxShadow: currentPage === 'add' ? '0 4px 10px rgba(184, 107, 175, 0.3)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          ➕ إضافة منتج جديد
        </button>
        <button 
          onClick={() => setCurrentPage('products')}
          style={{ 
            padding: '12px 22px', 
            backgroundColor: currentPage === 'products' ? '#b86baf' : '#f4c2d7', 
            color: currentPage === 'products' ? '#fff' : '#6e3857', 
            border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold',
            boxShadow: currentPage === 'products' ? '0 4px 10px rgba(184, 107, 175, 0.3)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          📦 قائمة المنتجات ({products.length})
        </button>
        <button 
          onClick={() => setCurrentPage('dashboard')}
          style={{ 
            padding: '12px 22px', 
            backgroundColor: currentPage === 'dashboard' ? '#b86baf' : '#f4c2d7',color: currentPage === 'dashboard' ? '#fff' : '#6e3857', 
            border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold',
            boxShadow: currentPage === 'dashboard' ? '0 4px 10px rgba(184, 107, 175, 0.3)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          📊 لوحة الإحصائيات
        </button>
      </div>
      {currentPage === 'add' && (
        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', border: '1px solid #f7d9e5', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <h2 style={{ color: '#6e3857', textAlign: 'center', marginBottom: '25px', fontWeight: '700' }}>
            {editId !== null ? '✨ تعديل بيانات المنتج' : '✨ إضافة منتج جديد للمخزن'}
          </h2>
          <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#6e3857', fontWeight: '600' }}>صورة المنتج:</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                style={{ padding: '10px', border: '1px solid #e8b4cb', borderRadius: '10px', width: '100%', backgroundColor: '#faf7fc', cursor: 'pointer' }}
              />
              
              {image && (
                <div style={{ position: 'relative', display: 'inline-block', marginTop: '12px' }}>
                  <img src={image} alt="Preview" style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '10px', border: '2px solid #b86baf' }} />
                  <button 
                    type="button" 
                    onClick={handleRemoveImage}
                    style={{ 
                      position: 'absolute', 
                      top: '-8px', 
                      left: '-8px', 
                      backgroundColor: '#d9534f', 
                      color: '#fff', 
                      border: 'none', 
                      borderRadius: '50%', 
                      width: '26px', 
                      height: '26px', 
                      fontSize: '13px', 
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}
                    title="حذف الصورة"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#6e3857', fontWeight: '600' }}>اسم المنتج:</label>
              <input
                type="text"
                placeholder="أدخل اسم المنتج..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ padding: '12px 15px', borderRadius: '10px', border: '1px solid #e8b4cb', fontSize: '15px', width: '100%', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#6e3857', fontWeight: '600' }}>سعر المنتج (ل.س):</label>
              <input
                type="number"
                placeholder="أدخل السعر..."
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ padding: '12px 15px', borderRadius: '10px', border: '1px solid #e8b4cb', fontSize: '15px', width: '100%', outline: 'none' }}
              />
            </div><div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
              <button type="submit" style={{ 
                flex: 1, padding: '14px', backgroundColor: '#b86baf', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px',
                boxShadow: '0 4px 12px rgba(184, 107, 175, 0.3)'
              }}>
                {editId !== null ? 'حفظ التعديلات' : 'إضافة المنتج'}
              </button>
              {editId !== null && (
                <button type="button" onClick={() => { handleCancelEdit(); setCurrentPage('products'); }} style={{ 
                  padding: '14px 22px', backgroundColor: '#f4c2d7', color: '#6e3857', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600'
                }}>
                  إلغاء
                </button>
              )}
            </div>
          </form>
        </div>
      )}
      {currentPage === 'products' && (
        <div>
          <h2 style={{ color: '#6e3857', textAlign: 'center', marginBottom: '25px', fontWeight: '700' }}>📦 قائمة المنتجات المخزنة</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 6px 18px rgba(0, 0, 0, 0.04)' }}>
            <thead>
              <tr style={{ backgroundColor: '#b86baf', color: '#ffffff', textAlign: 'right' }}>
                <th style={{ padding: '15px' }}>الصورة</th>
                <th style={{ padding: '15px' }}>اسم المنتج</th>
                <th style={{ padding: '15px' }}>السعر</th>
                <th style={{ padding: '15px', textAlign: 'center' }}>العمليات</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '35px', color: '#a87a95', fontSize: '16px' }}>
                    لا توجد منتجات مضافة حالياً. انتقل لصفحة الإضافة لبدء إضافة المنتجات!
                  </td>
                </tr>
              ) : (
                products.map((prod) => (
                  <tr key={prod.id} style={{ borderBottom: '1px solid #fcecf2' }}>
                    <td style={{ padding: '12px' }}>
                      <img src={prod.image} alt="" style={{ width: '55px', height: '55px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #f4c2d7' }} />
                    </td>
                    <td style={{ padding: '15px', fontWeight: '600', color: '#444' }}>{prod.name}</td>
                    <td style={{ padding: '15px', color: '#b86baf', fontWeight: 'bold' }}>{prod.price} ل.س</td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <button onClick={() => handleStartEdit(prod)} style={{ backgroundColor: '#f9d6e5', color: '#9c4d87', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', marginLeft: '8px', fontWeight: '600' }}>
                        تعديل
                      </button>
                      <button onClick={() => handleDeleteProduct(prod.id)} style={{ backgroundColor: '#fce4e4', color: '#d9534f', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                        حذف
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {currentPage === 'dashboard' && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h2 style={{ color: '#6e3857', marginBottom: '30px', fontWeight: '700' }}>
            📊 لوحة إحصائيات المخزن</h2>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 6px 18px rgba(0,0,0,0.04)', flex: 1, minWidth: '220px', border: '1px solid #f7d9e5' }}>
              <h4 style={{ color: '#a87a95', marginBottom: '12px', fontSize: '16px' }}>إجمالي عدد المنتجات</h4>
              <p style={{ fontSize: '32px', color: '#b86baf', fontWeight: 'bold' }}>{totalProducts}</p>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 6px 18px rgba(0,0,0,0.04)', flex: 1, minWidth: '220px', border: '1px solid #f7d9e5' }}>
              <h4 style={{ color: '#a87a95', marginBottom: '12px', fontSize: '16px' }}>إجمالي قيمة المخزون</h4>
              <p style={{ fontSize: '32px', color: '#b86baf', fontWeight: 'bold' }}>{totalPrice} ل.س</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;