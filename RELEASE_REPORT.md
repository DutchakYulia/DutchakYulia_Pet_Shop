# Звіт: реліз, логування та аналітика

## Виконані кроки

1. Перевірено Git-репозиторій і робочу гілку. Проєкт знаходиться на гілці `release-v1.0`.
2. Додано базове backend-логування:
   - створено `backend/src/utils/logger.js`;
   - підключено `morgan` для HTTP-запитів у форматі `combined`;
   - додано лог запуску сервера;
   - додано логування помилок у middleware `errorHandler`.
3. Додано frontend-аналітику Google Analytics:
   - створено `frontend/src/utils/analytics.js`;
   - аналітика вмикається через змінну `VITE_GA_MEASUREMENT_ID`;
   - додано відстеження переглядів сторінок через React Router;
   - додано події `add_to_cart`, `update_cart`, `clear_cart`, `login`, `sign_up`, `logout`, `ui_error`.
4. Перевірено збірку frontend командою `npm run build --workspace frontend`.
5. Створено релізний коміт і annotated tag `v1.0`.

## Як перевірити

1. Запустити backend:

```bash
npm run start --workspace backend
```

У консолі має з'явитися JSON-лог `server_started`. Після запитів до API мають з'являтися логи `http_request`, а після помилок - `request_failed`.

2. Запустити frontend з Google Analytics Measurement ID:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX npm run dev --workspace frontend
```

У Google Analytics DebugView або Realtime можна перевірити `page_view` та події користувача. Якщо `VITE_GA_MEASUREMENT_ID` не задано, застосунок працює без відправлення аналітики.

## Основні труднощі

- Для реального підтвердження збору Google Analytics потрібен чинний Measurement ID і доступ до відповідного GA4 ресурсу.
- Локальна перевірка backend може потребувати налаштованої PostgreSQL бази та `.env`.
- У frontend використано безпечну інтеграцію без додаткової npm-залежності, тому аналітика не блокує роботу додатку, якщо змінна середовища відсутня.

## Висновки

Релізна гілка і тег допомагають зафіксувати стабільний стан продукту та швидко повернутися до конкретної версії. Логування спрощує пошук причин помилок і дає видимість роботи API. Аналітика показує, як користувачі реально взаємодіють із застосунком, тому допомагає приймати рішення щодо покращення функцій, UX і стабільності продукту.
