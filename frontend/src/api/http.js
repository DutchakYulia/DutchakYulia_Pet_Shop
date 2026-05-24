const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function api(path, options = {}) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });
  const payload = await response.json();
  if (!response.ok || !payload.success) throw new Error(payload.message || "API error");
  return payload.data;
}
