const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
} = require("graphql");
const ApproachModel = require("../../models/Approach");
const UserModel = require("../../models/User");
const database = require("../../utils/database");
const { UserType } = require("./User");

const ApproachType = new GraphQLObjectType({
  name: "Approach",
  fields: {
    approach_id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    vote_count: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    author: {
      type: new GraphQLNonNull(UserType),
      resolve: async (approach, args, { loaders }) => {
        const user = loaders.User.load(approach.user_id);

        return user;
      },
    },
  },
});

const approaches = () => {
  const approaches = ApproachModel.find(database);

  return approaches;
};

module.exports = { ApproachType, approaches };
