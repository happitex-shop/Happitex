import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="bg-cream min-h-[calc(100vh-80px)] font-poppins relative flex flex-col">
      <h2 className="text-center text-xl md:text-2xl font-bold text-primary py-6 bg-white shadow-sm z-10 relative">
        আপনার অর্ডারটি গ্রহণ করা হয়েছে ,
      </h2>
      
      <div 
        className="w-full h-full absolute inset-0 opacity-40 z-0 top-[76px]" 
        style={{ 
          backgroundImage: "url('/assets/bg-customer.png')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 p-4">
        {/* Big Green Checkmark Icon */}
        <div className="w-48 h-48 bg-primary rounded-full flex items-center justify-center shadow-lg mb-10 border-8 border-white animate-bounce-short">
          <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold text-black text-center mb-8">
          Your order is Placed. Please see trackings to keep updated
        </h3>

        <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-opacity-90">
          Return to Home
        </Link>
      </div>

      <style>{`
        @keyframes bounceShort {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-short {
          animation: bounceShort 1s ease-in-out 1;
        }
      `}</style>
    </div>
  );
};

export default OrderSuccess;
