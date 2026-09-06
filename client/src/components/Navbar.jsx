import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MiniCart from './MiniCart';
import ProfileMini from './ProfileMini';
import ContactUsMini from './ContactUsMini';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
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

  // Close mobile menu on page navigation
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileSearchOpen(false);
    setShowDropdown(false);
  }, [location.pathname]);

  const filteredProducts = searchQuery.trim()
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()))
    : [];

  const handleProductClick = (id) => {
    setShowDropdown(false);
    setSearchQuery('');
    setIsMobileSearchOpen(false);
    setIsMenuOpen(false);
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

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Shop Location', path: '/shop-location' },
    { label: 'Track Order', path: '/track' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-cream shadow-sm relative z-40">
      {/* Top Header Row */}
      <div className="py-3 sm:py-4 px-3 sm:px-8 flex justify-between items-center w-full">
        {/* Left Side: Mobile Hamburger Menu & Logo & Desktop Nav */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          {/* Hamburger Menu Button (Mobile & Tablet) */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden bg-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-black hover:text-[#004D3D] shadow-sm transition-colors focus:outline-none"
            aria-label="Open Navigation Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/assets/logo.jpg" alt="Happitex Logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-full shadow-sm" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex gap-6 xl:gap-8 font-poppins font-semibold text-[15px] xl:text-[16px] tracking-wide ml-2 xl:ml-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`transition-colors py-1 ${
                  isActive(link.path) 
                    ? 'text-[#004D3D] border-b-2 border-[#004D3D] font-bold' 
                    : 'text-black hover:text-[#004D3D]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section: Search & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4 relative">
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
                        src={product.images && product.images.length > 0 ? product.images[0] : '/assets/sample-product.jpg'} 
                        alt={product.name} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/sample-product.jpg';
                        }}
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
          className="xl:hidden w-full px-3 sm:px-6 pt-2 pb-3 border-t border-gray-200/80 relative bg-cream animate-fadeIn"
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
                      src={product.images && product.images.length > 0 ? product.images[0] : '/assets/sample-product.jpg'} 
                      alt={product.name} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/sample-product.jpg';
                      }}
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

      {/* Mobile Horizontal Sub-Navigation Strip (Visible on Phone/Tablet) */}
      <div className="lg:hidden flex items-center justify-between px-3 sm:px-6 py-2 border-t border-gray-200/70 bg-[#F7F4EE] text-[13px] font-poppins font-semibold overflow-x-auto scrollbar-none shadow-inner">
        {navLinks.map((link) => {
          const active = isActive(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all text-center flex-1 mx-0.5 ${
                active 
                  ? 'bg-[#004D3D] text-white shadow-sm font-bold' 
                  : 'text-gray-700 hover:bg-white hover:text-[#004D3D]'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Mobile Sidebar Navigation Drawer (Slide from Left) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fadeIn"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-[280px] sm:w-[320px] max-w-[85vw] bg-cream h-full shadow-2xl flex flex-col justify-between z-50 p-5 overflow-y-auto">
            <div>
              {/* Drawer Top Header: Logo + Brand + Close Button */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <div className="flex items-center gap-3">
                  <img src="/assets/logo.jpg" alt="Happitex Logo" className="h-10 w-10 object-contain rounded-full shadow-sm" />
                  <div>
                    <h3 className="font-great-vibes text-2xl text-black font-bold leading-none">Happitex</h3>
                    <p className="text-[10px] font-poppins text-gray-600 font-semibold">Online Gift Shop</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-black shadow-sm"
                  aria-label="Close Menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Main Navigation Links List */}
              <div className="flex flex-col gap-2 mt-5">
                <p className="text-[11px] uppercase font-poppins font-bold text-gray-500 tracking-wider px-3 mb-1">
                  Menu
                </p>

                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-poppins font-semibold transition-colors ${
                        active 
                          ? 'bg-[#004D3D] text-white shadow-sm' 
                          : 'text-gray-800 hover:bg-white/80 hover:text-[#004D3D]'
                      }`}
                    >
                      {link.label === 'Home' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      )}
                      {link.label === 'Products' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      )}
                      {link.label === 'Shop Location' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                      {link.label === 'Track Order' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                        </svg>
                      )}
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Secondary Actions in Drawer */}
              <div className="mt-6 pt-4 border-t border-gray-300 flex flex-col gap-2">
                <p className="text-[11px] uppercase font-poppins font-bold text-gray-500 tracking-wider px-3 mb-1">
                  Account & Support
                </p>

                {user ? (
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-poppins font-medium text-gray-800 hover:bg-white/80 transition-colors"
                  >
                    <svg className="w-4 h-4 text-[#004D3D]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <span>My Profile ({user.name || user.phone})</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-poppins font-medium text-gray-800 hover:bg-white/80 transition-colors"
                  >
                    <svg className="w-4 h-4 text-[#004D3D]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Login / Register</span>
                  </Link>
                )}

                {user && user.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-poppins font-semibold text-[#004D3D] bg-emerald-50 hover:bg-emerald-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Admin Dashboard</span>
                  </Link>
                )}

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsContactOpen(true);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-poppins font-medium text-gray-800 hover:bg-white/80 transition-colors text-left"
                >
                  <svg className="w-4 h-4 text-[#AA8F56]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Contact Information</span>
                </button>
              </div>
            </div>

            {/* Drawer Bottom Support Info */}
            <div className="pt-4 border-t border-gray-300">
              <a 
                href="https://wa.me/8801944888849" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 px-4 rounded-xl text-xs font-poppins font-semibold shadow-sm hover:opacity-95 transition-opacity"
              >
                <span>WhatsApp Support: +8801944888849</span>
              </a>
              <p className="text-center text-[10px] text-gray-500 font-poppins mt-2">
                Happitex © 2026. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
