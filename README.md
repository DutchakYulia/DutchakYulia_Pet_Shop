Pet Shop - awdawfafafwafwascascxzcscs version

Full-stack MVP з лабораторних робіт: веб-застосунок зоомагазину на React + Tailwind CSS, Node.js + Express, REST API та PostgreSQL.

## Стекc

- Frontend: React, Vite, Tailwind CSS, React Router, lucide-react.
- Backend: Node.js, Express.js, PostgreSQL `pg`, JWT, bcrypt.
- Архітектура backend: Controllers -> Services -> Repositories -> Database.
- DI: власний `ServiceLocator`.
- Патерни: `Facade` для checkout, `Strategy` для знижок, `Factory Method` для каналів повідомлень.
d
## Функціонал

- Каталог товарів із пошуком, фільтрами за категорією, твариною, ціною та сортуванням.
- Детальна сторінка товару з характеристиками, наявністю, відгуками й рекомендаціями.
- Кошик у `localStorage`, зміна кількості, видалення позицій і підсумок.
- Оформлення замовлення з контактами, доставкою, оплатою та промокодом.
- Реєстрація, авторизація, JWT-захищені маршрути.
- Особистий кабінет: історія замовлень, обрані товари, профілі домашніх тварин.
- Персональні рекомендації на основі профілю тварини.
- Адмін-панель для перегляду замовлень і зміни статусів.

## Запуск

1. Створити PostgreSQL базу `petshop`.
2. Виконати SQL:

```bash
psql -d petshop -f database/migrations/001_init.sql
psql -d petshop -f database/seeds/001_seed.sql
```

3. Налаштувати backend:

```bash
cp backend/.env.example backend/.env
```

4. Встановити залежності й запустити:

```bash
npm install
npm run dev
```

Frontend буде доступний на `http://localhost:5173`, API на `http://localhost:4000/api`.
