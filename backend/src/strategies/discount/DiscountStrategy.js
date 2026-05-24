class NoDiscountStrategy {
  calculate() {
    return 0;
  }
}

class RegularCustomerDiscountStrategy {
  calculate(order) {
    return order.total > 0 ? order.total * 0.05 : 0;
  }
}

class PromoCodeDiscountStrategy {
  calculate(order) {
    return order.promoCode ? order.total * 0.1 : 0;
  }
}

class LargeOrderDiscountStrategy {
  calculate(order) {
    return order.total >= 3000 ? order.total * 0.15 : 0;
  }
}

class DiscountContext {
  constructor(strategies = []) {
    this.strategies = strategies.length ? strategies : [new NoDiscountStrategy()];
  }

  calculate(order) {
    return Math.max(...this.strategies.map((strategy) => strategy.calculate(order)));
  }
}

module.exports = {
  NoDiscountStrategy,
  RegularCustomerDiscountStrategy,
  PromoCodeDiscountStrategy,
  LargeOrderDiscountStrategy,
  DiscountContext
};
