const BaseRepository = require("./BaseRepository");

class CategoryRepository extends BaseRepository {
  constructor(db) {
    super(db, "categories");
  }

  async findAll() {
    const { rows } = await this.db.query("SELECT * FROM categories ORDER BY name ASC");
    return rows;
  }
}

module.exports = CategoryRepository;
