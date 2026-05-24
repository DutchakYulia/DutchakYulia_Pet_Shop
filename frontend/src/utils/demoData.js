export const demoCategories = [
  { id: 1, name: "Корми", slug: "food" },
  { id: 2, name: "Іграшки", slug: "toys" },
  { id: 3, name: "Аксесуари", slug: "accessories" },
  { id: 4, name: "Догляд", slug: "care" }
];

export const demoProducts = [
  {
    id: 1,
    category_id: 1,
    category_name: "Корми",
    name: "Royal Canin Adult Cat",
    description: "Повнораціонний корм для дорослих котів.",
    price: 980,
    stock: 24,
    image_url: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=900&q=80",
    animal_type: "cat",
    brand: "Royal Canin",
    weight: "2 кг",
    age_group: "adult",
    rating: 4.8,
    is_promo: true,
    promo_price: 899
  },
  {
    id: 2,
    category_id: 1,
    category_name: "Корми",
    name: "Club 4 Paws Dog Medium",
    description: "Сухий корм для собак середніх порід.",
    price: 760,
    stock: 18,
    image_url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80",
    animal_type: "dog",
    brand: "Club 4 Paws",
    weight: "5 кг",
    age_group: "adult",
    rating: 4.6,
    is_promo: false
  },
  {
    id: 3,
    category_id: 2,
    category_name: "Іграшки",
    name: "Мотузкова іграшка",
    description: "Міцна іграшка для активних собак.",
    price: 180,
    stock: 40,
    image_url: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=900&q=80",
    animal_type: "dog",
    brand: "PetFun",
    rating: 4.4,
    is_promo: false
  },
  {
    id: 4,
    category_id: 3,
    category_name: "Аксесуари",
    name: "Переноска Comfort",
    description: "Легка переноска для котів і малих собак.",
    price: 1250,
    stock: 7,
    image_url: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=900&q=80",
    animal_type: "cat",
    brand: "Trixie",
    rating: 4.7,
    is_promo: true,
    promo_price: 1099
  }
];
