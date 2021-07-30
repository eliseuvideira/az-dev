const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.raw(`
    CREATE EXTENSION "pgcrypto";
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.raw(`
    DROP EXTENSION "pgcrypto";
  `);
};
