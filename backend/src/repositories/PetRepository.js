class PetRepository {
  constructor(db) {
    this.db = db;
  }

  async list(userId) {
    const { rows } = await this.db.query("SELECT * FROM pets WHERE user_id = $1 ORDER BY created_at DESC", [
      userId
    ]);
    return rows;
  }

  async create(userId, data) {
    const { rows } = await this.db.query(
      `INSERT INTO pets (user_id, name, species, breed, age, weight, nutrition_notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [userId, data.name, data.species, data.breed, data.age, data.weight, data.nutritionNotes]
    );
    return rows[0];
  }
}

module.exports = PetRepository;
