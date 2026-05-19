import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { api } from "../api/http";
import ProductCard from "../components/ProductCard.jsx";
import { useCart } from "../context/CartContext.jsx";
import { demoProducts } from "../utils/demoData.js";

export default function Product() {
  const { id } = useParams();
  const { add } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api(`/products/${id}`)
      .then(setProduct)
      .catch(() => {
        const product = demoProducts.find((item) => String(item.id) === String(id));
        if (product) setProduct({ ...product, reviews: [], recommendations: demoProducts.filter((item) => item.id !== product.id).slice(0, 4) });
      });
  }, [id]);

  if (!product) return <div className="panel">Завантаження...</div>;
  const price = product.is_promo && product.promo_price ? product.promo_price : product.price;

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <img className="aspect-[4/3] w-full rounded-lg object-cover" src={product.image_url} alt={product.name} />
        <div className="panel">
          <p className="text-sm text-leaf">{product.category_name} · {product.animal_type}</p>
          <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm"><Star size={18} className="fill-coral text-coral" /> {product.rating}</div>
          <p className="mt-4 text-slate-700">{product.description}</p>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <Info label="Бренд" value={product.brand} />
            <Info label="Вага" value={product.weight || "-"} />
            <Info label="Вік" value={product.age_group || "-"} />
            <Info label="Наявність" value={product.stock > 0 ? `${product.stock} шт.` : "Немає"} />
          </dl>
          <div className="mt-6 flex items-center justify-between gap-4">
            <strong className="text-3xl">{Number(price).toFixed(0)} грн</strong>
            <button className="primary" disabled={product.stock < 1} onClick={() => add(product)}><ShoppingCart size={18} /> Додати</button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Відгуки</h2>
        <div className="grid gap-3">
          {product.reviews.length ? product.reviews.map((review) => (
            <div className="card p-4" key={review.id}>
              <strong>{review.user_name}</strong>
              <span className="ml-2 text-coral">{review.rating}/5</span>
              <p className="mt-1 text-slate-700">{review.body}</p>
            </div>
          )) : <div className="panel">Поки немає затверджених відгуків.</div>}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Рекомендації</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {product.recommendations.map((item) => <ProductCard key={item.id} product={item} />)}
        </div>
      </section>
    </div>
  );
}

function Info({ label, value }) {
  return <div className="rounded-md bg-slate-50 p-3"><dt className="text-slate-500">{label}</dt><dd className="font-medium">{value}</dd></div>;
}
