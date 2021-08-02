module.exports = {
  Query: {
    currentTime: () => {
      return new Date().toISOString().slice(11, 19);
    },
  },
};
