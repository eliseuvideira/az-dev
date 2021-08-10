const { GraphQLScalarType } = require("graphql");

const DateTimeType = new GraphQLScalarType({
  name: "DateTime",
  parseValue: (value) => new Date(value),
});

module.exports = { DateTimeType };
