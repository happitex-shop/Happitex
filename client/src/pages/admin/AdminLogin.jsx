import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminLogin = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { adminLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await adminLogin(identifier, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex font-poppins bg-white">
      {/* Left Decorative Sidebar */}
      <div className="hidden md:flex flex-col w-1/4 max-w-[300px]">
        {/* Top Gold Swirl Placeholder */}
        <div className="h-[30%] bg-gradient-to-br from-gold to-orange rounded-br-3xl shadow-md z-10 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-50 bg-yellow-400" style={{ clipPath: 'ellipse(80% 50% at 50% 0%)' }}></div>
           <div className="absolute bottom-0 right-0 w-full h-full opacity-50 bg-orange" style={{ clipPath: 'ellipse(60% 60% at 100% 100%)' }}></div>
        </div>
        {/* Bottom Black/White Pattern Placeholder */}
        <div className="h-[70%] flex-grow relative overflow-hidden">
          <img src="/assets/admin_bcg.jpeg" alt="Decorative background" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>

      {/* Right Login Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Top Right Home Button */}
        <div className="absolute top-6 right-6">
          <Link to="/" className="flex items-center bg-primary text-white pl-1 pr-5 py-1 rounded-full hover:bg-opacity-90 shadow-md">
            <img src="/assets/logo.jpg" alt="Logo" className="w-8 h-8 rounded-full mr-3 border border-white" />
            <span className="text-sm font-semibold">Go to HomePage</span>
          </Link>
        </div>

        {/* Login Form Container */}
        <div className="flex-1 flex flex-col justify-center items-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Welcome to</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Admin Panel</h2>

          {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-6 w-full max-w-md text-center">{error}</div>}

          <form onSubmit={submitHandler} className="w-full max-w-md flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-800 text-center">
                Enter admin email / phone number
              </label>
              <input 
                type="text" 
                placeholder="+880 1830-439602" 
                className="w-full bg-cream border border-gray-300 px-6 py-3 rounded-full outline-none text-sm text-gray-700 text-center focus:border-primary"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-800 text-center">
                Enter admin password
              </label>
              <input 
                type="password" 
                placeholder="Admin 123" 
                className="w-full bg-cream border border-gray-300 px-6 py-3 rounded-full outline-none text-sm text-gray-700 text-center focus:border-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-accent text-white font-medium py-3 rounded-xl mt-4 hover:bg-opacity-90 transition-all">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
