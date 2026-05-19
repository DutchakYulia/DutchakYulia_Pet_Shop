import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  async function submit(event) {
    event.preventDefault();
    await register(form);
    navigate("/account");
  }

  return (
    <form className="panel mx-auto max-w-md" onSubmit={submit}>
      <h1 className="text-2xl font-bold">Реєстрація</h1>
      {["name", "email", "phone", "password"].map((field) => (
        <label key={field}>
          <span className="label">{field}</span>
          <input className="input" type={field === "password" ? "password" : "text"} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
        </label>
      ))}
      <button className="primary mt-5 w-full">Зареєструватися</button>
    </form>
  );
}
