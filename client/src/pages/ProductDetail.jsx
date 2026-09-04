import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { flyToCart } from '../utils/flyToCart';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [settings, setSettings] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: prodData } = await axios.get(`/api/products/${id}`);
        setProduct(prodData);
        const { data: setData } = await axios.get('/api/settings');
        setSettings(setData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = (e) => {
    addToCart(product);
    flyToCart(e, product.images && product.images.length > 0 ? product.images[0] : '');
  };

  const handleOrderNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  if (!product) return <div className="min-h-screen flex justify-center items-center font-poppins">Loading...</div>;

  return (
    <div className="bg-cream min-h-[calc(100vh-80px)] font-poppins relative">
      <h2 className="text-center text-xl md:text-2xl font-bold text-primary py-6 bg-white shadow-sm z-10 relative">
        আপনার পছন্দের শাড়িটি অর্ডার করুন,
      </h2>
      
      <div 
        className="w-full h-full absolute inset-0 opacity-40 z-0 top-[76px]" 
        style={{ 
          backgroundImage: "url('/assets/bg-customer.png')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-12 relative z-10">
        {/* Left Image (Arched) */}
        <div className="md:w-5/12 flex justify-center">
          <div className="w-full max-w-md overflow-hidden rounded-t-[120px] rounded-b-[40px] shadow-sm bg-gray-100" style={{ aspectRatio: '4/5' }}>
            <img 
              src={product.images?.[0] || product.image || ''} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* Right Info */}
        <div className="md:w-7/12 flex flex-col gap-5 justify-center">
          {/* Title Pill */}
          <div className="bg-transparent px-8 py-4 rounded-[40px] border border-gray-400 text-center md:text-left">
            <h1 className="text-[17px] font-bold text-gray-900">{product.name}</h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Price Pill */}
            <div className="flex-1 bg-transparent px-6 py-3 rounded-[30px] border border-gray-400 text-center">
              <span className="text-red-600 font-bold">Price : {product.price} BDT</span>
            </div>
            {/* Category Pill */}
            <div className="flex-1 bg-transparent px-6 py-3 rounded-[30px] border border-gray-400 text-center">
              <span className="font-semibold text-gray-800">Category : {product.category?.name || 'Katan'}</span>
            </div>
          </div>

          {/* Description Box */}
          <div className="bg-[#FAF6F0] px-8 py-8 rounded-[30px] border border-gray-400 mt-2 min-h-[220px]">
            <p className="text-gray-900 text-lg leading-loose whitespace-pre-line font-bold">
              {product.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button onClick={handleOrderNow} className="flex-1 bg-[#004D3D] text-white py-4 rounded-xl font-medium hover:bg-opacity-90 shadow-sm">
              Go to checkout
            </button>
            <button onClick={handleAddToCart} className="flex-1 bg-[#AA8F56] text-white py-4 rounded-xl font-medium hover:bg-opacity-90 shadow-sm">
              Add to cart
            </button>
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button 
              onClick={() => window.open(`https://wa.me/${(settings?.whatsappNumber || '').replace(/[^0-9]/g, '')}`, '_blank')}
              className="flex-1 bg-[#111827] text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-3 hover:bg-black shadow-md transition-colors"
            >
              <svg className="w-5 h-5 text-[#25D366] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.122.553 4.195 1.602 6.012l-1.637 5.96 6.096-1.599A11.96 11.96 0 0012.031 24c6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm3.645 17.202c-.156.438-.9 .842-1.258.874-.359.032-.782.16-2.483-.541-2.091-.861-3.419-2.996-3.523-3.136-.104-.141-2.035-2.613-.199-4.708.41-.466.892-.582 1.189-.582.302 0 .604.015.864.032.274.016.643-.105.998.756.37.915 1.258 3.082 1.368 3.305.109.223.187.484.032.793-.156.313-.234.5-.468.782-.234.281-.497.609-.703.829-.234.25-.483.515-.208.984.275.469 1.226 2.022 2.64 3.284 1.819 1.625 3.34 2.125 3.808 2.343.468.219.742.188 1.015-.125.273-.312 1.187-1.375 1.5-1.844.312-.469.625-.391 1.047-.234.422.156 2.671 1.266 3.125 1.484.453.219.754.344.863.532.109.188.109 1.109-.047 1.547z"/>
              </svg>
              <span className="font-semibold">
                {settings?.whatsappNumber 
                  ? (settings.whatsappNumber.startsWith('+') ? settings.whatsappNumber : `+${settings.whatsappNumber}`) 
                  : '+880 1830-439602'}
              </span>
            </button>
            <button 
              onClick={() => window.open(settings?.facebookLink || '#', '_blank')}
              className="flex-1 bg-[#1E3A8A] text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-3 hover:bg-[#172554] shadow-md transition-colors"
            >
              <svg className="w-5 h-5 text-[#60A5FA] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="font-semibold">{settings?.facebookPageName || settings?.facebookName || 'Happitex'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
