class FavoriteRepository {
  constructor(db) {
    this.db = db;
  }

  async list(userId) {
    const { rows } = await this.db.query(
      `SELECT p.* FROM favorites f JOIN products p ON p.id = f.product_id
       WHERE f.user_id = $1 ORDER BY f.created_at DESC`,
      [userId]
    );
    return rows;
  }

  async toggle(userId, productId) {
    const existing = await this.db.query(
      "SELECT id FROM favorites WHERE user_id = $1 AND product_id = $2",
      [userId, productId]
    );
    if (existing.rows[0]) {
      await this.db.query("DELETE FROM favorites WHERE id = $1", [existing.rows[0].id]);
      return { active: false };
    }
    await this.db.query("INSERT INTO favorites (user_id, product_id) VALUES ($1,$2)", [
      userId,
      productId
    ]);
    return { active: true };
  }
}

module.exports = FavoriteRepository;
