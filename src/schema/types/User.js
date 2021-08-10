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
      resolve: (user) => {
        if (!user.first_name || !user.last_name) {
          return null;
        }

        return user.first_name + " " + user.last_name;
      },
    },
  },
});

const users = async () => {
  const users = await UserModel.find(database);

  return users;
};

module.exports = { UserType, users };
