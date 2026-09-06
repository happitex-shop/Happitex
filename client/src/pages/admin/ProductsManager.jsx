import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [deliveryCharge, setDeliveryCharge] = useState(120);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/api/categories');
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1000;
          const MAX_HEIGHT = 1400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              resolve(blob || file);
            },
            'image/jpeg',
            0.85
          );
        };
        img.onerror = () => resolve(file);
      };
      reader.onerror = () => resolve(file);
    });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    try {
      const compressedBlob = await compressImage(file);
      const formData = new FormData();
      formData.append('image', compressedBlob, file.name);

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data.image);
      setUploading(false);
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Failed to upload image. Please try again.');
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !price || !category || (!image && !editingId)) {
      alert("Please fill all required fields");
      return;
    }
    
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      
      if (editingId) {
        await axios.put(`/api/products/${editingId}`, {
          name, price, category, description, image, deliveryCharge
        }, config);
        alert("Product updated successfully!");
      } else {
        await axios.post('/api/products', {
          name, price, category, description, image, deliveryCharge
        }, config);
        alert("Product added successfully!");
      }
      
      // Reset form & fetch
      setName('');
      setPrice('');
      setCategory('');
      setCategoryName('');
      setDescription('');
      setImage('');
      setDeliveryCharge(120);
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert(error.response?.data?.message || 'Error saving product');
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    const cat = categories.find(c => c._id === product.category);
    setCategoryName(cat ? cat.name : '');
    setDescription(product.description);
    setImage(product.images?.[0] || '');
    setDeliveryCharge(product.deliveryCharge || 120);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`/api/products/${id}`, config);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const createCategoryHandler = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newCategoryName || !newCategoryName.trim()) {
      alert('Please enter a category name');
      return;
    }
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      const { data } = await axios.post('/api/categories', { name: newCategoryName.trim() }, config);
      setCategories(prev => [...prev, data]);
      setCategory(data._id);
      setCategoryName(data.name);
      setNewCategoryName('');
      setShowCategoryModal(false);
    } catch (error) {
      console.error('Error creating category:', error);
      alert(error.response?.data?.message || 'Error creating category');
    }
  };

  const deleteCategoryHandler = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`/api/categories/${id}`, config);
        setCategories(categories.filter(c => c._id !== id));
        if (category === id) {
          setCategory('');
          setCategoryName('');
        }
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl border border-gray-400 rounded-[40px] py-6 px-10 bg-white mb-10 shadow-sm text-center">
        <h2 className="text-3xl font-extrabold text-black">All the Products will be managed here</h2>
      </div>

      {/* Add Product Form */}
      <form onSubmit={submitHandler} className="w-full max-w-5xl bg-white border border-gray-400 rounded-3xl p-8 mb-12 shadow-sm flex flex-col md:flex-row gap-8 relative">
        
        {/* Left Side - Image Upload */}
        <div className="flex flex-col items-center gap-4 w-full md:w-1/3">
          <div className="w-52 h-72 bg-white border-2 border-dashed border-gray-300 flex items-center justify-center rounded-2xl relative overflow-hidden shadow-inner">
            {image ? (
              <img 
                src={image} 
                alt="Preview" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/sample-product.jpg';
                }}
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="text-center px-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="mt-2 text-sm text-gray-800 font-bold">Standard Size</p>
                <p className="text-xs text-gray-500 font-semibold mt-0.5">800 × 1200 px</p>
                <p className="text-[11px] text-gray-400 mt-1">(Any size will auto-fit)</p>
              </div>
            )}
            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={uploadFileHandler} />
          </div>
          {uploading && <p className="text-sm font-semibold text-primary animate-pulse">Uploading image...</p>}
          <label className="bg-[#004D3D] text-white font-bold py-2.5 px-8 rounded-full hover:bg-opacity-90 cursor-pointer text-sm shadow-sm transition-all">
            Upload Image
            <input type="file" className="hidden" onChange={uploadFileHandler} />
          </label>
        </div>

        {/* Right Side - Form Fields */}
        <div className="flex-1 flex flex-col gap-4">
          
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-bold text-black ml-1">Product name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-400 rounded-lg px-4 py-2 outline-none focus:border-black w-full"
              required
            />
          </div>

          <div className="flex items-end gap-6 w-full mt-2">
            <div className="flex flex-col gap-1 w-1/2 relative">
              <label className="text-sm font-bold text-black ml-1">Product Price</label>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border border-gray-400 rounded-lg px-4 pt-2 pb-6 outline-none focus:border-black w-full"
                required
              />
              <span className="absolute right-3 bottom-1 text-red-600 font-bold text-sm">BDT</span>
            </div>
            
            <div className="w-1/2">
               <button 
                 type="button"
                 onClick={() => setShowCategoryModal(true)}
                 className="bg-[#F2B67C] text-black font-bold text-sm py-2 px-6 rounded-lg shadow-sm w-full hover:bg-[#F4C393] h-[45px]"
               >
                 {categoryName ? categoryName : 'Add Category'}
               </button>
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full mt-2">
            <label className="text-sm font-bold text-black ml-1">Product Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-400 rounded-lg px-4 py-3 outline-none focus:border-black resize-none h-[150px] w-full"
            ></textarea>
          </div>
          
          <div className="flex justify-end items-end gap-4 mt-2">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-black ml-1 mb-1 hidden">Delivery Charge</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={deliveryCharge}
                  onChange={(e) => setDeliveryCharge(e.target.value)}
                  className="border border-gray-400 rounded-lg px-4 py-2 outline-none focus:border-black w-[150px]"
                  placeholder="Delivery Charge"
                  required
                />
                <span className="absolute right-3 top-2 text-red-600 font-bold text-sm">BDT</span>
              </div>
            </div>
            
            <button type="submit" className="bg-[#004D3D] text-white font-bold py-2 px-8 rounded-lg hover:bg-opacity-90 transition-all">
              {editingId ? 'Confirm' : 'Add'}
            </button>
          </div>
        </div>
        
        {/* Category Popover */}
        {showCategoryModal && (
          <div className="absolute top-[120px] right-[40px] w-[280px] bg-white border border-gray-300 shadow-xl rounded-lg z-50 overflow-hidden flex flex-col">
            <div className="bg-[#004D3D] text-white text-center py-2 font-bold text-sm flex justify-between px-4 items-center">
              <span>Categories</span>
              <button type="button" onClick={() => setShowCategoryModal(false)} className="text-white hover:text-gray-200">
                ✕
              </button>
            </div>
            <div className="max-h-[200px] overflow-y-auto">
              {categories.map(cat => (
                <div 
                  key={cat._id} 
                  className="flex items-center justify-between py-2 px-3 border-b border-gray-200 hover:bg-gray-100"
                >
                  <div 
                    onClick={() => { setCategory(cat._id); setCategoryName(cat.name); setShowCategoryModal(false); }}
                    className="flex-1 cursor-pointer font-bold text-sm truncate"
                  >
                    {cat.name}
                  </div>
                  <button 
                    type="button" 
                    onClick={(e) => deleteCategoryHandler(cat._id, e)} 
                    className="text-xs bg-red-500 text-white px-2 py-1 rounded ml-2 font-bold hover:bg-red-600 shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="p-2 border-t border-gray-200 flex gap-2">
              <input 
                type="text" 
                placeholder="Type Category Name" 
                value={newCategoryName}
                onChange={(e)=>setNewCategoryName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    createCategoryHandler(e);
                  }
                }}
                className="w-full font-bold text-sm py-1 px-2 border rounded outline-none text-gray-700 placeholder-gray-400"
              />
              <button type="button" onClick={createCategoryHandler} className="bg-[#004D3D] text-white px-3 py-1 rounded font-bold text-sm hover:bg-opacity-90">Add</button>
            </div>
          </div>
        )}
      </form>

      {/* Product Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {loading ? (
          <div>Loading products...</div>
        ) : products.map(product => (
          <div key={product._id} className="flex flex-col bg-[#FAF6F0] rounded-t-[160px] rounded-b-[40px] shadow-sm pb-6">
            <div className="h-[420px] w-full mb-4">
              <img 
                src={product.images && product.images.length > 0 ? product.images[0] : '/assets/sample-product.jpg'} 
                alt={product.name} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/sample-product.jpg';
                }}
                className="w-full h-full object-cover rounded-t-[160px]" 
              />
            </div>
            <p className="text-center font-bold text-sm mb-4 px-4">{product.name}</p>
            <div className="flex justify-center gap-6">
              <button onClick={() => handleEdit(product)} className="bg-[#004D3D] text-white text-xs font-bold py-2 px-8 rounded-full hover:bg-opacity-90 shadow-sm transition-all">
                Edit
              </button>
              <button onClick={() => deleteHandler(product._id)} className="bg-red-600 text-white text-xs font-bold py-2 px-8 rounded-full hover:bg-red-700 shadow-sm transition-all">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsManager;
