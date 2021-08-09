const { dotenv } = require("@ev-fns/dotenv");

dotenv();

const { graphqlHTTP } = require("express-graphql");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { json, urlencoded } = require("body-parser");

const schema = require("./schema");
const mongo = require("./utils/mongo");
const database = require("./utils/database");

(async () => {
  const app = express();

  app.use(cors());
  app.use(morgan("short"));
  app.use(urlencoded({ extended: false }));
  app.use(json());

  app.use(
    "/",
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    })
  );

  await mongo.connect();
  await database.raw("select 1 as server_status");

  app.listen(3000, () => {
    console.log(`http://localhost:3000`);
  });
})();
