module.exports = {
  currentTime: () => {
    return new Date().toISOString().slice(11, 19);
  },
};
