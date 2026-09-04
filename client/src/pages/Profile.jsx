import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { user, loading, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    } else if (user) {
      // Fetch user's orders
      const fetchOrders = async () => {
        try {
          const { data } = await axios.get('/api/orders/myorders', {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          setTotalOrders(data.length);
          setPendingOrders(data.filter(o => o.status !== 'Received').length);
        } catch (error) {
          console.error(error);
        }
      };
      // We haven't created the myorders endpoint yet, so let's mock it for now
      fetchOrders();
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (!user || user.role === 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center font-poppins">
        <h2 className="text-xl font-bold">Please <a href="/login" className="text-blue-600 underline">login</a> to view your profile.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 pb-16 font-poppins relative bg-[#FAF6F0]">
      {/* Page Title */}
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-8 text-center px-4">
        আপনার প্রোফাইল,
      </h2>

      {/* Profile Card */}
      <div className="relative w-11/12 max-w-3xl rounded-[40px] shadow-sm overflow-hidden p-8 md:p-16 flex flex-col" 
           style={{ 
             backgroundImage: "url('/assets/bg-customer.png')", 
             backgroundSize: 'cover', 
             backgroundPosition: 'center',
             backgroundBlendMode: 'overlay',
             backgroundColor: 'rgba(254, 249, 243, 0.95)' // Cream overlay
           }}>
        
        <div className="flex flex-col gap-8 z-10 w-full max-w-2xl mx-auto">
          {/* Name */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <h3 className="text-xl font-bold text-black w-40 text-left md:text-right">Name :</h3>
            <div className="flex-1 bg-white rounded-full flex justify-between items-center p-2 pl-6 w-full shadow-sm">
              <span className="font-bold text-black flex-1 text-center">{user.name}</span>
              <button onClick={async () => {
                const newName = window.prompt("Enter new name:", user.name);
                if (newName && newName.trim() !== "") await updateUser({ name: newName });
              }} className="bg-[#009245] text-white text-xs px-4 py-2 rounded-full font-medium hover:bg-opacity-90 whitespace-nowrap">Change Name</button>
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <h3 className="text-xl font-bold text-black w-40 text-left md:text-right">Phone number :</h3>
            <div className="flex-1 bg-white rounded-full flex justify-between items-center p-2 pl-6 w-full shadow-sm">
              <span className="font-bold text-black flex-1 text-center">{user.phone}</span>
              <button onClick={async () => {
                const newPhone = window.prompt("Enter new phone number (this changes your login ID):", user.phone);
                if (newPhone && newPhone.trim() !== "") await updateUser({ phone: newPhone });
              }} className="bg-[#009245] text-white text-xs px-4 py-2 rounded-full font-medium hover:bg-opacity-90 whitespace-nowrap">Change Number</button>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <h3 className="text-xl font-bold text-black w-40 text-left md:text-right">Email :</h3>
            <div className="flex-1 bg-white rounded-full flex justify-between items-center p-2 pl-6 w-full shadow-sm">
              <span className="font-bold text-black flex-1 text-center">{user.email || 'No email added'}</span>
              <button onClick={async () => {
                const newEmail = window.prompt("Enter new email:", user.email || "");
                if (newEmail && newEmail.trim() !== "") await updateUser({ email: newEmail });
              }} className="bg-[#009245] text-white text-xs px-4 py-2 rounded-full font-medium hover:bg-opacity-90 whitespace-nowrap">Change Mail</button>
            </div>
          </div>

          {/* Password (Optional visual) */}
          <div className="flex justify-center mt-2">
            <button onClick={async () => {
              const newPass = window.prompt("Enter new password:");
              if (newPass && newPass.trim() !== "") {
                await updateUser({ password: newPass });
                alert("Password updated successfully!");
              }
            }} className="text-gray-600 hover:text-primary underline text-sm font-semibold">
              Change Password
            </button>
          </div>

          {/* Stats Boxes */}
          <div className="flex justify-center gap-8 mt-6">
            <div className="bg-[#A38A59] text-white rounded-[30px] p-8 w-40 h-40 flex flex-col justify-center items-center shadow-md">
              <span className="font-bold text-xl mb-2 text-center leading-tight">Total<br/>order</span>
              <span className="font-bold text-2xl">{totalOrders}</span>
            </div>
            <div className="bg-[#004D3D] text-white rounded-[30px] p-8 w-40 h-40 flex flex-col justify-center items-center shadow-md">
              <span className="font-bold text-xl mb-2 text-center leading-tight">Pending<br/>order</span>
              <span className="font-bold text-2xl">{pendingOrders}</span>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button className="bg-[#009245] text-white text-lg font-medium px-16 py-3 rounded-xl shadow-md hover:bg-opacity-90 w-full max-w-sm">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
