import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const MiniCart = ({ isOpen, onClose }) => {
  const { cartItems, updateQty, subtotal } = useContext(CartContext);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:block sm:inset-auto sm:absolute sm:top-full sm:right-0 sm:mt-2">
      {/* Backdrop (mobile full backdrop & desktop click-outside dismiss) */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs sm:bg-transparent sm:backdrop-blur-none"
        onClick={onClose} 
      />

      {/* Cart Modal / Dropdown Box */}
      <div className="relative z-10 w-[92vw] max-w-[360px] sm:w-80 bg-cream shadow-2xl sm:shadow-xl border border-gray-200 rounded-2xl sm:rounded-xl overflow-hidden font-poppins animate-fadeIn">
        <div className="bg-[#004D3D] text-white py-3.5 px-4 font-bold text-base sm:text-lg flex justify-between items-center">
          <span className="flex-1 text-center">Your Cart</span>
          <button 
            onClick={onClose} 
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg transition-colors"
            aria-label="Close Cart"
          >
            &times;
          </button>
        </div>

        <div className="max-h-[50vh] sm:max-h-80 overflow-y-auto p-1">
          {cartItems.length === 0 ? (
            <div className="text-center py-10 px-4">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-gray-500 font-medium text-sm">Cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.product._id} className="flex gap-3 p-3 border-b border-gray-200/80 bg-white/60 rounded-lg m-1.5 shadow-2xs">
                <img 
                  src={item.product.images && item.product.images[0] ? item.product.images[0] : '/assets/sample-product.jpg'} 
                  alt={item.product.name} 
                  className="w-16 h-20 sm:w-18 sm:h-22 object-cover rounded-md bg-[#FAF6F0] flex-shrink-0" 
                />
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">{item.product.name}</h4>
                    <p className="text-xs sm:text-sm text-red-600 font-bold mt-1">BDT {item.product.price}</p>
                  </div>
                  {/* Stepper */}
                  <div className="flex items-center mt-2">
                    <button 
                      onClick={() => updateQty(item.product._id, item.qty - 1)} 
                      className="bg-[#004D3D] text-white w-6 h-6 flex items-center justify-center text-sm font-bold rounded-l-md hover:bg-opacity-90 active:scale-95 transition-all"
                    >
                      -
                    </button>
                    <span className="w-8 text-center py-0.5 text-xs font-semibold border-y border-gray-300 bg-white">{item.qty}</span>
                    <button 
                      onClick={() => updateQty(item.product._id, item.qty + 1)} 
                      className="bg-[#004D3D] text-white w-6 h-6 flex items-center justify-center text-sm font-bold rounded-r-md hover:bg-opacity-90 active:scale-95 transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 bg-[#FAF6F0] border-t border-gray-200">
            <div className="flex justify-between items-center mb-3 font-bold text-sm sm:text-base">
              <span className="text-gray-800">Total :</span>
              <span className="text-red-600">BDT {subtotal}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Link 
                to="/cart" 
                onClick={onClose} 
                className="block w-full text-center bg-white border border-gray-300 text-gray-800 font-bold py-2 sm:py-2.5 rounded-full text-xs sm:text-sm hover:bg-gray-50 shadow-xs transition-colors"
              >
                See cart
              </Link>
              <Link 
                to="/checkout" 
                onClick={onClose} 
                className="block w-full text-center bg-[#004D3D] text-white font-bold py-2 sm:py-2.5 rounded-full text-xs sm:text-sm hover:bg-opacity-90 shadow-sm transition-colors"
              >
                Go to checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniCart;
