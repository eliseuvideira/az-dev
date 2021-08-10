const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  printSchema,
  GraphQLList,
} = require("graphql");
const { ApproachType, approaches } = require("./types/Approach");
const { TaskType, tasks } = require("./types/Task");
const { UserType, users } = require("./types/User");

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    tasks: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TaskType))),
      resolve: tasks,
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: users,
    },
    approaches: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(ApproachType))
      ),
      resolve: approaches,
    },
  },
});

const schema = new GraphQLSchema({
  query: QueryType,
});

console.info(printSchema(schema));

module.exports = schema;
