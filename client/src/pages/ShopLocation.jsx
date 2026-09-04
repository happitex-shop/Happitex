import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShopLocation = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get('/api/settings');
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings', error);
      }
    };
    fetchSettings();
  }, []);

  const handlePhoneClick = () => {
    if (settings?.phoneNumber) {
      navigator.clipboard.writeText(settings.phoneNumber);
      alert('Phone number copied to clipboard!');
    }
  };

  const handleEmailClick = () => {
    window.open(`mailto:${settings?.email || ''}`);
  };

  const handleWhatsAppClick = () => {
    const num = (settings?.whatsappNumber || '').replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${num}`, '_blank');
  };

  const handleFacebookClick = () => {
    window.open(settings?.facebookLink || '#', '_blank');
  };

  return (
    <div className="bg-white min-h-screen font-poppins pb-32 overflow-x-hidden">
      {/* Top Map Image */}
      <div className="w-full relative">
        <img src="/assets/shop_location.png" alt="Map Location" className="w-full h-auto object-cover max-h-[550px]" />
      </div>

      <h2 className="text-center text-4xl font-bold text-[#004D3D] my-16">
        আমাদের সাথে যোগাযোগ করুন,
      </h2>

      <div className="w-full max-w-[1600px] mx-auto px-8 md:px-12 flex flex-col gap-32 mt-20">
        
        {/* First Pill - Shop Address */}
        <div 
          className="relative bg-[#FAF6F0] rounded-full h-48 md:h-64 flex items-center justify-center shadow-md w-full md:w-[85%] ml-auto"
          style={{ backgroundImage: "url('/assets/BackGround_HS.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <img 
            src="/assets/shop_pic.png" 
            alt="Shop Front" 
            className="absolute -left-12 md:-left-32 top-1/2 -translate-y-1/2 w-48 h-48 md:w-[450px] md:h-[450px] rounded-full border-[10px] border-white shadow-2xl object-cover" 
          />
          <div className="text-center pl-16 md:pl-48">
            <h3 className="text-4xl md:text-7xl font-extrabold text-black mb-4" style={{ fontFamily: 'sans-serif' }}>বেলকুচি</h3>
            <p className="text-3xl md:text-6xl font-bold text-black" style={{ fontFamily: 'sans-serif' }}>সিরাজগঞ্জ রাজশাহী</p>
          </div>
        </div>

        {/* Second Pill - Social Media */}
        <div 
          className="relative bg-[#FAF6F0] rounded-full h-auto py-12 md:py-0 md:h-72 flex items-center shadow-md w-full md:w-[85%] mr-auto mt-24"
          style={{ backgroundImage: "url('/assets/BackGround_HS.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          
          {/* Social Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pl-12 pr-12 md:pl-24 md:pr-64 w-full md:w-3/4">
            
            {/* Phone Button */}
            <button onClick={handlePhoneClick} className="bg-[#EAEAEA] text-black font-semibold py-5 px-8 rounded-2xl flex items-center gap-4 hover:bg-gray-300 transition-colors shadow-sm text-lg md:text-xl">
              <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.54-4.24-7.136-7.136l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              {settings?.phoneNumber ? `+${settings.phoneNumber.replace('+', '')}` : '+880 1830-439602'}
            </button>

            {/* WhatsApp Button */}
            <button onClick={handleWhatsAppClick} className="bg-[#1C1C1C] text-white font-semibold py-5 px-8 rounded-2xl flex items-center gap-4 hover:bg-black transition-colors shadow-sm text-lg md:text-xl">
              <svg className="w-7 h-7 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {settings?.whatsappNumber ? `+${settings.whatsappNumber.replace('+', '')}` : '+880 1830-439602'}
            </button>

            {/* Email Button */}
            <button onClick={handleEmailClick} className="bg-white text-black font-semibold py-5 px-8 rounded-2xl flex items-center gap-4 hover:bg-gray-50 transition-colors shadow-sm border border-gray-100 text-lg md:text-xl">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                <path d="M20.5 4.5H3.5C2.39543 4.5 1.5 5.39543 1.5 6.5V17.5C1.5 18.6046 2.39543 19.5 3.5 19.5H20.5C21.6046 19.5 22.5 18.6046 22.5 17.5V6.5C22.5 5.39543 21.6046 4.5 20.5 4.5Z" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22.5 6.5L12 13.5L1.5 6.5" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="truncate">{settings?.email || 'anamul8505@gmail.com'}</span>
            </button>

            {/* Facebook Button */}
            <button onClick={handleFacebookClick} className="bg-[#001D5C] text-white font-semibold py-5 px-8 rounded-2xl flex items-center gap-4 hover:bg-[#001545] transition-colors shadow-sm text-lg md:text-xl">
              <svg className="w-7 h-7 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              {settings?.facebookName || 'Happitex'}
            </button>
            
          </div>

          <img 
            src="/assets/social_media.jpg" 
            alt="Social Media" 
            className="hidden md:block absolute -right-40 top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border-[10px] border-white shadow-2xl object-cover" 
          />
        </div>

      </div>
    </div>
  );
};

export default ShopLocation;
