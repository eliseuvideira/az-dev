const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  printSchema,
} = require("graphql");
const { RangeType, range } = require("./types/range");

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    currentTime: {
      type: GraphQLString,
      resolve: () => {
        return new Date().toISOString().slice(11, 19);
      },
    },
    range: {
      type: RangeType,
      args: {
        begin: { type: new GraphQLNonNull(GraphQLInt) },
        end: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: range,
    },
  },
});

const schema = new GraphQLSchema({
  query: QueryType,
});

console.info(printSchema(schema));

module.exports = schema;
