const { graphqlHTTP } = require("express-graphql");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { json, urlencoded } = require("body-parser");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

(async () => {
  const app = express();

  app.use(cors());
  app.use(morgan("short"));
  app.use(urlencoded({ extended: false }));
  app.use(json());

  app.use(
    "/",
    graphqlHTTP({ schema: typeDefs, rootValue: resolvers, graphiql: true })
  );

  app.listen(3000, () => {
    console.log(`http://localhost:3000`);
  });
})();
