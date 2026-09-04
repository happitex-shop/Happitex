import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const MiniCart = ({ isOpen, onClose }) => {
  const { cartItems, updateQty, subtotal } = useContext(CartContext);

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 w-80 bg-cream shadow-xl z-50 border border-gray-200 mt-2 rounded-md overflow-hidden font-poppins">
      <div className="bg-primary text-white text-center py-3 font-bold text-lg relative">
        Your Cart
        <button onClick={onClose} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl">&times;</button>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {cartItems.length === 0 ? (
          <p className="text-center py-8 text-gray-500">Cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.product._id} className="flex gap-4 p-4 border-b border-gray-300">
              <img src={item.product.images[0] || '/assets/sample-product.jpg'} alt={item.product.name} className="w-20 h-24 object-cover rounded-md" />
              <div className="flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-gray-800 line-clamp-2">{item.product.name}</h4>
                  <p className="text-xs text-red-500 font-bold mt-1">BDT : {item.product.price}</p>
                </div>
                {/* Stepper */}
                <div className="flex items-center mt-2">
                  <button onClick={() => updateQty(item.product._id, item.qty - 1)} className="bg-primary text-white px-2 py-0.5 text-lg font-bold rounded-l-md leading-none">-</button>
                  <span className="px-4 py-0.5 text-xs border-y border-gray-400 bg-white">{item.qty}</span>
                  <button onClick={() => updateQty(item.product._id, item.qty + 1)} className="bg-primary text-white px-2 py-0.5 text-lg font-bold rounded-r-md leading-none">+</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-4 bg-cream">
          <div className="flex justify-between items-center mb-4 font-bold">
            <span className="text-gray-800">Total :</span>
            <span className="text-red-500">BDT {subtotal}</span>
          </div>
          <Link to="/cart" onClick={onClose} className="block w-full text-center bg-white border border-gray-300 text-gray-800 font-bold py-2 rounded-full mb-3 hover:bg-gray-50">
            See cart
          </Link>
          <Link to="/checkout" onClick={onClose} className="block w-full text-center bg-primary text-white font-bold py-2 rounded-full hover:bg-opacity-90">
            Go to checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default MiniCart;
