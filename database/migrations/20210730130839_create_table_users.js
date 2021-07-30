const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("azdev.users", (table) => {
    table.increments("user_id").primary();
    table.text("username").notNullable();
    table.text("password").notNullable();
    table.text("first_name").notNullable();
    table.text("last_name").notNullable();
    table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
    table.unique(["username"]);
  });

  await knex.schema.raw(`
    alter table azdev.users
    add constraint ck_users_username check (lower(username) = username);
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("azdev.users");
};
