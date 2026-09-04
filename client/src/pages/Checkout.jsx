import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Checkout = () => {
  const { cartItems, updateQty, subtotal, clearCart } = useContext(CartContext);
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (cartItems.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % cartItems.length);
      }, 3000); // 3 seconds delay for slide
      return () => clearInterval(interval);
    }
  }, [cartItems.length]);

  // Get the maximum delivery charge among all items in cart, defaulting to 120 for older products
  const deliveryCharge = cartItems.length > 0 
    ? Math.max(...cartItems.map(item => item.deliveryCharge || 120))
    : 120;
  
  const total = subtotal + deliveryCharge;

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(cartItems.length === 0) return alert('Cart is empty');

    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.product.name,
          qty: item.qty,
          image: item.product?.images?.[0] || item.product?.image || '',
          price: item.product.price,
          product: item.product._id
        })),
        shippingAddress: {
          address: formData.address
        },
        paymentMethod: 'Cash on delivery',
        itemsPrice: subtotal,
        shippingPrice: deliveryCharge,
        totalPrice: total,
        customerName: formData.name,
        customerPhone: formData.phone,
        note: formData.note,
        userId: user && user.role !== 'admin' ? user._id : undefined
      };

      // POST to API
      await axios.post('/api/orders', orderData);
      
      // Auto login if not logged in (since we created their account or they already have one)
      if (!user) {
        try {
          await login(formData.phone, formData.phone);
        } catch (loginErr) {
          console.error('Auto login failed:', loginErr);
        }
      }

      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error(error);
      alert('Order failed');
    }
  };

  return (
    <div className="bg-cream min-h-screen font-poppins relative pb-16">
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

      <div className="max-w-6xl mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Left Side: Order Summary slider */}
        <div className="md:w-5/12 flex flex-col gap-6">
          <div className="relative h-[460px] overflow-hidden rounded-[40px]">
            {cartItems.map((item, index) => (
              <div 
                key={item.product._id} 
                className={`absolute inset-0 bg-[#FAF6F0] rounded-[50px] shadow-sm border border-gray-400 flex flex-col items-center pb-8 transition-all duration-700 transform ${
                  index === currentSlide ? 'opacity-100 translate-x-0 relative' : 'opacity-0 translate-x-full absolute pointer-events-none'
                }`}
              >
                <img 
                  src={item.product?.images?.[0] || item.product?.image || ''} 
                  alt={item.product.name} 
                  className="w-full h-[320px] object-cover rounded-[50px] mb-4 bg-gray-200" 
                />
                <h4 className="text-center text-[15px] font-bold text-gray-900 mb-3 px-4 leading-tight whitespace-pre-wrap">{item.product.name.replace('(', '\n(')}</h4>
                <div className="flex items-center z-10 relative mb-4">
                  <button type="button" onClick={(e) => { e.preventDefault(); updateQty(item.product._id, item.qty - 1); }} className="bg-[#004D3D] text-white w-10 h-7 flex items-center justify-center text-xl font-bold rounded-l-[8px] leading-none pb-1">-</button>
                  <span className="w-10 h-7 flex items-center justify-center text-sm bg-white font-bold border-y border-gray-400">{item.qty}</span>
                  <button type="button" onClick={(e) => { e.preventDefault(); updateQty(item.product._id, item.qty + 1); }} className="bg-[#004D3D] text-white w-10 h-7 flex items-center justify-center text-xl font-bold rounded-r-[8px] leading-none pb-1">+</button>
                </div>
              </div>
            ))}

            {/* Dots */}
            {cartItems.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex gap-2 justify-center z-10">
                {cartItems.map((_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full border-2 border-gray-400 transition-colors ${i === currentSlide ? 'bg-gray-300' : 'bg-transparent'}`}></div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-[30px] p-6 border border-gray-400 shadow-sm flex flex-col gap-4 mt-6">
            <div className="flex justify-between text-sm font-bold text-black">
              <span>Subtotal<span className="ml-10">:</span></span>
              <span className="text-red-600">{subtotal} BDT</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-black">
              <span>Delivery Charge <span className="ml-2">:</span></span>
              <span className="text-red-600">{deliveryCharge} BDT</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between text-sm font-bold text-black">
              <span>Total<span className="ml-14">:</span></span>
              <span className="text-red-600">{total} BDT</span>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-5 border border-gray-400 shadow-sm text-center mt-6">
            <p className="text-sm font-bold text-black">Payment Method : Cash on delivery</p>
            <p className="text-[10px] font-bold text-black mt-1">First experience, then pay. We value your trust the most</p>
          </div>
        </div>

        {/* Right Side: Checkout Form */}
        <div className="md:w-7/12 flex flex-col">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">Please fill up this form</h3>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-transparent">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-900 ml-4">Write your full name</label>
              <input 
                type="text" name="name" required
                placeholder="Md. Yousuf" 
                value={formData.name} onChange={handleChange}
                className="w-full bg-cream border border-gray-400 px-6 py-4 rounded-full outline-none text-sm text-gray-800 focus:border-primary shadow-inner"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-900 ml-4">Your Phone Number</label>
              <input 
                type="text" name="phone" required
                placeholder="+8801977-622623" 
                value={formData.phone} onChange={handleChange}
                className="w-full bg-cream border border-gray-400 px-6 py-4 rounded-full outline-none text-sm text-gray-800 focus:border-primary shadow-inner"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-900 ml-4">In details address ( Village/Town, District, Division )</label>
              <textarea 
                name="address" required
                placeholder="Talaimari, Motihar thana, Rajshahi" 
                value={formData.address} onChange={handleChange}
                className="w-full bg-cream border border-gray-400 px-6 py-4 rounded-3xl h-32 resize-none outline-none text-sm text-gray-800 focus:border-primary shadow-inner"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-900 ml-4">Any additional Note</label>
              <input 
                type="text" name="note"
                placeholder="Please wrap the pack of the saree in a gift paper" 
                value={formData.note} onChange={handleChange}
                className="w-full bg-cream border border-gray-400 px-6 py-4 rounded-full outline-none text-sm text-gray-800 focus:border-primary shadow-inner"
              />
            </div>

            <button type="submit" className="w-full bg-primary text-white font-medium text-lg py-4 rounded-2xl mt-4 hover:bg-opacity-90 shadow-lg transition-transform active:scale-[0.98]">
              Confirm
            </button>
          </form>
        </div>
      </div>
      
      {/* Simple inline style for animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Checkout;
