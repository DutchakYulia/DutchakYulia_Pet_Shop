import React from "react";
import { useEffect, useState } from "react";
import { api } from "../api/http";
import { useAuth } from "../context/AuthContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function Account() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [pets, setPets] = useState([]);
  const [pet, setPet] = useState({ name: "", species: "cat", breed: "", age: "", weight: "", nutritionNotes: "" });

  useEffect(() => {
    if (!user) return;
    api("/orders").then(setOrders);
    api("/favorites").then(setFavorites);
    api("/pets").then(setPets);
  }, [user]);

  async function addPet(event) {
    event.preventDefault();
    const created = await api("/pets", { method: "POST", body: JSON.stringify(pet) });
    setPets([created, ...pets]);
  }

  if (!user) return <div className="panel">Увійдіть, щоб переглянути особистий кабінет.</div>;

  return (
    <div className="space-y-8">
      <section className="panel">
        <h1 className="text-2xl font-bold">Особистий кабінет</h1>
        <p className="mt-1 text-slate-600">{user.email}</p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Історія замовлень</h2>
        <div className="grid gap-3">
          {orders.map((order) => <div className="card p-4" key={order.id}>#{order.id} · {order.status} · {Number(order.final_total).toFixed(0)} грн</div>)}
          {!orders.length && <div className="panel">Замовлень поки немає.</div>}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Профілі тварин</h2>
        <form className="panel grid gap-3 md:grid-cols-6" onSubmit={addPet}>
          <input className="input md:col-span-2" placeholder="Ім'я" value={pet.name} onChange={(e) => setPet({ ...pet, name: e.target.value })} />
          <select className="input" value={pet.species} onChange={(e) => setPet({ ...pet, species: e.target.value })}><option>cat</option><option>dog</option><option>bird</option><option>rodent</option><option>fish</option></select>
          <input className="input" placeholder="Порода" value={pet.breed} onChange={(e) => setPet({ ...pet, breed: e.target.value })} />
          <input className="input" placeholder="Вік" value={pet.age} onChange={(e) => setPet({ ...pet, age: e.target.value })} />
          <button className="primary">Додати</button>
        </form>
        <div className="mt-3 flex flex-wrap gap-2">{pets.map((p) => <span className="tag" key={p.id}>{p.name} · {p.species}</span>)}</div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Обране</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {favorites.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  );
}
