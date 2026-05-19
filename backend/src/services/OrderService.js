class OrderService {
  constructor(orderRepository, discountContext) {
    this.orderRepository = orderRepository;
    this.discountContext = discountContext;
  }

  async createFromCart(userId, customer, items) {
    const total = items.reduce((sum, item) => sum + Number(item.product.current_price) * item.quantity, 0);
    const orderDraft = { total, promoCode: customer.promoCode };
    const discount = this.discountContext.calculate(orderDraft);
    return this.orderRepository.createWithItems({
      userId,
      items,
      total,
      discount,
      finalTotal: Math.max(total - discount, 0),
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      comment: customer.comment,
      deliveryMethod: customer.deliveryMethod || "nova_poshta",
      paymentMethod: customer.paymentMethod || "cash_on_delivery",
      promoCode: customer.promoCode || null
    });
  }

  async myOrders(userId) {
    return this.orderRepository.findByUser(userId);
  }

  async adminOrders(filters) {
    return this.orderRepository.findAll(filters);
  }

  async updateStatus(id, status) {
    return this.orderRepository.updateStatus(id, status);
  }
}

module.exports = OrderService;
