const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "feyaplan",
  password: "sikha2020",
  port: 5432,
});

module.exports = pool;
