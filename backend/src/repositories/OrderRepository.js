const BaseRepository = require("./BaseRepository");

class OrderRepository extends BaseRepository {
  constructor(db) {
    super(db, "orders");
  }

  async createWithItems(data) {
    const client = await this.db.connect();
    try {
      await client.query("BEGIN");
      const orderResult = await client.query(
        `INSERT INTO orders
         (user_id, total, discount, final_total, status, delivery_method, payment_method, name, phone, address, comment, promo_code)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
         RETURNING *`,
        [
          data.userId,
          data.total,
          data.discount,
          data.finalTotal,
          "new",
          data.deliveryMethod,
          data.paymentMethod,
          data.name,
          data.phone,
          data.address,
          data.comment,
          data.promoCode
        ]
      );
      const order = orderResult.rows[0];
      for (const item of data.items) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, quantity, price_snapshot)
           VALUES ($1,$2,$3,$4)`,
          [order.id, item.product.id, item.quantity, item.product.current_price]
        );
        await client.query("UPDATE products SET stock = GREATEST(stock - $1, 0) WHERE id = $2", [
          item.quantity,
          item.product.id
        ]);
      }
      await client.query("COMMIT");
      return order;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async findByUser(userId) {
    const { rows } = await this.db.query(
      `SELECT o.*, COALESCE(json_agg(json_build_object(
        'productId', oi.product_id,
        'name', p.name,
        'quantity', oi.quantity,
        'price', oi.price_snapshot
      )) FILTER (WHERE oi.id IS NOT NULL), '[]') AS items
       FROM orders o
       LEFT JOIN order_items oi ON oi.order_id = o.id
       LEFT JOIN products p ON p.id = oi.product_id
       WHERE o.user_id = $1
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [userId]
    );
    return rows;
  }

  async findAll(filters = {}) {
    const params = [];
    const where = [];
    if (filters.q) {
      params.push(`%${filters.q}%`);
      where.push(`(o.name ILIKE $${params.length} OR o.phone ILIKE $${params.length})`);
    }
    const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const { rows } = await this.db.query(
      `SELECT o.*, u.email FROM orders o JOIN users u ON u.id = o.user_id ${clause} ORDER BY o.created_at DESC`,
      params
    );
    return rows;
  }

  async updateStatus(id, status) {
    const { rows } = await this.db.query(
      "UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [status, id]
    );
    return rows[0] || null;
  }
}

module.exports = OrderRepository;
