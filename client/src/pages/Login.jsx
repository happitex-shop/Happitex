import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(identifier, password);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 pb-16 font-poppins relative">
      {/* Page Title */}
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-8 text-center px-4">
        আপনার প্রোফাইল এ লগইন অথবা রেজিস্ট্রেশন করুন ,
      </h2>

      {/* Login Card */}
      <div className="relative w-11/12 max-w-2xl bg-cream rounded-[40px] shadow-lg overflow-hidden p-8 md:p-16 flex flex-col items-center" 
           style={{ 
             backgroundImage: "url('/assets/bg-customer.png')", 
             backgroundSize: 'cover', 
             backgroundPosition: 'center',
             backgroundBlendMode: 'overlay',
             backgroundColor: 'rgba(254, 249, 243, 0.95)' // Cream overlay
           }}>
        
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-10 text-center z-10">
          Hello, Welcome to your account
        </h3>

        {error && <div className="z-10 w-full max-w-md bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4 text-center text-sm">{error}</div>}

        <form onSubmit={submitHandler} className="w-full max-w-md z-10 flex flex-col gap-5">
          <input 
            type="text" 
            placeholder="Email / Phone" 
            className="w-full bg-white px-6 py-3.5 rounded-full outline-none text-sm text-gray-700 shadow-sm"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-white px-6 py-3.5 rounded-full outline-none text-sm text-gray-700 shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center gap-2 pl-2 mt-1">
            <input type="checkbox" id="remember" className="w-4 h-4 accent-primary" />
            <label htmlFor="remember" className="text-xs text-gray-600 cursor-pointer">Remember me</label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-accent text-white font-medium py-3 rounded-lg mt-2 hover:bg-opacity-90 transition-all shadow-md">
            Login
          </button>
        </form>

        <div className="mt-8 text-center space-y-3 z-10">
          <p className="text-sm text-gray-600 cursor-pointer hover:text-primary">Forgot your Password ?</p>
          <Link to="/register" className="block text-sm text-gray-600 cursor-pointer hover:text-primary">
            Need a account ? Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
