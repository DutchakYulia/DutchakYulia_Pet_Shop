const ServiceLocator = require("../core/ServiceLocator");
const createDatabaseConnection = require("./database");
const ProductRepository = require("../repositories/ProductRepository");
const CategoryRepository = require("../repositories/CategoryRepository");
const UserRepository = require("../repositories/UserRepository");
const OrderRepository = require("../repositories/OrderRepository");
const FavoriteRepository = require("../repositories/FavoriteRepository");
const PetRepository = require("../repositories/PetRepository");
const ReviewRepository = require("../repositories/ReviewRepository");
const ProductService = require("../services/ProductService");
const AuthService = require("../services/AuthService");
const OrderService = require("../services/OrderService");
const FavoriteService = require("../services/FavoriteService");
const PetService = require("../services/PetService");
const NotificationService = require("../services/NotificationService");
const NotificationSenderFactory = require("../factories/NotificationSenderFactory");
const CheckoutFacade = require("../facades/CheckoutFacade");
const ProductController = require("../controllers/ProductController");
const AuthController = require("../controllers/AuthController");
const CheckoutController = require("../controllers/CheckoutController");
const OrderController = require("../controllers/OrderController");
const PetController = require("../controllers/PetController");
const {
  DiscountContext,
  RegularCustomerDiscountStrategy,
  PromoCodeDiscountStrategy,
  LargeOrderDiscountStrategy
} = require("../strategies/discount/DiscountStrategy");

function createContainer() {
  const container = new ServiceLocator();
  container.registerSingleton("db", createDatabaseConnection());

  container.registerFactory("productRepository", (c) => new ProductRepository(c.get("db")));
  container.registerFactory("categoryRepository", (c) => new CategoryRepository(c.get("db")));
  container.registerFactory("userRepository", (c) => new UserRepository(c.get("db")));
  container.registerFactory("orderRepository", (c) => new OrderRepository(c.get("db")));
  container.registerFactory("favoriteRepository", (c) => new FavoriteRepository(c.get("db")));
  container.registerFactory("petRepository", (c) => new PetRepository(c.get("db")));
  container.registerFactory("reviewRepository", (c) => new ReviewRepository(c.get("db")));

  container.registerFactory("discountContext", () => new DiscountContext([
    new RegularCustomerDiscountStrategy(),
    new PromoCodeDiscountStrategy(),
    new LargeOrderDiscountStrategy()
  ]));
  container.registerSingleton("notificationSenderFactory", NotificationSenderFactory);

  container.registerFactory("productService", (c) => new ProductService(
    c.get("productRepository"),
    c.get("categoryRepository"),
    c.get("reviewRepository")
  ));
  container.registerFactory("authService", (c) => new AuthService(c.get("userRepository")));
  container.registerFactory("orderService", (c) => new OrderService(c.get("orderRepository"), c.get("discountContext")));
  container.registerFactory("favoriteService", (c) => new FavoriteService(c.get("favoriteRepository")));
  container.registerFactory("petService", (c) => new PetService(c.get("petRepository"), c.get("productRepository")));
  container.registerFactory("notificationService", (c) => new NotificationService(c.get("notificationSenderFactory")));
  container.registerFactory("checkoutFacade", (c) => new CheckoutFacade(
    c.get("productService"),
    c.get("orderService"),
    c.get("notificationService")
  ));

  container.registerFactory("productController", (c) => new ProductController(c.get("productService"), c.get("favoriteService")));
  container.registerFactory("authController", (c) => new AuthController(c.get("authService")));
  container.registerFactory("checkoutController", (c) => new CheckoutController(c.get("checkoutFacade")));
  container.registerFactory("orderController", (c) => new OrderController(c.get("orderService")));
  container.registerFactory("petController", (c) => new PetController(c.get("petService")));

  return container;
}

module.exports = createContainer;
