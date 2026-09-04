import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileMini = ({ isOpen, onClose }) => {
  const { user, logout } = useContext(AuthContext);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && user) {
      const fetchOrders = async () => {
        try {
          const { data } = await axios.get('/api/orders/myorders', {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          setTotalOrders(data.length);
          setPendingOrders(data.filter(o => o.status !== 'Received').length);
        } catch (error) {
          console.error(error);
        }
      };
      fetchOrders();
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const isCustomer = user && user.role !== 'admin';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:block sm:inset-auto sm:absolute sm:top-full sm:right-0 sm:mt-2">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs sm:bg-transparent sm:backdrop-blur-none"
        onClick={onClose} 
      />

      {/* Profile Box */}
      <div className="relative z-10 w-[92vw] max-w-[320px] sm:w-76 bg-[#FAF6F0] rounded-2xl sm:rounded-[28px] shadow-2xl sm:shadow-lg border border-gray-200 p-5 sm:p-6 flex flex-col items-center font-poppins animate-fadeIn">
        {/* Close Button on Mobile */}
        <div className="w-full flex justify-end mb-1 sm:hidden">
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
            aria-label="Close Profile"
          >
            &times;
          </button>
        </div>

        {isCustomer ? (
          <>
            <div className="w-full bg-[#004D3D] text-white font-bold text-center text-xs sm:text-sm px-4 py-2.5 rounded-xl mb-4 shadow-sm">
              <span className="text-gray-200 text-[11px] font-normal block">Phone Number</span>
              {user.phone}
            </div>
            <div className="w-full flex justify-between font-bold text-xs sm:text-sm text-black mb-2.5 px-2">
              <span>Total order</span>
              <span>:</span>
              <span className="w-8 text-right font-semibold">{totalOrders}</span>
            </div>
            <div className="w-full flex justify-between font-bold text-xs sm:text-sm text-black mb-6 px-2">
              <span>Pending Order</span>
              <span>:</span>
              <span className="w-8 text-right font-semibold text-amber-700">{pendingOrders}</span>
            </div>
            <Link 
              to="/profile" 
              onClick={onClose}
              className="w-full bg-[#A38A59] text-white font-bold py-2.5 rounded-full text-center hover:bg-opacity-90 shadow-sm mb-2.5 text-xs sm:text-sm transition-all">
              Go to Profile
            </Link>
            <button 
              onClick={() => { logout(); onClose(); }}
              className="w-full bg-red-600 text-white font-bold py-2 rounded-full text-center hover:bg-red-700 shadow-sm text-xs sm:text-sm transition-all">
              Logout
            </button>
          </>
        ) : user && user.role === 'admin' ? (
          <>
            <div className="w-full bg-[#004D3D] text-white font-bold text-center text-xs sm:text-sm px-4 py-2.5 rounded-xl mb-4 shadow-sm">
              <span className="text-gray-200 text-[11px] font-normal block">Admin Account</span>
              {user.phone}
            </div>
            <Link 
              to="/admin" 
              onClick={onClose}
              className="w-full bg-[#004D3D] text-white font-bold py-2.5 rounded-full text-center hover:bg-opacity-90 shadow-sm mb-2.5 text-xs sm:text-sm transition-all">
              Admin Dashboard
            </Link>
            <button 
              onClick={() => { logout(); onClose(); }}
              className="w-full bg-red-600 text-white font-bold py-2 rounded-full text-center hover:bg-red-700 shadow-sm text-xs sm:text-sm transition-all">
              Logout
            </button>
          </>
        ) : (
          <>
            <div className="text-center font-bold text-black mb-5 text-sm sm:text-base">
              Please login to view profile
            </div>
            <button 
              onClick={() => { navigate('/login'); onClose(); }}
              className="w-full bg-[#A38A59] text-white font-bold py-2.5 sm:py-3 rounded-full text-center hover:bg-opacity-90 shadow-sm text-xs sm:text-sm transition-all">
              Login or Sign up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileMini;
