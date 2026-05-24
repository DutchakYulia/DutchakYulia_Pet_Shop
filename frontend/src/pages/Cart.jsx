import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { items, update, total } = useCart();

  if (!items.length) {
    return <div className="panel"><h1 className="text-2xl font-bold">Кошик порожній</h1><Link className="primary mt-4 inline-flex" to="/">До каталогу</Link></div>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <section className="space-y-3">
        <h1 className="text-2xl font-bold">Кошик</h1>
        {items.map(({ product, quantity }) => {
          const price = product.is_promo && product.promo_price ? product.promo_price : product.price;
          return (
            <article className="card grid gap-4 p-4 sm:grid-cols-[120px_1fr_auto]" key={product.id}>
              <img className="aspect-square rounded-md object-cover" src={product.image_url} alt={product.name} />
              <div>
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-sm text-slate-600">{Number(price).toFixed(0)} грн за одиницю</p>
                <div className="mt-3 flex items-center gap-2">
                  <button className="icon-button" onClick={() => update(product.id, quantity - 1)}><Minus size={16} /></button>
                  <span className="w-10 text-center">{quantity}</span>
                  <button className="icon-button" onClick={() => update(product.id, quantity + 1)}><Plus size={16} /></button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <strong>{(Number(price) * quantity).toFixed(0)} грн</strong>
                <button className="icon-button" onClick={() => update(product.id, 0)}><Trash2 size={16} /></button>
              </div>
            </article>
          );
        })}
      </section>
      <aside className="panel h-fit">
        <p className="text-slate-600">Загальна сума</p>
        <strong className="mt-2 block text-3xl">{total.toFixed(0)} грн</strong>
        <Link className="primary mt-5 flex w-full" to="/checkout">Оформити замовлення</Link>
      </aside>
    </div>
  );
}
