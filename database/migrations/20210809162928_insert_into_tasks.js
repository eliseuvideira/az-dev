const { Knex } = require("knex");

const items = [
  {
    content:
      "Make an image in HTML change based on the theme color mode (dark or light)",
    tags: "code,html",
    approach_count: 1,
    is_private: false,
  },
  {
    content: "Get rid of only the unstaged changes since the last git commit",
    tags: "command,git",
    approach_count: 1,
    is_private: false,
  },
  {
    content:
      "The syntax for a switch statement (AKA case statement) in JavaScript",
    tags: "code,javascript",
    approach_count: 2,
    is_private: false,
  },
  {
    content: "Calculate the sum of numbers in a JavaScript array",
    tags: "code,javascript",
    approach_count: 1,
    is_private: false,
  },
  {
    content: 'Babel configuration file for "react" and "env" presets',
    tags: "config,javascript,node",
    approach_count: 1,
    is_private: true,
  },
  {
    content:
      "Create a secure one-way hash for a text value (like a password) in Node",
    tags: "code,node",
    approach_count: 1,
    is_private: false,
  },
];

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  const user = await knex.from("azdev.users").where({ is_root: true }).first();

  if (!user) {
    throw new Error(`no root user found`);
  }

  const user_id = user.user_id;

  await knex
    .from("azdev.tasks")
    .insert(items.map((item) => ({ ...item, user_id })));
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.from("azdev.tasks").delete();
};
