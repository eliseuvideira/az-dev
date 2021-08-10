const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  printSchema,
  GraphQLList,
} = require("graphql");
const { TaskType, tasks } = require("./types/Task");
const { UserType, users } = require("./types/User");

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    tasks: {
      type: new GraphQLList(new GraphQLNonNull(TaskType)),
      resolve: tasks,
    },
    users: {
      type: new GraphQLList(new GraphQLNonNull(UserType)),
      resolve: users,
    },
  },
});

const schema = new GraphQLSchema({
  query: QueryType,
});

console.info(printSchema(schema));

module.exports = schema;
