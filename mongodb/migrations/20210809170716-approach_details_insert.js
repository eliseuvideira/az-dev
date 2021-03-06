const { MongoClient, Db } = require("mongodb");

/**
 * @param {Db} db
 * @param {MongoClient} client
 */
exports.up = async (db, client) => {
  await db.collection("approach_details").insertMany([
    {
      approach_id: 2,
      notes: [
        "This will work if you have staged changes (that you want to keep) or even untracked files. It will only get rid of the unstaged changes.",
      ],
    },
    {
      approach_id: 3,
      notes: [
        "The `break` statements are needed. Without them, JavaScript will continue to execute all the lines in all the other cases after the one that was matched. That is rarely the intended behavior (although you can use it to define multiple cases that are intended to execute the same code. For example, do something if `expression` equals either `value1` or `value2`)",
      ],
    },
    {
      approach_id: 4,
      explanations: [
        'Because the function returns for each case, there is no need to "break" out of that case. You can make the function optionally return a value based on the expression as well.',
      ],
    },
    {
      approach_id: 5,
      explanations: [
        'The `reduce` method invokes its callback function (the first argument) on every item in `arrayOfNumbers`. Each invocation supplies the callback function with an "accumulator" argument and the "current" item for that invocation. What the callback function returns becomes the new value for the accumulator. The initial value of the accumulator is the second argument to `reduce`. By starting with 0 and always returning the sum of the accumulator and the current number in the array, the final result will be the sum of all numbers in `arrayOfNumbers`.',
      ],
    },
    {
      approach_id: 6,
      notes: [
        "This will only work for Babel versions > 7.x. Older Babels require a different configuration.",
      ],
    },
    {
      approach_id: 7,
      explanations: [
        'The second argument to hashSync (or hash) is for the "salt" to be used to hash the text. When specified as a number then a salt will be generated with the specified number of rounds and used.',
      ],
      notes: [
        "To do the hashing asynchronously, use the `bycrypt.hash` method. It returns a promise.",
        "To compare hashed texts together, bcrypt has a `compareSync` (and `compare`) methods",
      ],
    },
  ]);
};

/**
 * @param {Db} db
 * @param {MongoClient} client
 */
exports.down = async (db, client) => {
  await db.collection("approach_details").deleteMany({});
};
