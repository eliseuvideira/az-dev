const { Knex } = require("knex");

const ApproachModel = {
  /**
   * @param {Knex} database
   * @param {Record<string, any>} where
   * @returns {Promise<Record<string, any>[]>}
   */
  find: async (database, where = {}) => {
    const rows = await database
      .from("azdev.approaches")
      .where(where)
      .orderBy("created_at", "desc");

    return rows;
  },
};

module.exports = ApproachModel;
