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
    <div className="absolute top-14 right-0 w-72 bg-[#FAF6F0] rounded-[30px] shadow-lg border border-gray-200 z-50 p-6 flex flex-col items-center">
      {isCustomer ? (
        <>
          <div className="bg-[#004D3D] text-white font-bold text-sm px-6 py-2 rounded-lg mb-6">
            Phone Number<br/>
            {user.phone}
          </div>
          <div className="w-full flex justify-between font-bold text-sm text-black mb-3 px-2">
            <span>Total order</span>
            <span>:</span>
            <span className="w-8 text-right">{totalOrders}</span>
          </div>
          <div className="w-full flex justify-between font-bold text-sm text-black mb-8 px-2">
            <span>Pending Order</span>
            <span>:</span>
            <span className="w-8 text-right">{pendingOrders}</span>
          </div>
          <Link 
            to="/profile" 
            onClick={onClose}
            className="w-full bg-[#A38A59] text-white font-bold py-3 rounded-full text-center hover:bg-opacity-90 shadow-sm mb-3">
            Go to Profile
          </Link>
          <button 
            onClick={() => { logout(); onClose(); }}
            className="w-full bg-red-600 text-white font-bold py-2 rounded-full text-center hover:bg-red-700 shadow-sm text-sm">
            Logout
          </button>
        </>
      ) : (
        <>
          <div className="text-center font-bold text-black mb-6">Please login to view profile</div>
          <button 
            onClick={() => { navigate('/login'); onClose(); }}
            className="w-full bg-[#A38A59] text-white font-bold py-3 rounded-full text-center hover:bg-opacity-90 shadow-sm">
            Login or Sign up
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileMini;
