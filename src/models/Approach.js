const { Knex } = require("knex");

const ApproachModel = {
  /**
   * @param {Knex} database
   * @param {Record<string, any>} where
   * @returns {Promise<Record<string, any>[]>}
   */
  find: async (database, where = {}, modify = (builder) => {}) => {
    const rows = await database
      .from("azdev.approaches")
      .where(where)
      .modify(modify)
      .orderBy("vote_count", "desc");

    return rows;
  },
};

module.exports = ApproachModel;
