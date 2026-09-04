import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('/api/auth/users', config);
        // Filter out admins if you want, or show everyone
        setUsers(data.filter(u => u.role !== 'admin'));
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl border border-gray-400 rounded-[40px] py-6 px-10 bg-white mb-10 shadow-sm text-center">
        <h2 className="text-3xl font-extrabold text-black">All the Customers Information</h2>
      </div>

      <div className="w-full max-w-5xl bg-white border border-gray-400 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-400 bg-gray-50">
              <th className="py-4 px-6 font-bold text-lg border-r border-gray-400 text-center w-1/3">Name</th>
              <th className="py-4 px-6 font-bold text-lg border-r border-gray-400 text-center w-1/3">Phone Number</th>
              <th className="py-4 px-6 font-bold text-lg text-center w-1/3">Email</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3" className="py-10 text-center">Loading customers...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan="3" className="py-10 text-center text-gray-500">No customers found.</td></tr>
            ) : (
              users.map(customer => (
                <tr key={customer._id} className="border-b border-gray-400 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-bold text-center border-r border-gray-400">{customer.name}</td>
                  <td className="py-4 px-6 font-bold text-center border-r border-gray-400">{customer.phone}</td>
                  <td className="py-4 px-6 font-bold text-center border-gray-400">{customer.email || 'No Email'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
