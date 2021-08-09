const { Knex } = require("knex");

const items = [
  {
    approach_id: 1,
    content:
      '<picture>\n  <source\n    srcset="settings-dark.png"\n    media="(prefers-color-scheme: dark)"\n  />\n  <source\n    srcset="settings-light.png"\n    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"\n  />\n  <img src="settings-light.png" loading="lazy" />\n</picture>',
    task_id: 1,
    vote_count: 0,
    user_id: 1,
  },
  {
    approach_id: 2,
    content: "git diff | git apply --reverse",
    task_id: 2,
    vote_count: 0,
    user_id: 1,
  },
  {
    approach_id: 3,
    content:
      "switch (expression) {\n  case value1:\n    // do something when expression === value1\n    break;\n  case value2:\n    // do something when expression === value2\n    break;\n  default:\n    // do something when expression does not equal any of the values above\n}",
    task_id: 3,
    vote_count: 5,
    user_id: 1,
  },
  {
    approach_id: 4,
    content:
      "function doSomethingFor(expression) {\n  switch (expression) {\n    case value1:\n      // do something when expression === value1\n      return;\n    case value2:\n      // do something when expression === value2\n      return;\n    default:\n      // do something when expression does not equal any of the values above\n  }\n}",
    task_id: 3,
    vote_count: 18,
    user_id: 1,
  },
  {
    approach_id: 5,
    content: "arrayOfNumbers.reduce((acc, curr) => acc + curr, 0)",
    task_id: 4,
    vote_count: 0,
    user_id: 1,
  },
  {
    approach_id: 6,
    content:
      "module.exports = {\n  presets: [\n    '@babel/react',\n    [\n      '@babel/env',\n      {\n        modules: 'commonjs',\n        targets: [\n          '> 1%',\n          'last 3 versions',\n          'ie >= 9',\n          'ios >= 8',\n          'android >= 4.2',\n        ],\n      },\n    ],\n  ]\n};",
    task_id: 5,
    vote_count: 0,
    user_id: 1,
  },
  {
    approach_id: 7,
    content:
      "const bcrypt = require('bcrypt');\nconst hashedPass = bcrypt.hashSync('testPass123', 10);",
    task_id: 6,
    vote_count: 0,
    user_id: 1,
  },
];

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.from("azdev.approaches").insert(items);

  await knex.raw(`
    select setval('azdev.approaches_approach_id_seq', coalesce((select max(approach_id) + 1 from azdev.approaches), 1), false);
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.from("azdev.approaches").delete();
};
