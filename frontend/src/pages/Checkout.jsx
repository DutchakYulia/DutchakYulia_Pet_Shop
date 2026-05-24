import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/http";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Checkout() {
  const { user } = useAuth();
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: "",
    deliveryMethod: "nova_poshta",
    paymentMethod: "cash_on_delivery",
    promoCode: ""
  });

  async function submit(event) {
    event.preventDefault();
    await api("/checkout", {
      method: "POST",
      body: JSON.stringify({
        customer: form,
        items: items.map((item) => ({ productId: item.product.id, quantity: item.quantity }))
      })
    });
    clear();
    navigate("/account");
  }

  return (
    <form className="grid gap-6 lg:grid-cols-[1fr_320px]" onSubmit={submit}>
      <section className="panel">
        <h1 className="text-2xl font-bold">Оформлення замовлення</h1>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Ім'я" value={form.name} onChange={(name) => setForm({ ...form, name })} />
          <Field label="Телефон" value={form.phone} onChange={(phone) => setForm({ ...form, phone })} />
          <Field label="Адреса доставки" value={form.address} onChange={(address) => setForm({ ...form, address })} wide />
          <Select label="Доставка" value={form.deliveryMethod} onChange={(deliveryMethod) => setForm({ ...form, deliveryMethod })} options={["nova_poshta", "courier", "pickup"]} />
          <Select label="Оплата" value={form.paymentMethod} onChange={(paymentMethod) => setForm({ ...form, paymentMethod })} options={["cash_on_delivery", "card_mock"]} />
          <Field label="Промокод" value={form.promoCode} onChange={(promoCode) => setForm({ ...form, promoCode })} />
        </div>
      </section>
      <aside className="panel h-fit">
        <p className="text-slate-600">До сплати з урахуванням можливої знижки</p>
        <strong className="mt-2 block text-3xl">{total.toFixed(0)} грн</strong>
        <button className="primary mt-5 w-full" disabled={!items.length}>Підтвердити</button>
      </aside>
    </form>
  );
}

function Field({ label, value, onChange, wide }) {
  return <label className={wide ? "sm:col-span-2" : ""}><span className="label">{label}</span><input required className="input" value={value} onChange={(e) => onChange(e.target.value)} /></label>;
}

function Select({ label, value, onChange, options }) {
  return <label><span className="label">{label}</span><select className="input" value={value} onChange={(e) => onChange(e.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
