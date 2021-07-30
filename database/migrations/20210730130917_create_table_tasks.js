const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("azdev.tasks", (table) => {
    table.increments("task_id").primary();
    table.text("content").notNullable();
    table.text("tags").notNullable();
    table.integer("user_id").notNullable();
    table.boolean("is_private").notNullable().defaultTo(false);
    table.integer("approach_count").notNullable().defaultTo(0);
    table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
    table
      .foreign("user_id")
      .references("user_id")
      .inTable("azdev.users")
      .onDelete("no action")
      .onUpdate("no action");
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("azdev.tasks");
};
