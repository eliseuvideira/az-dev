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
const ApproachModel = require("./models/Approach");

(async () => {
  const app = express();

  app.use(cors());
  app.use(morgan("short"));
  app.use(urlencoded({ extended: false }));
  app.use(json());

  app.use("/", (req, res) => {
    const loaders = {
      User: {
        user_id: new DataLoader(async (ids) => {
          const users = await UserModel.find(database, undefined, (builder) => {
            builder.whereIn("user_id", ids);
          });

          const usersMap = new Map();

          for (const user of users) {
            usersMap.set(user.user_id, user);
          }

          return ids.map((id) => usersMap.get(id));
        }),
      },
      Approach: {
        task_id: new DataLoader(async (task_ids) => {
          const approaches = await ApproachModel.find(
            database,
            undefined,
            (builder) => {
              builder.whereIn("task_id", task_ids);
            }
          );

          const map = new Map();

          for (const task_id of task_ids) {
            map.set(
              task_id,
              approaches.filter((approach) => approach.task_id === task_id)
            );
          }

          return task_ids.map((task_id) => map.get(task_id));
        }),
      },
    };

    const graphql = graphqlHTTP({
      schema: schema,
      graphiql: true,
      context: { loaders },
      formatError: (err) => {
        console.error(err);

        return err;
      },
    });

    graphql(req, res);
  });

  await mongo.connect();
  await database.raw("select 1 as server_status");

  app.listen(3000, () => {
    console.log(`http://localhost:3000`);
  });
})();
