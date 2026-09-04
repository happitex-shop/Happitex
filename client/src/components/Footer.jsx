import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get('/api/settings');
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings for footer', error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-primary text-cream py-10 mt-auto font-poppins relative z-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Left Side */}
        <div className="max-w-sm">
          <div className="bg-white inline-block p-1 rounded-2xl mb-4">
            <img src="/assets/logo.jpg" alt="Happitex Logo" className="h-16 w-16 rounded-xl object-contain" />
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-semibold">
            স্টাইলিশ লুকের জন্য পারফেক্ট, আপনার সাজে আনুন নতুনত্ব ✨ ফ্যাব্রিক<br />
            থেকে সরাসরি আপনার আলমারিতে
          </p>
        </div>

        {/* Right Side - Contact */}
        <div>
          <h4 className="font-bold mb-4 text-sm text-gold">যোগাযোগ</h4>
          <div className="text-xs text-gray-300 space-y-2">
            <p className="flex items-center gap-2 cursor-pointer hover:text-white" onClick={() => {
              if (settings?.phoneNumber) {
                navigator.clipboard.writeText(settings.phoneNumber);
                alert('Phone number copied to clipboard!');
              }
            }}>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              {settings?.phoneNumber || '01830-439602'}
            </p>
            <p className="flex items-center gap-2 cursor-pointer hover:text-white" onClick={() => window.open(`mailto:${settings?.email || ''}`)}>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              {settings?.email || 'anamul8505@gmail.com'}
            </p>
            <p className="flex items-center gap-2">
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              {settings?.address || 'Sirajgonj, Rajshahi'}
            </p>
          </div>
          
          {/* Social Icons */}
          <div className="flex gap-3 mt-6">
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-primary hover:bg-opacity-80 cursor-pointer" onClick={() => window.open(settings?.facebookLink || '#', '_blank')}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
            </div>
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-primary hover:bg-opacity-80 cursor-pointer" onClick={() => window.open(`https://m.me/${settings?.facebookLink?.split('/').pop() || ''}`, '_blank')}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.14 2 11.25c0 2.923 1.488 5.498 3.791 7.151v3.238l3.491-1.921c.866.242 1.777.382 2.718.382 5.523 0 10-4.14 10-9.25S17.523 2 12 2zm1.096 12.871l-2.822-3.023-5.508 3.023 6.071-6.442 2.898 3.023 5.43-3.023-6.069 6.442z"/></svg>
            </div>
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-primary hover:bg-opacity-80 cursor-pointer" onClick={() => window.open(`https://wa.me/${(settings?.whatsappNumber || '').replace(/[^0-9]/g, '')}`, '_blank')}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.122.553 4.195 1.602 6.012l-1.637 5.96 6.096-1.599A11.96 11.96 0 0012.031 24c6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm3.645 17.202c-.156.438-.9 .842-1.258.874-.359.032-.782.16-2.483-.541-2.091-.861-3.419-2.996-3.523-3.136-.104-.141-2.035-2.613-.199-4.708.41-.466.892-.582 1.189-.582.302 0 .604.015.864.032.274.016.643-.105.998.756.37.915 1.258 3.082 1.368 3.305.109.223.187.484.032.793-.156.313-.234.5-.468.782-.234.281-.497.609-.703.829-.234.25-.483.515-.208.984.275.469 1.226 2.022 2.64 3.284 1.819 1.625 3.34 2.125 3.808 2.343.468.219.742.188 1.015-.125.273-.312 1.187-1.375 1.5-1.844.312-.469.625-.391 1.047-.234.422.156 2.671 1.266 3.125 1.484.453.219.754.344.863.532.109.188.109 1.109-.047 1.547z"/></svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-12 pt-4 border-t border-gray-700/50 text-[11px] text-gray-400">
        <p>© 2026 Happitex | সর্বস্বত্ব সংরক্ষিত।</p>
        <p className="text-gold mt-1 font-medium">Developed By MD. Yousuf</p>
        <p className="mt-1 text-gray-300">
          Contact developer :{' '}
          <a href="mailto:mdyousuf2723@gmail.com" className="text-gold hover:underline font-semibold">Email</a>
          {', '}
          <a href="https://www.linkedin.com/in/md-yousuf-368a92354/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-semibold">LinkedIn</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
