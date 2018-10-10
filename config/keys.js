module.exports = env =>
  env === 'production'
    ? {
        MONGO_URL: '',
      }
    : {
        MONGO_URL: 'mongodb://my_db:27017/testdb',
      };
