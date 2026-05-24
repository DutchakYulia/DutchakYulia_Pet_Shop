import React from "react";
import { useEffect, useState } from "react";
import { api } from "../api/http";
import { useAuth } from "../context/AuthContext.jsx";

export default function Admin() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.role === "admin") api("/admin/orders").then(setOrders);
  }, [user]);

  async function setStatus(id, status) {
    const updated = await api(`/admin/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
    setOrders(orders.map((order) => order.id === id ? updated : order));
  }

  if (user?.role !== "admin") return <div className="panel">Доступ лише для адміністратора.</div>;

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">Адміністративна панель</h1>
      <div className="grid gap-3">
        {orders.map((order) => (
          <div className="card grid gap-3 p-4 md:grid-cols-[1fr_180px] md:items-center" key={order.id}>
            <div>#{order.id} · {order.name} · {Number(order.final_total).toFixed(0)} грн · {order.email}</div>
            <select className="input" value={order.status} onChange={(e) => setStatus(order.id, e.target.value)}>
              {["new", "processing", "shipped", "done", "canceled"].map((status) => <option key={status}>{status}</option>)}
            </select>
          </div>
        ))}
      </div>
    </section>
  );
}
