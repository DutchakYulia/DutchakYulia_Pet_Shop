import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("cart") || "[]"));

  function persist(next) {
    setItems(next);
    localStorage.setItem("cart", JSON.stringify(next));
  }

  function add(product) {
    const existing = items.find((item) => item.product.id === product.id);
    const next = existing
      ? items.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...items, { product, quantity: 1 }];
    persist(next);
  }

  function update(productId, quantity) {
    persist(items.map((item) => item.product.id === productId ? { ...item, quantity } : item).filter((item) => item.quantity > 0));
  }

  function clear() {
    persist([]);
  }

  const total = items.reduce((sum, item) => {
    const price = item.product.is_promo && item.product.promo_price ? item.product.promo_price : item.product.price;
    return sum + Number(price) * item.quantity;
  }, 0);

  const value = useMemo(() => ({ items, add, update, clear, total }), [items, total]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
