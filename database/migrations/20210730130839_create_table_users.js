const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("azdev.users", (table) => {
    table.increments("user_id").primary();
    table.text("username").notNullable();
    table.text("password").notNullable();
    table.boolean("is_root").notNullable().defaultTo(false);
    table.text("first_name");
    table.text("last_name");
    table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
    table.unique(["username"]);
  });

  await knex.schema.raw(`
    alter table azdev.users
    add constraint ck_users_username check (lower(username) = username);
  `);

  await knex.schema.raw(`
    create unique index un_azdev_users_is_root on azdev.users (is_root) where is_root = true;
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("azdev.users");
};
