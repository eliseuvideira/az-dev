const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
} = require("graphql");

const RangeType = new GraphQLObjectType({
  name: "Range",
  description: "Range Functions",
  fields: {
    values: {
      type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLInt))),
    },
    sum: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    count: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
});

const range = (source, { begin, end }) => {
  if (begin > end) {
    return { values: [], sum: 0, count: 0 };
  }

  const items = new Array(end - begin).fill(null).map((_, i) => i + begin);

  return {
    values: items,
    sum: items.reduce((x, y) => x + y, 0),
    count: items.length,
  };
};

module.exports = { RangeType, range };
