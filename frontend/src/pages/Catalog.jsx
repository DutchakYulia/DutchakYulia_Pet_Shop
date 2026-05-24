import React from "react";
import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { api } from "../api/http";
import ProductCard from "../components/ProductCard.jsx";
import { demoCategories, demoProducts } from "../utils/demoData.js";

const animals = ["cat", "dog", "bird", "rodent", "fish"];

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ sort: "newest" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/categories").then(setCategories).catch(() => setCategories(demoCategories));
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(Object.entries(filters).filter(([, value]) => value)).toString();
    setLoading(true);
    api(`/products?${query}`)
      .then(setProducts)
      .catch(() => setProducts(filterDemoProducts(filters)))
      .finally(() => setLoading(false));
  }, [filters]);

  function setField(field, value) {
    setFilters((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="panel h-fit">
        <div className="mb-4 flex items-center gap-2 font-semibold"><SlidersHorizontal size={18} /> Фільтри</div>
        <label className="label">Пошук</label>
        <div className="input-wrap"><Search size={18} /><input onChange={(e) => setField("q", e.target.value)} placeholder="Назва, бренд..." /></div>
        <label className="label">Категорія</label>
        <select className="input" onChange={(e) => setField("categoryId", e.target.value)}>
          <option value="">Усі</option>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        <label className="label">Тварина</label>
        <select className="input" onChange={(e) => setField("animalType", e.target.value)}>
          <option value="">Усі</option>
          {animals.map((animal) => <option key={animal} value={animal}>{animal}</option>)}
        </select>
        <label className="label">Ціна</label>
        <div className="grid grid-cols-2 gap-2">
          <input className="input" placeholder="від" onChange={(e) => setField("minPrice", e.target.value)} />
          <input className="input" placeholder="до" onChange={(e) => setField("maxPrice", e.target.value)} />
        </div>
        <label className="label">Сортування</label>
        <select className="input" value={filters.sort} onChange={(e) => setField("sort", e.target.value)}>
          <option value="newest">Нові</option>
          <option value="price_asc">Ціна зростає</option>
          <option value="price_desc">Ціна спадає</option>
          <option value="rating">Рейтинг</option>
          <option value="popular">Популярність</option>
        </select>
        <button className="secondary mt-4 w-full" onClick={() => setFilters({ sort: "newest" })}><X size={18} /> Скинути</button>
      </aside>

      <section>
        <div className="mb-5">
          <h1 className="text-3xl font-bold">Каталог товарів для тварин</h1>
          <p className="mt-1 text-slate-600">Корми, іграшки, аксесуари, догляд і вітаміни з пошуком та фільтрами.</p>
        </div>
        {loading ? <div className="panel">Завантаження...</div> : products.length === 0 ? (
          <div className="panel">Товарів за вибраними умовами не знайдено.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </section>
    </div>
  );
}

function filterDemoProducts(filters) {
  return demoProducts.filter((product) => {
    if (filters.q && !`${product.name} ${product.brand} ${product.description}`.toLowerCase().includes(filters.q.toLowerCase())) return false;
    if (filters.categoryId && String(product.category_id) !== String(filters.categoryId)) return false;
    if (filters.animalType && product.animal_type !== filters.animalType) return false;
    if (filters.minPrice && Number(product.price) < Number(filters.minPrice)) return false;
    if (filters.maxPrice && Number(product.price) > Number(filters.maxPrice)) return false;
    return true;
  });
}
