const BaseRepository = require("./BaseRepository");

class ProductRepository extends BaseRepository {
  constructor(db) {
    super(db, "products");
  }

  async findAll(filters = {}) {
    const params = [];
    const where = ["p.active = true"];

    if (filters.q) {
      params.push(`%${filters.q}%`);
      where.push(`(p.name ILIKE $${params.length} OR p.brand ILIKE $${params.length} OR p.description ILIKE $${params.length})`);
    }
    if (filters.categoryId) {
      params.push(filters.categoryId);
      where.push(`p.category_id = $${params.length}`);
    }
    if (filters.animalType) {
      params.push(filters.animalType);
      where.push(`p.animal_type = $${params.length}`);
    }
    if (filters.brand) {
      params.push(filters.brand);
      where.push(`p.brand = $${params.length}`);
    }
    if (filters.minPrice) {
      params.push(filters.minPrice);
      where.push(`p.price >= $${params.length}`);
    }
    if (filters.maxPrice) {
      params.push(filters.maxPrice);
      where.push(`p.price <= $${params.length}`);
    }
    if (filters.inStock === "true") {
      where.push("p.stock > 0");
    }

    const sortMap = {
      price_asc: "p.price ASC",
      price_desc: "p.price DESC",
      newest: "p.created_at DESC",
      rating: "rating DESC NULLS LAST",
      popular: "p.popularity DESC"
    };
    const orderBy = sortMap[filters.sort] || "p.created_at DESC";

    const { rows } = await this.db.query(
      `SELECT p.*, c.name AS category_name, COALESCE(AVG(r.rating), 0)::numeric(10,1) AS rating
       FROM products p
       JOIN categories c ON c.id = p.category_id
       LEFT JOIN reviews r ON r.product_id = p.id AND r.approved = true
       WHERE ${where.join(" AND ")}
       GROUP BY p.id, c.name
       ORDER BY ${orderBy}`,
      params
    );
    return rows;
  }

  async findDetails(id) {
    const { rows } = await this.db.query(
      `SELECT p.*, c.name AS category_name, COALESCE(AVG(r.rating), 0)::numeric(10,1) AS rating
       FROM products p
       JOIN categories c ON c.id = p.category_id
       LEFT JOIN reviews r ON r.product_id = p.id AND r.approved = true
       WHERE p.id = $1
       GROUP BY p.id, c.name`,
      [id]
    );
    return rows[0] || null;
  }

  async recommendations(product) {
    const { rows } = await this.db.query(
      `SELECT * FROM products
       WHERE active = true AND id <> $1 AND (category_id = $2 OR animal_type = $3)
       ORDER BY popularity DESC, created_at DESC
       LIMIT 4`,
      [product.id, product.category_id, product.animal_type]
    );
    return rows;
  }

  async create(data) {
    const { rows } = await this.db.query(
      `INSERT INTO products
       (category_id, name, description, price, stock, image_url, animal_type, brand, weight, age_group, is_promo, promo_price)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       RETURNING *`,
      [
        data.categoryId,
        data.name,
        data.description,
        data.price,
        data.stock || 0,
        data.imageUrl,
        data.animalType,
        data.brand,
        data.weight,
        data.ageGroup,
        !!data.isPromo,
        data.promoPrice || null
      ]
    );
    return rows[0];
  }

  async update(id, data) {
    const { rows } = await this.db.query(
      `UPDATE products
       SET category_id=$1, name=$2, description=$3, price=$4, stock=$5, image_url=$6,
           animal_type=$7, brand=$8, weight=$9, age_group=$10, is_promo=$11, promo_price=$12,
           updated_at=NOW()
       WHERE id=$13 RETURNING *`,
      [
        data.categoryId,
        data.name,
        data.description,
        data.price,
        data.stock,
        data.imageUrl,
        data.animalType,
        data.brand,
        data.weight,
        data.ageGroup,
        !!data.isPromo,
        data.promoPrice || null,
        id
      ]
    );
    return rows[0] || null;
  }
}

module.exports = ProductRepository;
