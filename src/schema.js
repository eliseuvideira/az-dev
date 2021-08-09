const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    currentTime: {
      type: GraphQLString,
      resolve: () => {
        return new Date().toISOString().slice(11, 19);
      },
    },
    sumRange: {
      type: GraphQLNonNull(GraphQLInt),
      args: {
        begin: {
          type: new GraphQLNonNull(GraphQLInt),
        },
        end: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: (source, { begin, end }) => {
        if (begin > end) {
          return 0;
        }

        return new Array(end - begin + 1)
          .fill(null)
          .map((_, i) => i + begin)
          .reduce((x, y) => x + y, 0);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: QueryType,
});

module.exports = schema;
