const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require("graphql");
const database = require("../../utils/database");
const { DateTimeType } = require("./DateTime");
const TaskModel = require("../../models/Task");
const { UserType } = require("./User");
const UserModel = require("../../models/User");

const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: {
    task_id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    tags: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLString))
      ),
      resolve: (task) => task.tags.split(","),
    },
    approach_count: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    created_at: {
      type: new GraphQLNonNull(DateTimeType),
    },
    author: {
      type: UserType,
      resolve: async (task) => {
        const user = await UserModel.findOne(database, {
          user_id: task.user_id,
        });

        return user;
      },
    },
  },
});

const tasks = async () => {
  const tasks = TaskModel.find(database, { is_private: false });

  return tasks;
};

module.exports = { TaskType, tasks };
