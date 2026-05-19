import React from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../api/http";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { add } = useCart();
  const price = product.is_promo && product.promo_price ? product.promo_price : product.price;

  async function favorite() {
    await api(`/products/${product.id}/favorite`, { method: "POST" });
  }

  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <Link to={`/products/${product.id}`} className="block aspect-[4/3] overflow-hidden bg-slate-100">
        <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold">{product.name}</h3>
            <button className="icon-button" onClick={favorite} title="Додати до обраного"><Heart size={18} /></button>
          </div>
          <p className="mt-1 text-sm text-slate-600">{product.brand} · {product.category_name}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Star size={16} className="fill-coral text-coral" />
          {Number(product.rating || 0).toFixed(1)} · {product.animal_type}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          <div>
            <strong className="text-lg">{Number(price).toFixed(0)} грн</strong>
            {product.is_promo && <span className="ml-2 text-sm text-slate-400 line-through">{Number(product.price).toFixed(0)}</span>}
          </div>
          <button className="primary-icon" disabled={product.stock < 1} onClick={() => add(product)} title="Додати в кошик">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
