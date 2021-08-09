const { Knex } = require("knex");
const bcryptjs = require("bcryptjs");

const user = {
  username: process.env.ROOT_USERNAME,
  password: bcryptjs.hashSync(process.env.ROOT_PASSWORD, 12),
  is_root: true,
};

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.from("azdev.users").insert(user);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.from("azdev.users").where({ is_root: true }).delete();
};
