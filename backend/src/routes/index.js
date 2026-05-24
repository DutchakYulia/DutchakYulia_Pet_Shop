const express = require("express");
const { auth, adminOnly } = require("../middlewares/auth");

function createRoutes(container) {
  const router = express.Router();
  const authController = container.get("authController");
  const productController = container.get("productController");
  const checkoutController = container.get("checkoutController");
  const orderController = container.get("orderController");
  const petController = container.get("petController");

  router.get("/health", (_req, res) => res.json({ success: true, data: "ok" }));

  router.post("/auth/register", authController.register);
  router.post("/auth/login", authController.login);
  router.get("/auth/me", auth(), authController.me);

  router.get("/categories", productController.categories);
  router.get("/products", productController.getAll);
  router.get("/products/:id", productController.getById);
  router.post("/products/:id/reviews", auth(), productController.review);
  router.get("/favorites", auth(), productController.favorites);
  router.post("/products/:id/favorite", auth(), productController.toggleFavorite);

  router.get("/pets", auth(), petController.index);
  router.post("/pets", auth(), petController.create);
  router.get("/pets/recommendations", auth(), petController.recommendations);

  router.post("/checkout", auth(), checkoutController.create);
  router.get("/orders", auth(), orderController.mine);

  router.get("/admin/orders", auth(), adminOnly, orderController.adminIndex);
  router.patch("/admin/orders/:id/status", auth(), adminOnly, orderController.updateStatus);
  router.post("/admin/products", auth(), adminOnly, productController.create);
  router.put("/admin/products/:id", auth(), adminOnly, productController.update);

  return router;
}

module.exports = createRoutes;
