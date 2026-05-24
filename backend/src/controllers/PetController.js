class PetController {
  constructor(petService) {
    this.petService = petService;
  }

  index = async (req, res, next) => {
    try {
      res.json({ success: true, data: await this.petService.list(req.user.id) });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      res.status(201).json({ success: true, data: await this.petService.create(req.user.id, req.body) });
    } catch (error) {
      next(error);
    }
  };

  recommendations = async (req, res, next) => {
    try {
      res.json({ success: true, data: await this.petService.recommendations(req.user.id) });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = PetController;
