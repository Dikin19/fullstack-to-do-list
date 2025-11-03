const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",       // <--- ubah ini
  password: "postgres",   // pastikan cocok dengan password PostgreSQL kamu
  host: "localhost",
  database: "to-do-list",
  port: 5432
});

module.exports = { pool };
