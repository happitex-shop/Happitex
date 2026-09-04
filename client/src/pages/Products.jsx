import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get('/api/products'),
          axios.get('/api/categories')
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory || p.category?._id === selectedCategory) 
    : products;

  return (
    <div className="bg-cream min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-xl md:text-2xl font-bold text-primary mb-6 font-poppins">
          {selectedCategory ? 'আপনার নির্বাচিত শাড়ি' : 'আপনার পছন্দের শাড়িটি বেছে নিন,'}
        </h2>

        {/* Category Pills */}
        {categories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${
                selectedCategory === null
                  ? 'bg-[#004D3D] text-white'
                  : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(selectedCategory === cat._id ? null : cat._id)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${
                  selectedCategory === cat._id
                    ? 'bg-[#004D3D] text-white'
                    : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10 font-bold text-lg">
              No products found in this category.
            </div>
          ) : (
            filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
