import React from "react";
import { Heart, LogOut, PawPrint, ShoppingCart, UserRound } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Header() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
        <Link to="/" className="mr-auto flex items-center gap-2 text-xl font-bold text-leaf">
          <PawPrint size={26} />
          PetShop
        </Link>
        <NavLink className="nav-link" to="/">Каталог</NavLink>
        <NavLink className="nav-link" to="/account">Кабінет</NavLink>
        {user?.role === "admin" && <NavLink className="nav-link" to="/admin">Адмін</NavLink>}
        <Link className="icon-link" to="/account" title="Обране"><Heart size={20} /></Link>
        <Link className="icon-link relative" to="/cart" title="Кошик">
          <ShoppingCart size={20} />
          {count > 0 && <span className="badge">{count}</span>}
        </Link>
        {user ? (
          <button className="icon-link" onClick={logout} title="Вийти"><LogOut size={20} /></button>
        ) : (
          <Link className="icon-link" to="/login" title="Увійти"><UserRound size={20} /></Link>
        )}
      </div>
    </header>
  );
}
