import React, { useContext } from 'react';
import { Outlet, NavLink, Navigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminLayout = () => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { name: 'Order info', path: '/admin/orders' },
    { name: 'Customer Info', path: '/admin/customers' },
    { name: 'Product Manager', path: '/admin/products' },
    { name: 'Social Media', path: '/admin/social' },
    { name: 'Admin Info', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen flex font-poppins relative overflow-hidden bg-[#FAFAF8]">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: "url('/assets/BackGround_HS.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>

      {/* Left Sidebar */}
      <div className="w-[250px] bg-white z-10 flex flex-col shadow-[4px_0_10px_rgba(0,0,0,0.05)] border-r border-gray-100 min-h-screen shrink-0">
        <div className="bg-[#B99A6D] text-white text-center py-5 font-bold text-lg rounded-br-[40px] shadow-sm relative z-20">
          Admin Panel
        </div>
        
        <div className="flex flex-col gap-6 mt-12 relative z-10">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `py-3 font-bold text-center mx-2 rounded-r-[30px] transition-all duration-300 ${
                  isActive 
                    ? 'bg-orange text-black shadow-md' 
                    : 'bg-[#F2B67C] text-black hover:bg-[#F4C393]'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col z-10">
        {/* Top Header */}
        <div className="bg-white px-8 py-4 flex justify-between items-center shadow-sm relative z-20">
          <h1 className="text-3xl font-extrabold text-black tracking-tight">Welcome to Admin Panel</h1>
          <Link to="/" className="flex items-center bg-primary text-white pl-1 pr-5 py-1.5 rounded-full hover:bg-opacity-90 shadow-md transition-all">
            <div className="bg-white rounded-full p-0.5 mr-3">
              <img src="/assets/logo.jpg" alt="Logo" className="w-7 h-7 rounded-full object-cover" />
            </div>
            <span className="text-sm font-semibold">Go to HomePage</span>
          </Link>
        </div>

        {/* Dynamic Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
