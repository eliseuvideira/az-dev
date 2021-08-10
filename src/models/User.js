const { Knex } = require("knex");

const UserModel = {
  /**
   * @param {Knex} database
   * @param {Record<string, any>} where
   * @returns {Promise<Record<string, any>[]>}
   */
  find: async (database, where = {}, modify = (builder) => {}) => {
    const rows = await database
      .from("azdev.users")
      .where(where)
      .modify(modify)
      .orderBy("created_at", "desc");

    return rows;
  },

  /**
   * @param {Knex} database
   * @param {Record<string, any>} where
   * @returns {Promise<Record<string, any> | null>}
   */
  findOne: async (database, where = {}) => {
    const row = await database.from("azdev.users").where(where).first();

    return row;
  },
};

module.exports = UserModel;
