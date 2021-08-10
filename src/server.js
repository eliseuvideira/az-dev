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
const UserModel = require("./models/User");
const DataLoader = require("dataloader");

(async () => {
  const app = express();

  app.use(cors());
  app.use(morgan("short"));
  app.use(urlencoded({ extended: false }));
  app.use(json());

  app.use("/", (req, res) => {
    const loaders = {
      User: new DataLoader(async (ids) => {
        const users = await UserModel.find(database, undefined, (builder) => {
          builder.whereIn("user_id", ids);
        });

        const usersMap = new Map();

        for (const user of users) {
          usersMap.set(user.user_id, user);
        }

        return ids.map((id) => usersMap.get(id));
      }),
    };

    const graphql = graphqlHTTP({
      schema: schema,
      graphiql: true,
      context: { loaders },
    });

    graphql(req, res);
  });

  await mongo.connect();
  await database.raw("select 1 as server_status");

  app.listen(3000, () => {
    console.log(`http://localhost:3000`);
  });
})();
