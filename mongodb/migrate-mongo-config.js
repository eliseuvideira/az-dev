const { dotenv } = require("@ev-fns/dotenv");
const { join } = require("path");

dotenv({
  path: join(__dirname, "..", ".env"),
  example: join(__dirname, "..", ".env.example"),
});

const buildUri = ({ protocol = "mongodb", user, pass, server, port = 27017 }) =>
  `${protocol}://${user ? `${user}:${pass}@` : ""}${server}:${port}`;

const url = buildUri({
  protocol: process.env.MONGODB_PROTOCOL,
  user: process.env.MONGODB_USER,
  pass: process.env.MONGODB_PASSWORD,
  server: process.env.MONGODB_SERVER,
  port: process.env.MONGODB_PORT,
});
const database = process.env.MONGODB_DATABASE;

const config = {
  mongodb: {
    url: url,
    databaseName: database,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  migrationsDir: join(__dirname, "migrations"),

  changelogCollectionName: "changelog",

  migrationFileExtension: ".js",

  useFileHash: false,
};

module.exports = config;
