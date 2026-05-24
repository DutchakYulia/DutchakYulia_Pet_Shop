class ReviewRepository {
  constructor(db) {
    this.db = db;
  }

  async byProduct(productId) {
    const { rows } = await this.db.query(
      `SELECT r.*, u.name AS user_name FROM reviews r JOIN users u ON u.id = r.user_id
       WHERE r.product_id = $1 AND r.approved = true ORDER BY r.created_at DESC`,
      [productId]
    );
    return rows;
  }

  async create(userId, productId, data) {
    const { rows } = await this.db.query(
      `INSERT INTO reviews (user_id, product_id, rating, body, approved)
       VALUES ($1,$2,$3,$4,false) RETURNING *`,
      [userId, productId, data.rating, data.body]
    );
    return rows[0];
  }
}

module.exports = ReviewRepository;
