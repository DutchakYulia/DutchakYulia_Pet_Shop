const { Pool } = require("pg");

function createDatabaseConnection() {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
  });
}

module.exports = createDatabaseConnection;
