const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require("graphql");
const UserModel = require("../../models/User");
const database = require("../../utils/database");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    user_id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: GraphQLString,
      resolve: ({ first_name, last_name }) =>
        first_name && last_name ? [first_name, last_name].join(" ") : null,
    },
  },
});

const users = async () => {
  const users = await UserModel.find(database);

  return users;
};

module.exports = { UserType, users };
