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
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const mobileInputRef = useRef(null);

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
      if (
        mobileSearchRef.current && 
        !mobileSearchRef.current.contains(event.target) && 
        !event.target.closest('[data-mobile-search-toggle]')
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = searchQuery.trim()
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()))
    : [];

  const handleProductClick = (id) => {
    setShowDropdown(false);
    setSearchQuery('');
    setIsMobileSearchOpen(false);
    navigate(`/products/${id}`);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      if (filteredProducts.length === 1) {
        handleProductClick(filteredProducts[0]._id);
      } else {
        setShowDropdown(false);
        setIsMobileSearchOpen(false);
        navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(prev => {
      const nextState = !prev;
      if (nextState) {
        setTimeout(() => mobileInputRef.current?.focus(), 100);
      }
      return nextState;
    });
  };

  return (
    <nav className="bg-cream py-3 sm:py-4 px-4 sm:px-8 flex flex-col shadow-sm relative z-40">
      <div className="flex justify-between items-center w-full">
        {/* Logo & Desktop Nav Links */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link to="/" className="flex items-center">
            <img src="/assets/logo.jpg" alt="Happitex Logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-full shadow-sm" />
          </Link>
          <div className="hidden lg:flex gap-8 font-poppins font-semibold text-black text-[16px] tracking-wide ml-4">
            <Link to="/" className="hover:text-[#004D3D] transition-colors">Home</Link>
            <Link to="/products" className="hover:text-[#004D3D] transition-colors">Products</Link>
            <Link to="/shop-location" className="hover:text-[#004D3D] transition-colors">Shop Location</Link>
            <Link to="/track" className="hover:text-[#004D3D] transition-colors">Track Order</Link>
          </div>
        </div>

        {/* Right Section: Search & Actions */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-5 relative">
          {/* Desktop Search Bar (xl+) */}
          <div className="relative hidden xl:block" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="absolute left-3.5 text-gray-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search your favorite sarees" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                className="border border-black rounded-full py-2 pl-10 pr-24 text-xs w-[320px] focus:outline-none font-poppins text-black placeholder-gray-400 bg-transparent shadow-sm"
              />
              {searchQuery && (
                <button 
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-20 text-gray-400 hover:text-gray-600 p-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button 
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-[#004D3D] text-white text-sm px-5 rounded-full font-poppins font-medium hover:bg-opacity-90 flex items-center justify-center transition-all">
                Search
              </button>
            </form>

            {/* Desktop Search Dropdown */}
            {showDropdown && searchQuery.trim() && (
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
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-sm font-semibold text-gray-800 truncate">{product.name}</span>
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

          {/* Search Icon Button (Mobile & Tablet) */}
          <div className="relative xl:hidden">
            <button 
              data-mobile-search-toggle="true"
              onClick={toggleMobileSearch}
              className={`bg-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-sm transition-all ${
                isMobileSearchOpen ? 'text-[#004D3D] ring-2 ring-[#004D3D]' : 'text-black hover:text-[#004D3D]'
              }`}
              aria-label="Search"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Profile Icon */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)} 
              className={`bg-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-sm ${
                user && user.role !== 'admin' ? 'text-[#004D3D] ring-2 ring-[#004D3D]' : 'text-black ring-2 ring-transparent'
              } hover:text-[#004D3D] transition-colors`}
              aria-label="Profile"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </button>
            <ProfileMini isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
          </div>

          {/* Cart Icon */}
          <div className="relative">
            <button 
              id="nav-cart-icon" 
              onClick={() => setIsCartOpen(!isCartOpen)} 
              className="bg-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-black hover:text-[#004D3D] shadow-sm transition-colors"
              aria-label="Cart"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
            <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          </div>

          {/* Contact Us Button */}
          <div className="relative">
            <button 
              onClick={() => setIsContactOpen(!isContactOpen)}
              className="bg-[#AA8F56] text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-poppins font-medium hover:bg-opacity-90 transition-all shadow-sm whitespace-nowrap">
              Contact Us
            </button>
            <ContactUsMini isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
          </div>
        </div>
      </div>

      {/* Mobile Search Bar Drawer (Visible when toggled on mobile/tablet) */}
      {isMobileSearchOpen && (
        <div 
          ref={mobileSearchRef} 
          className="xl:hidden w-full pt-3 pb-1 border-t border-gray-200/80 mt-3 relative"
        >
          <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full max-w-xl mx-auto">
            <div className="absolute left-3.5 text-gray-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              ref={mobileInputRef}
              type="text" 
              placeholder="Search your favorite sarees..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="w-full border border-black rounded-full py-2 pl-10 pr-24 text-xs focus:outline-none font-poppins text-black placeholder-gray-400 bg-white shadow-inner"
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-20 text-gray-400 hover:text-gray-600 p-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button 
              type="submit"
              className="absolute right-1 top-1 bottom-1 bg-[#004D3D] text-white text-xs px-4 rounded-full font-poppins font-medium hover:bg-opacity-90 flex items-center justify-center transition-all">
              Search
            </button>
          </form>

          {/* Mobile Search Results Dropdown */}
          {showDropdown && searchQuery.trim() && (
            <div className="w-full max-w-xl mx-auto mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-[280px] overflow-y-auto">
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
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-xs sm:text-sm font-semibold text-gray-800 truncate">{product.name}</span>
                      <span className="text-xs font-bold text-red-600">{product.price} BDT</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs sm:text-sm text-gray-500">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
