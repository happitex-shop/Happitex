import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('cartItems');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product._id === product._id);
      if (existing) {
        return prev.map(item => 
          item.product._id === product._id 
            ? { ...item, qty: item.qty + qty } 
            : item
        );
      }
      return [...prev, { product, qty }];
    });
  };

  const updateQty = (productId, qty) => {
    if (qty < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.product._id === productId ? { ...item, qty } : item
    ));
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product._id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.qty), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeFromCart, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};
