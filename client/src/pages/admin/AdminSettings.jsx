import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const AdminSettings = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { user, updateAdminProfile } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setPhone(user.phone || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await updateAdminProfile({ phone, email, password });
    if (result.success) {
      alert('Admin info updated successfully!');
      setPassword('');
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl border border-gray-400 rounded-[40px] py-6 px-10 bg-white mb-10 shadow-sm text-center">
        <h2 className="text-3xl font-extrabold text-black">Admin Information Control section</h2>
      </div>

      <form onSubmit={submitHandler} className="w-full max-w-2xl flex flex-col gap-6">
        
        <div className="flex flex-col gap-1 relative">
          <label className="text-sm font-bold text-black ml-1">Admin Phone number</label>
          <div className="flex items-center gap-4">
            <input 
              type="text" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 border border-gray-400 rounded-2xl px-6 py-4 outline-none font-medium bg-white"
            />
            <button type="submit" className="bg-[#004D3D] text-white text-xs font-bold py-2 px-6 rounded-full hover:bg-opacity-90 shadow-sm">
              Change
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1 relative">
          <label className="text-sm font-bold text-black ml-1">Admin Email</label>
          <div className="flex items-center gap-4">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border border-gray-400 rounded-2xl px-6 py-4 outline-none font-medium bg-white"
            />
            <button type="submit" className="bg-[#004D3D] text-white text-xs font-bold py-2 px-6 rounded-full hover:bg-opacity-90 shadow-sm">
              Change
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1 relative">
          <label className="text-sm font-bold text-black ml-1">Password</label>
          <div className="flex items-center gap-4">
            <input 
              type="password" 
              placeholder="Leave blank to keep current"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 border border-gray-400 rounded-2xl px-6 py-4 outline-none font-medium bg-white"
            />
            <button type="submit" className="bg-[#004D3D] text-white text-xs font-bold py-2 px-6 rounded-full hover:bg-opacity-90 shadow-sm">
              Change
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-center w-full max-w-2xl">
          <button type="submit" className="w-full bg-[#06954B] text-white text-lg font-medium py-4 rounded-xl hover:bg-opacity-90 shadow-md">
            Save
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminSettings;
