class CheckoutFacade {
  constructor(productService, orderService, notificationService) {
    this.productService = productService;
    this.orderService = orderService;
    this.notificationService = notificationService;
  }

  async checkout(user, payload) {
    if (!payload.items || !payload.items.length) throw new Error("Cart is empty");
    const items = await this.productService.checkAvailability(payload.items);
    const order = await this.orderService.createFromCart(user.id, payload.customer, items);
    await this.notificationService.send("email", user, `Order #${order.id} created`);
    return order;
  }
}

module.exports = CheckoutFacade;
