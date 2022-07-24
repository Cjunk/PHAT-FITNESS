// require("dotenv").config();
const pg = require("pg"); // Database access module
let db;
if (process.env.NODE_ENV === "production") {
  db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  db = new pg.Pool({
    database: "phat_fitness",
  });
}
module.exports = db;
