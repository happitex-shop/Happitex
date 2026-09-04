import React, { useState } from 'react';
import axios from 'axios';

const TrackOrder = () => {
  const [identifier, setIdentifier] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    if(!identifier) return;
    
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('/api/orders/track', { identifier });
      setOrder(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Order not found');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = [
    'Order Placed',
    'Order Conformed',
    'Shipped',
    'On Delivery',
    'Received'
  ];

  // Dummy logic to map DB status string to step index. 
  // e.g. status: 'Order Confirmed' means steps 0 and 1 are 'Done', rest are 'Pending'
  const getStepIndex = (status) => {
    const idx = statusSteps.indexOf(status);
    return idx === -1 ? 0 : idx;
  };

  return (
    <div className="bg-cream min-h-[calc(100vh-140px)] font-poppins relative flex flex-col">
      <h2 className="text-center text-xl md:text-2xl font-bold text-primary py-6 bg-white shadow-sm z-10 relative">
        {order ? 'আপনার অর্ডার এর অবস্থা ,' : 'আপনার অর্ডার এর অবস্থান দেখুন ,'}
      </h2>
      
      <div 
        className="w-full h-full absolute inset-0 opacity-40 z-0 top-[76px]" 
        style={{ 
          backgroundImage: "url('/assets/bg-customer.png')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}>
      </div>

      <div className="flex-1 flex justify-center items-center relative z-10 p-4 py-16">
        
        {!order ? (
          /* Search Form */
          <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-[40px] shadow-lg p-8 md:p-16 flex flex-col items-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">Track your Order</h3>
            
            <form onSubmit={handleTrack} className="w-full flex flex-col gap-6">
              <input 
                type="text" 
                placeholder="Enter your email / Phone number" 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-white border border-gray-300 px-6 py-4 rounded-full outline-none text-center text-gray-700 shadow-sm focus:border-primary text-lg"
              />
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-white font-bold text-xl py-4 rounded-full hover:bg-opacity-90 shadow-md">
                {loading ? 'Tracking...' : 'Track'}
              </button>
            </form>
            
            {error && <p className="text-red-500 mt-4 font-semibold">{error}</p>}
          </div>
        ) : (
          /* Order Status Flowchart */
          <div className="w-full max-w-5xl bg-white/80 backdrop-blur-sm rounded-[40px] shadow-lg p-8 md:p-12 overflow-x-auto">
            
            <div className="min-w-[700px]">
              {/* Status Row */}
              <div className="flex items-center gap-6 mb-16 relative">
                <h4 className="text-3xl font-bold text-red-500 w-32 shrink-0">Status</h4>
                
                <div className="flex flex-1 justify-between relative">
                  {/* Connecting Line */}
                  <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-gray-400 -z-10 transform -translate-y-1/2"></div>
                  
                  {statusSteps.map((step, index) => {
                    const currentIdx = getStepIndex(order.status);
                    const isDone = index <= currentIdx;
                    return (
                      <div key={step} className="flex flex-col items-center gap-3 bg-transparent">
                        <div className={`px-6 py-4 rounded-2xl font-bold text-white shadow-md z-10 ${isDone ? 'bg-[#06954B]' : 'bg-[#003B2E]'}`}>
                          {isDone ? 'Done' : 'Pending'}
                        </div>
                        <span className="font-bold text-gray-900 whitespace-nowrap">{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date Row */}
              <div className="flex items-center gap-6">
                <h4 className="text-3xl font-bold text-red-500 w-32 shrink-0">Date</h4>
                <div className="flex flex-1 justify-between px-6">
                  {statusSteps.map((step, index) => {
                    const currentIdx = getStepIndex(order.status);
                    const isDone = index <= currentIdx;
                    return (
                      <div key={`date-${step}`} className="flex flex-col items-center w-24 text-center">
                        {isDone ? (
                          <span className="font-bold text-gray-900 whitespace-nowrap">
                            {new Date(order.createdAt).toLocaleDateString('en-GB')}
                          </span>
                        ) : (
                          <span></span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setOrder(null)} 
              className="mt-12 bg-gray-200 text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-gray-300">
              Track Another Order
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default TrackOrder;
