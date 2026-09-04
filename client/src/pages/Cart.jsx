import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, updateQty, removeFromCart, subtotal } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="bg-cream min-h-screen py-10 font-poppins relative">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
            <p className="text-xl text-gray-600 mb-6">Your cart is currently empty.</p>
            <Link to="/products" className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-opacity-90">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-[40px] shadow-sm p-6 md:p-10 border border-gray-200">
              {cartItems.map((item, idx) => (
                <div key={item.product._id} className={`flex flex-col sm:flex-row items-center gap-6 py-6 ${idx !== cartItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <img src={item.product.images[0] || '/assets/sample-product.jpg'} alt={item.product.name} className="w-24 h-32 object-cover rounded-xl shadow-sm" />
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-bold text-gray-800">{item.product.name}</h3>
                    <p className="text-red-500 font-bold mt-2">{item.product.price} BDT</p>
                  </div>

                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center">
                      <button onClick={() => updateQty(item.product._id, item.qty - 1)} className="bg-primary text-white px-4 py-1.5 text-xl font-bold rounded-l-md hover:bg-opacity-90">-</button>
                      <span className="px-6 py-1.5 text-lg border-y border-gray-400 bg-white font-semibold">{item.qty}</span>
                      <button onClick={() => updateQty(item.product._id, item.qty + 1)} className="bg-primary text-white px-4 py-1.5 text-xl font-bold rounded-r-md hover:bg-opacity-90">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.product._id)} className="text-sm text-red-500 hover:underline font-semibold">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm self-end w-full md:w-80">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-800">Subtotal:</span>
                <span className="text-xl font-bold text-red-500">{subtotal} BDT</span>
              </div>
              <button onClick={() => navigate('/checkout')} className="w-full bg-primary text-white font-bold py-3 rounded-full hover:bg-opacity-90 shadow-md">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
