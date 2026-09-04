import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // Check if identifier is email or phone
    const isEmail = identifier.includes('@');
    const email = isEmail ? identifier : '';
    const phone = !isEmail ? identifier : '';

    try {
      await register(name, phone, email, password);
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 pb-16 font-poppins relative">
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-8 text-center px-4">
        নতুন একাউন্ট তৈরি করুন
      </h2>

      <div className="relative w-11/12 max-w-2xl bg-cream rounded-[40px] shadow-lg overflow-hidden p-8 md:p-12 flex flex-col items-center" 
           style={{ 
             backgroundImage: "url('/assets/bg-customer.png')", 
             backgroundSize: 'cover', 
             backgroundPosition: 'center',
             backgroundBlendMode: 'overlay',
             backgroundColor: 'rgba(254, 249, 243, 0.95)'
           }}>
        
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-8 text-center z-10">
          Create an Account
        </h3>

        <form onSubmit={submitHandler} className="w-full max-w-md z-10 flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full bg-white px-6 py-3.5 rounded-full outline-none text-sm text-gray-700 shadow-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input 
            type="text" 
            placeholder="Email / Phone" 
            className="w-full bg-white px-6 py-3.5 rounded-full outline-none text-sm text-gray-700 shadow-sm"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-white px-6 py-3.5 rounded-full outline-none text-sm text-gray-700 shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input 
            type="password" 
            placeholder="Confirm Password" 
            className="w-full bg-white px-6 py-3.5 rounded-full outline-none text-sm text-gray-700 shadow-sm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button 
            type="submit" 
            className="w-full bg-accent text-white font-medium py-3 rounded-lg mt-4 hover:bg-opacity-90 transition-all shadow-md">
            Register
          </button>
        </form>

        <div className="mt-6 text-center z-10">
          <Link to="/login" className="block text-sm text-gray-600 cursor-pointer hover:text-primary">
            Already have an account? Login Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
