class ProductService {
  constructor(productRepository, categoryRepository, reviewRepository) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
    this.reviewRepository = reviewRepository;
  }

  async getProducts(filters) {
    return this.productRepository.findAll(filters);
  }

  async getProduct(id) {
    const product = await this.productRepository.findDetails(id);
    if (!product) throw new Error("Product not found");
    const [reviews, recommendations] = await Promise.all([
      this.reviewRepository.byProduct(id),
      this.productRepository.recommendations(product)
    ]);
    return { ...product, reviews, recommendations };
  }

  async getCategories() {
    return this.categoryRepository.findAll();
  }

  async createProduct(data) {
    this.validateProduct(data);
    const category = await this.categoryRepository.findById(data.categoryId);
    if (!category) throw new Error("Category does not exist");
    return this.productRepository.create(data);
  }

  async updateProduct(id, data) {
    this.validateProduct(data);
    return this.productRepository.update(id, data);
  }

  async checkAvailability(items) {
    const products = [];
    for (const item of items) {
      const product = await this.productRepository.findDetails(item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      if (product.stock < item.quantity) throw new Error(`${product.name} is out of stock`);
      products.push({
        product: { ...product, current_price: product.is_promo && product.promo_price ? product.promo_price : product.price },
        quantity: item.quantity
      });
    }
    return products;
  }

  async addReview(userId, productId, data) {
    if (!Number.isInteger(Number(data.rating)) || Number(data.rating) < 1 || Number(data.rating) > 5) {
      throw new Error("Rating must be from 1 to 5");
    }
    if (!data.body || data.body.trim().length < 3) throw new Error("Review text is required");
    return this.reviewRepository.create(userId, productId, data);
  }

  validateProduct(data) {
    if (!data.name || data.name.trim().length < 2) throw new Error("Product name is too short");
    if (Number(data.price) <= 0) throw new Error("Product price must be positive");
    if (!data.categoryId) throw new Error("Category is required");
  }
}

module.exports = ProductService;
