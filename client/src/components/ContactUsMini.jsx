import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactUsMini = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    if (isOpen && !settings) {
      const fetchSettings = async () => {
        try {
          const { data } = await axios.get('/api/settings');
          setSettings(data);
        } catch (error) {
          console.error('Error fetching settings:', error);
        }
      };
      fetchSettings();
    }
  }, [isOpen, settings]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-0 w-[340px] bg-[#FAF6F0] rounded-[30px] shadow-lg border border-gray-200 z-50 p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-500 font-semibold pl-2 text-sm">Contract Us</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Phone */}
        <div className="bg-[#D9D9D9] rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-300 transition-colors" onClick={() => {
          if (settings?.phoneNumber) {
            navigator.clipboard.writeText(settings.phoneNumber);
            alert('Phone number copied to clipboard!');
          }
        }}>
          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.54-4.24-7.136-7.136l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          <span className="text-black font-semibold text-lg">{settings?.phoneNumber || 'N/A'}</span>
        </div>

        {/* WhatsApp */}
        <div className="bg-[#242424] rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-800 transition-colors" onClick={() => window.open(`https://wa.me/${(settings?.whatsappNumber || '').replace(/[^0-9]/g, '')}`)}>
          <svg className="w-8 h-8 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="text-white font-semibold text-lg">{settings?.whatsappNumber || 'N/A'}</span>
        </div>

        {/* Gmail */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 cursor-pointer shadow-sm hover:bg-gray-50 transition-colors border border-gray-100" onClick={() => window.open(`mailto:${settings?.email || ''}`)}>
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <path d="M20.5 4.5H3.5C2.39543 4.5 1.5 5.39543 1.5 6.5V17.5C1.5 18.6046 2.39543 19.5 3.5 19.5H20.5C21.6046 19.5 22.5 18.6046 22.5 17.5V6.5C22.5 5.39543 21.6046 4.5 20.5 4.5Z" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22.5 6.5L12 13.5L1.5 6.5" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-black font-semibold text-base underline decoration-gray-400 underline-offset-2">{settings?.email || 'N/A'}</span>
        </div>

        {/* Facebook */}
        <div className="bg-[#00205B] rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-opacity-90 transition-colors" onClick={() => window.open(settings?.facebookLink || '#', '_blank')}>
          <svg className="w-8 h-8 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
             <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="text-white font-semibold text-lg">{settings?.facebookName || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactUsMini;
