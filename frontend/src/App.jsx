import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Catalog from "./pages/Catalog.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Account from "./pages/Account.jsx";
import Admin from "./pages/Admin.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-[#f7faf8] text-ink">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  );
}
