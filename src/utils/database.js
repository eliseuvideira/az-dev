const { default: knex } = require("knex");

const database = knex({
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
  migrations: {
    stub: "stub.js",
  },
  pool: {
    min: 2,
    max: 20,
  },
});

module.exports = database;
