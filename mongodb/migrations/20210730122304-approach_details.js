const { MongoClient, Db } = require("mongodb");

/**
 * @param {Db} db
 * @param {MongoClient} client
 */
exports.up = async (db, client) => {
  await db.createCollection("approach_details", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["approach_id"],
        properties: {
          approach_id: {
            bsonType: "int",
            description: "must be an integer and is required",
          },
        },
      },
    },
  });
};

/**
 * @param {Db} db
 * @param {MongoClient} client
 */
exports.down = async (db, client) => {
  await db.dropCollection("approach_details");
};
