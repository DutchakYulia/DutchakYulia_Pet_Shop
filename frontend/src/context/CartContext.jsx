import React, { createContext, useContext, useMemo, useState } from "react";
import { trackEvent } from "../utils/analytics";

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
    trackEvent("add_to_cart", {
      item_id: product.id,
      item_name: product.name,
      value: Number(product.is_promo && product.promo_price ? product.promo_price : product.price)
    });
  }

  function update(productId, quantity) {
    persist(items.map((item) => item.product.id === productId ? { ...item, quantity } : item).filter((item) => item.quantity > 0));
    trackEvent("update_cart", { item_id: productId, quantity });
  }

  function clear() {
    persist([]);
    trackEvent("clear_cart");
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
