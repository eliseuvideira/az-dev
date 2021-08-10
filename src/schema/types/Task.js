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
  },
});

const tasks = async () => {
  const rows = await database
    .from("azdev.tasks")
    .where({ is_private: false })
    .orderBy("created_at", "desc");

  return rows;
};

module.exports = { TaskType, tasks };
