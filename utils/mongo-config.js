const { MONGO_URL = 'mongodb://localhost:27017/newsexplorerdb' } = process.env;

module.exports = {
  MONGO_URL,
};
