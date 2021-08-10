const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require("graphql");

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

module.exports = { UserType };
