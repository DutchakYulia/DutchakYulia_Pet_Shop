class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res, next) => {
    try {
      res.status(201).json({ success: true, data: await this.authService.register(req.body) });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      res.json({ success: true, data: await this.authService.login(req.body) });
    } catch (error) {
      next(error);
    }
  };

  me = (req, res) => {
    res.json({ success: true, data: req.user });
  };
}

module.exports = AuthController;
