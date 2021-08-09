const { Knex } = require("knex");
const bcryptjs = require("bcryptjs");

const user = {
  user_id: 1,
  username: process.env.ROOT_USERNAME,
  password: bcryptjs.hashSync(process.env.ROOT_PASSWORD, 12),
  is_root: true,
};

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.from("azdev.users").insert(user);

  await knex.raw(`
    select setval('azdev.users_user_id_seq', coalesce((select max(user_id) + 1 from azdev.users), 1), false);
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.from("azdev.users").where({ is_root: true }).delete();
};
