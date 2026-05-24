class CheckoutController {
  constructor(checkoutFacade) {
    this.checkoutFacade = checkoutFacade;
  }

  create = async (req, res, next) => {
    try {
      const order = await this.checkoutFacade.checkout(req.user, req.body);
      res.status(201).json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CheckoutController;
