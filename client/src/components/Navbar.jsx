import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MiniCart from './MiniCart';
import ProfileMini from './ProfileMini';
import ContactUsMini from './ContactUsMini';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products for search', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = searchQuery
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleProductClick = (id) => {
    setShowDropdown(false);
    setSearchQuery('');
    navigate(`/products/${id}`);
  };

  return (
    <nav className="bg-cream py-4 px-8 flex justify-between items-center shadow-sm relative">
      <div className="flex items-center gap-6">
        <Link to="/">
          <img src="/assets/logo.jpg" alt="Happitex Logo" className="h-12 w-12 object-contain rounded-full" />
        </Link>
        <div className="hidden lg:flex gap-8 font-poppins font-semibold text-black text-[16px] tracking-wide ml-4">
          <Link to="/" className="hover:text-[#004D3D]">Home</Link>
          <Link to="/products" className="hover:text-[#004D3D]">Products</Link>
          <Link to="/shop-location" className="hover:text-[#004D3D]">Shop Location</Link>
          <Link to="/track" className="hover:text-[#004D3D]">Track Order</Link>
        </div>
      </div>

      <div className="flex items-center gap-5 relative">
        {/* Search Bar */}
        <div className="relative hidden xl:block" ref={searchRef}>
          <input 
            type="text" 
            placeholder="Search your favorite sarees" 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="border border-black rounded-full py-2 pl-6 pr-24 text-xs w-[320px] focus:outline-none font-poppins text-black placeholder-gray-400 bg-transparent"
          />
          <button className="absolute right-1 top-1 bottom-1 bg-[#004D3D] text-white text-sm px-6 rounded-full font-poppins font-medium hover:bg-opacity-90">
            Search
          </button>

          {/* Search Dropdown */}
          {showDropdown && searchQuery && (
            <div className="absolute top-full mt-2 w-[320px] bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-[300px] overflow-y-auto">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div 
                    key={product._id} 
                    onClick={() => handleProductClick(product._id)}
                    className="flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <img 
                      src={product.images && product.images.length > 0 ? product.images[0] : ''} 
                      alt={product.name} 
                      className="w-12 h-12 object-cover rounded-md bg-[#FAF6F0]"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</span>
                      <span className="text-xs font-bold text-red-600">{product.price} BDT</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Icons */}
        <div className="relative">
          <button onClick={() => setIsProfileOpen(!isProfileOpen)} className={`bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${user && user.role !== 'admin' ? 'text-[#004D3D] border-2 border-[#004D3D]' : 'text-black border-2 border-transparent'} hover:text-[#004D3D]`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </button>
          <ProfileMini isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        </div>
        <div className="relative">
          <button id="nav-cart-icon" onClick={() => setIsCartOpen(!isCartOpen)} className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-black hover:text-[#004D3D] shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </button>
          <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>

        {/* Contact Us Button */}
        <div className="relative">
          <button 
            onClick={() => setIsContactOpen(!isContactOpen)}
            className="bg-[#AA8F56] text-white px-6 py-2 rounded-full text-sm font-poppins font-medium hover:bg-opacity-90 ml-2">
            Contact Us
          </button>
          <ContactUsMini isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
