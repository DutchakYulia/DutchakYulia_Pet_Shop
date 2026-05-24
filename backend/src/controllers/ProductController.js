class ProductController {
  constructor(productService, favoriteService) {
    this.productService = productService;
    this.favoriteService = favoriteService;
  }

  getAll = async (req, res, next) => {
    try {
      const products = await this.productService.getProducts(req.query);
      res.json({ success: true, data: products });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const product = await this.productService.getProduct(req.params.id);
      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  };

  categories = async (_req, res, next) => {
    try {
      res.json({ success: true, data: await this.productService.getCategories() });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      res.status(201).json({ success: true, data: await this.productService.createProduct(req.body) });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      res.json({ success: true, data: await this.productService.updateProduct(req.params.id, req.body) });
    } catch (error) {
      next(error);
    }
  };

  review = async (req, res, next) => {
    try {
      res.status(201).json({
        success: true,
        data: await this.productService.addReview(req.user.id, req.params.id, req.body)
      });
    } catch (error) {
      next(error);
    }
  };

  favorites = async (req, res, next) => {
    try {
      res.json({ success: true, data: await this.favoriteService.list(req.user.id) });
    } catch (error) {
      next(error);
    }
  };

  toggleFavorite = async (req, res, next) => {
    try {
      res.json({ success: true, data: await this.favoriteService.toggle(req.user.id, req.params.id) });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ProductController;
