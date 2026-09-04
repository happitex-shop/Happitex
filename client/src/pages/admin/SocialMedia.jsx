import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const SocialMedia = () => {
  const [facebookName, setFacebookName] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await axios.get('/api/settings');
      if (data) {
        setFacebookName(data.facebookName || '');
        setFacebookLink(data.facebookLink || '');
        setWhatsappNumber(data.whatsappNumber || '');
        setPhoneNumber(data.phoneNumber || '');
        setEmail(data.email || '');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put('/api/settings', {
        facebookName, facebookLink, whatsappNumber, phoneNumber, email
      }, config);
      alert('Social media links updated successfully!');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Error updating settings');
    }
  };

  return (
    <div className="flex flex-col items-center pb-12">
      <div className="w-full max-w-4xl border border-gray-400 rounded-[40px] py-6 px-10 bg-white mb-10 shadow-sm text-center">
        <h2 className="text-3xl font-extrabold text-black">All the social media controls are here</h2>
      </div>

      <form onSubmit={submitHandler} className="w-full max-w-3xl flex flex-col gap-8">
        
        {/* Facebook Section */}
        <div>
          <h3 className="text-2xl font-extrabold text-red-500 mb-4">FaceBook section</h3>
          <div className="flex flex-col gap-4 ml-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-extrabold text-black w-24">Page name</label>
              <input 
                type="text" 
                value={facebookName}
                onChange={(e) => setFacebookName(e.target.value)}
                className="flex-1 border border-gray-400 rounded-2xl px-6 py-2 outline-none font-medium bg-white"
              />
              <button type="button" className="bg-[#004D3D] text-white text-xs font-bold py-1.5 px-6 rounded-full hover:bg-opacity-90 shadow-sm">Change</button>
            </div>
            
            <div className="flex items-start gap-4">
              <label className="text-sm font-extrabold text-black w-24 mt-3">Page Link</label>
              <textarea 
                value={facebookLink}
                onChange={(e) => setFacebookLink(e.target.value)}
                className="flex-1 border border-gray-400 rounded-2xl px-6 py-2 outline-none font-medium bg-white text-xs resize-none min-h-[50px]"
              ></textarea>
              <button type="button" className="bg-[#004D3D] text-white text-xs font-bold py-1.5 px-6 mt-2 rounded-full hover:bg-opacity-90 shadow-sm">Change</button>
            </div>
          </div>
        </div>

        {/* WhatsApp Section */}
        <div>
          <h3 className="text-2xl font-extrabold text-red-500 mb-4">What's App section</h3>
          <div className="flex items-center gap-4 ml-4">
            <label className="text-sm font-extrabold text-black w-24">Number</label>
            <input 
              type="text" 
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="flex-1 border border-gray-400 rounded-2xl px-6 py-3 outline-none font-medium bg-white"
            />
            <button type="button" className="bg-[#004D3D] text-white text-xs font-bold py-1.5 px-6 rounded-full hover:bg-opacity-90 shadow-sm">Change</button>
          </div>
        </div>

        {/* Phone Section */}
        <div>
          <h3 className="text-2xl font-extrabold text-red-500 mb-4">Phone Number</h3>
          <div className="flex items-center gap-4 ml-4">
            <label className="text-sm font-extrabold text-black w-24">Number</label>
            <input 
              type="text" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 border border-gray-400 rounded-2xl px-6 py-3 outline-none font-medium bg-white"
            />
            <button type="button" className="bg-[#004D3D] text-white text-xs font-bold py-1.5 px-6 rounded-full hover:bg-opacity-90 shadow-sm">Change</button>
          </div>
        </div>

        {/* Email Section */}
        <div>
          <h3 className="text-2xl font-extrabold text-red-500 mb-4">Email</h3>
          <div className="flex items-center gap-4 ml-4">
            <label className="text-sm font-extrabold text-black w-24">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border border-gray-400 rounded-2xl px-6 py-3 outline-none font-medium bg-white"
            />
            <button type="button" className="bg-[#004D3D] text-white text-xs font-bold py-1.5 px-6 rounded-full hover:bg-opacity-90 shadow-sm">Change</button>
          </div>
        </div>

        <div className="mt-8 flex justify-center ml-28 mr-24">
          <button type="submit" className="w-full bg-[#06954B] text-white text-lg font-medium py-3 rounded-xl hover:bg-opacity-90 shadow-md">
            Save
          </button>
        </div>

      </form>
    </div>
  );
};

export default SocialMedia;
