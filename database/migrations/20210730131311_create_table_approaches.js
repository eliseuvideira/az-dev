const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("azdev.approaches", (table) => {
    table.increments("approach_id").primary();
    table.text("content").notNullable();
    table.integer("user_id").notNullable();
    table.integer("task_id").notNullable();
    table.integer("vote_count").notNullable();
    table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
    table
      .foreign("user_id")
      .references("user_id")
      .inTable("azdev.users")
      .onDelete("no action")
      .onUpdate("no action");
    table
      .foreign("task_id")
      .references("task_id")
      .inTable("azdev.tasks")
      .onDelete("no action")
      .onUpdate("no action");
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("azdev.approaches");
};
