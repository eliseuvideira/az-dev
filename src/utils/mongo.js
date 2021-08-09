const { MongoClient } = require("mongodb");

const protocol = process.env.MONGODB_PROTOCOL;
const server = process.env.MONGODB_SERVER;
const port = process.env.MONGODB_PORT;
const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;

const MONGODB_URI = `${protocol}://${user}:${password}@${server}:${port}`;

const mongo = new MongoClient(MONGODB_URI);

module.exports = mongo;
