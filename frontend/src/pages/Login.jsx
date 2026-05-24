import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(event) {
    event.preventDefault();
    await login(email, password);
    navigate("/account");
  }

  return (
    <form className="panel mx-auto max-w-md" onSubmit={submit}>
      <h1 className="text-2xl font-bold">Вхід</h1>
      <label className="label mt-5">Email</label>
      <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label className="label">Пароль</label>
      <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="primary mt-5 w-full">Увійти</button>
      <Link className="mt-4 block text-center text-leaf" to="/register">Створити акаунт</Link>
    </form>
  );
}
