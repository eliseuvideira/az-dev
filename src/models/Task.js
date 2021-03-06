const { Knex } = require("knex");

const TaskModel = {
  /**
   * @param {Knex} database
   * @param {Record<string, any>} where
   * @returns {Promise<Record<string, any>[]>}
   */
  find: async (database, where = {}) => {
    const rows = await database
      .from("azdev.tasks")
      .where(where)
      .orderBy("created_at", "desc");

    return rows;
  },
};

module.exports = TaskModel;
