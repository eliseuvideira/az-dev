const { Knex } = require("knex");

const TaskModel = {
  /**
   * @param {Knex} database
   * @returns {Promise<Record<string, any>[]>}
   */
  find: async (database) => {
    const rows = await database
      .from("azdev.tasks")
      .where({ is_private: false })
      .orderBy("created_at", "desc");

    return rows;
  },
};

module.exports = TaskModel;
