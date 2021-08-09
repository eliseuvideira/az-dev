const { Knex } = require("knex");

const items = [
  {
    task_id: 1,
    content:
      "Make an image in HTML change based on the theme color mode (dark or light)",
    tags: "code,html",
    approach_count: 1,
    is_private: false,
    user_id: 1,
  },
  {
    task_id: 2,
    content: "Get rid of only the unstaged changes since the last git commit",
    tags: "command,git",
    approach_count: 1,
    is_private: false,
    user_id: 1,
  },
  {
    task_id: 3,
    content:
      "The syntax for a switch statement (AKA case statement) in JavaScript",
    tags: "code,javascript",
    approach_count: 2,
    is_private: false,
    user_id: 1,
  },
  {
    task_id: 4,
    content: "Calculate the sum of numbers in a JavaScript array",
    tags: "code,javascript",
    approach_count: 1,
    is_private: false,
    user_id: 1,
  },
  {
    task_id: 5,
    content: 'Babel configuration file for "react" and "env" presets',
    tags: "config,javascript,node",
    approach_count: 1,
    is_private: true,
    user_id: 1,
  },
  {
    task_id: 6,
    content:
      "Create a secure one-way hash for a text value (like a password) in Node",
    tags: "code,node",
    approach_count: 1,
    is_private: false,
    user_id: 1,
  },
];

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.from("azdev.tasks").insert(items);

  await knex.raw(`
    select setval('azdev.tasks_task_id_seq', coalesce((select max(task_id) + 1 from azdev.tasks), 1), false);
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.from("azdev.tasks").delete();
};
