import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import Orders from './pages/admin/Orders';
import Customers from './pages/admin/Customers';
import ProductsManager from './pages/admin/ProductsManager';
import SocialMedia from './pages/admin/SocialMedia';
import AdminSettings from './pages/admin/AdminSettings';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ShopLocation from './pages/ShopLocation';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import TrackOrder from './pages/TrackOrder';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Admin Routes (No default Navbar/Footer) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/orders" replace />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="products" element={<ProductsManager />} />
            <Route path="social" element={<SocialMedia />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          
          {/* Customer Routes */}
          <Route path="/*" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/shop-location" element={<ShopLocation />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/track" element={<TrackOrder />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                  {/* Other routes will be added in future phases */}
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
