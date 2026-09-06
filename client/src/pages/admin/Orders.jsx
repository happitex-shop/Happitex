import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  
  const { user } = useContext(AuthContext);

  const statusOptions = ['Order Placed', 'Order Conformed', 'Shipped', 'On Delivery', 'Received'];

  const fetchOrders = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('/api/orders', config);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (filter) {
      setFilteredOrders(orders.filter(o => o.status === filter));
    } else {
      setFilteredOrders(orders);
    }
  }, [filter, orders]);

  const updateStatus = async (id, newStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`/api/orders/${id}/status`, { status: newStatus }, config);
      setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteOrderHandler = async (id) => {
    if (window.confirm('Are you sure you want to remove this order?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`/api/orders/${id}`, config);
        setOrders(prev => prev.filter(o => o._id !== id));
      } catch (error) {
        console.error('Error removing order:', error);
        alert(error.response?.data?.message || 'Error removing order');
      }
    }
  };

  const getStatusColor = (status) => {
    return 'bg-[#06954B]';
  };

  return (
    <div className="flex flex-col w-full font-poppins">
      <div className="w-full border border-gray-400 rounded-[35px] py-6 px-8 bg-white mb-8 shadow-sm text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-black">All the customers Order Status</h2>
      </div>

      <div className="w-full flex items-center mb-6 gap-3 sm:gap-4 px-2 flex-wrap">
        <span className="font-bold text-base md:text-lg mr-2 text-gray-800">Filter by :</span>
        <button 
          onClick={() => setFilter('')} 
          className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all ${filter === '' ? 'bg-black text-white shadow-sm' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
          All
        </button>
        {statusOptions.map(st => (
          <button 
            key={st}
            onClick={() => setFilter(st)}
            className={`px-4 md:px-5 py-1.5 rounded-full text-xs md:text-sm font-semibold text-white transition-all shadow-sm ${filter === st ? 'bg-[#004D3D] ring-2 ring-offset-2 ring-[#004D3D]' : 'bg-[#06954B] hover:bg-opacity-90'}`}
          >
            {st}
          </button>
        ))}
      </div>

      <div className="w-full bg-white border border-gray-400 rounded-2xl shadow-sm overflow-hidden mb-12">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-400 bg-gray-50/80">
                <th className="py-4 px-4 font-bold text-sm md:text-base border-r border-gray-400 text-center w-[20%]">Customer Name</th>
                <th className="py-4 px-4 font-bold text-sm md:text-base border-r border-gray-400 text-center w-[22%]">Customer Email</th>
                <th className="py-4 px-4 font-bold text-sm md:text-base border-r border-gray-400 text-center w-[18%]">Customer Number</th>
                <th className="py-4 px-4 font-bold text-sm md:text-base border-r border-gray-400 text-center w-[25%]">Status Update</th>
                <th className="py-4 px-4 font-bold text-sm md:text-base text-center w-[15%]">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="py-12 text-center font-semibold text-gray-500">Loading orders...</td></tr>
              ) : filteredOrders.length === 0 ? (
                <tr><td colSpan="5" className="py-12 text-center text-gray-500 font-semibold">No orders found.</td></tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-300 last:border-0 hover:bg-gray-50/80 transition-colors">
                    <td className="py-4 px-4 font-bold text-center border-r border-gray-300 text-gray-900 text-sm md:text-base">{order.customerName}</td>
                    <td className="py-4 px-4 font-bold text-center border-r border-gray-300 text-gray-800 text-sm md:text-base">
                      {order.user && order.user.email && order.user.role !== 'admin' && order.user.email !== 'admin@happitex.com' 
                        ? order.user.email 
                        : 'No Email'}
                    </td>
                    <td className="py-4 px-4 font-bold text-center border-r border-gray-300 text-gray-900 text-sm md:text-base">{order.phone}</td>
                    <td className="py-4 px-4 text-center border-r border-gray-300 relative group">
                      <div className="flex justify-center items-center gap-2">
                        <div className={`px-4 py-2 rounded-[10px] text-white text-xs md:text-sm font-bold min-w-[130px] ${getStatusColor(order.status)} shadow-sm`}>
                          {order.status}
                        </div>
                        <div className="relative cursor-pointer">
                          <div className="border border-gray-400 rounded-md p-1 hover:bg-gray-100 flex items-center justify-center bg-white shadow-2xs">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          
                          {/* Dropdown Menu (visible on hover) */}
                          <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-[20px] shadow-xl w-48 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col p-4 gap-2.5">
                            <div className="text-xs text-gray-500 font-semibold mb-1">Status mini bar</div>
                            {statusOptions.map(st => (
                              <button 
                                key={st}
                                onClick={() => updateStatus(order._id, st)}
                                className={`px-4 py-2 rounded-full text-xs font-bold shadow-sm transition-all hover:opacity-90 active:scale-95 ${order.status === st ? 'bg-[#004D3D] text-white' : 'bg-[#06954B] text-white'}`}
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button 
                        onClick={() => deleteOrderHandler(order._id)}
                        className="bg-red-600 text-white font-bold text-xs py-2 px-6 rounded-full hover:bg-red-700 shadow-sm transition-all active:scale-95"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
