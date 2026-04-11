/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useMemo, PropTypes } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem('freshcart_cart');
    return stored ? JSON.parse(stored) : [];
  });

  const [deliveryAddress, setDeliveryAddress] = useState(() => {
    return localStorage.getItem('freshcart_address') || '';
  });

  useEffect(() => {
    localStorage.setItem('freshcart_cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('freshcart_address', deliveryAddress);
  }, [deliveryAddress]);

  const addItem = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const getItemQuantity = (productId) => {
  CartProvider.propTypes = {
    children: PropTypes.node.isRequired
  };
    const item = items.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  const { subtotal, savings, deliveryFee, serviceFee, tax, total, itemCount } =
    useMemo(() => {
      const sub = items.reduce((acc, item) => {
        const price = item.discount
          ? item.price * (1 - item.discount / 100)
          : item.price;
        return acc + price * item.quantity;
      }, 0);

      const sav = items.reduce((acc, item) => {
        if (item.discount) {
          return acc + item.price * (item.discount / 100) * item.quantity;
        }
        return acc;
      }, 0);

      const delivery = sub > 35 ? 0 : 3.99;
      const service = sub * 0.05;
      const txCalc = sub * 0.0825;
      const tot = sub + delivery + service + txCalc;
      const count = items.reduce((acc, item) => acc + item.quantity, 0);

      return {
        subtotal: sub,
        savings: sav,
        deliveryFee: delivery,
        serviceFee: service,
        tax: txCalc,
        total: tot,
        itemCount: count,
      };
    }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemQuantity,
        subtotal,
        savings,
        deliveryFee,
        serviceFee,
        tax,
        total,
        itemCount,
        deliveryAddress,
        setDeliveryAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};