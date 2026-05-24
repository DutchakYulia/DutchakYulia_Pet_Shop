const BaseRepository = require("./BaseRepository");

class UserRepository extends BaseRepository {
  constructor(db) {
    super(db, "users");
  }

  async findByEmail(email) {
    const { rows } = await this.db.query("SELECT * FROM users WHERE email = $1", [email]);
    return rows[0] || null;
  }

  async create(data) {
    const { rows } = await this.db.query(
      `INSERT INTO users (name, email, phone, password_hash, role)
       VALUES ($1,$2,$3,$4,$5) RETURNING id, name, email, phone, role`,
      [data.name, data.email, data.phone, data.passwordHash, data.role || "user"]
    );
    return rows[0];
  }
}

module.exports = UserRepository;
