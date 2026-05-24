INSERT INTO categories (name, slug, animal_type) VALUES
  ('Корми', 'food', NULL),
  ('Іграшки', 'toys', NULL),
  ('Аксесуари', 'accessories', NULL),
  ('Догляд', 'care', NULL),
  ('Ліки та вітаміни', 'health', NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO users (name, email, phone, password_hash, role) VALUES
  ('Admin', 'admin@petshop.local', '+380000000000', '$2b$10$5lh1c7VEyN27Pz3kCqzHTO4mGCpHA3af3u1W2VOxcSDEoAAgQWv2W', 'admin')
ON CONFLICT (email) DO NOTHING;

INSERT INTO products
(category_id, name, description, price, stock, image_url, animal_type, brand, weight, age_group, popularity, is_promo, promo_price)
VALUES
  (1, 'Royal Canin Adult Cat', 'Повнораціонний корм для дорослих котів.', 980, 24, 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=900&q=80', 'cat', 'Royal Canin', '2 кг', 'adult', 90, true, 899),
  (1, 'Club 4 Paws Dog Medium', 'Сухий корм для собак середніх порід.', 760, 18, 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80', 'dog', 'Club 4 Paws', '5 кг', 'adult', 75, false, NULL),
  (2, 'Мотузкова іграшка', 'Міцна іграшка для активних собак.', 180, 40, 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=900&q=80', 'dog', 'PetFun', NULL, 'all', 52, false, NULL),
  (3, 'Переноска Comfort', 'Легка переноска для котів і малих собак.', 1250, 7, 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=900&q=80', 'cat', 'Trixie', NULL, 'all', 44, true, 1099),
  (4, 'Шампунь Sensitive', 'Гіпоалергенний шампунь для догляду.', 240, 32, 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=80', 'dog', 'Beaphar', '250 мл', 'all', 38, false, NULL),
  (5, 'Вітаміни для птахів VitaBird', 'Комплекс вітамінів для щоденного догляду.', 160, 22, 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?auto=format&fit=crop&w=900&q=80', 'bird', 'VitaBird', '50 г', 'all', 31, false, NULL)
ON CONFLICT DO NOTHING;
