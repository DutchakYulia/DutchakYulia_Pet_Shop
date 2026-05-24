class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  mine = async (req, res, next) => {
    try {
      res.json({ success: true, data: await this.orderService.myOrders(req.user.id) });
    } catch (error) {
      next(error);
    }
  };

  adminIndex = async (req, res, next) => {
    try {
      res.json({ success: true, data: await this.orderService.adminOrders(req.query) });
    } catch (error) {
      next(error);
    }
  };

  updateStatus = async (req, res, next) => {
    try {
      res.json({ success: true, data: await this.orderService.updateStatus(req.params.id, req.body.status) });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = OrderController;
