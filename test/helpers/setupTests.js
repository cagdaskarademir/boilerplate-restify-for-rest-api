const mongoose = require('mongoose');
const keys = require('../../config/keys')(process.env.NODE_ENV);

const { MONGO_URL } = keys;

beforeAll(() => {
  mongoose.connect(
    MONGO_URL,
    { useNewUrlParser: true },
  );
});

afterAll(() => {
  mongoose.disconnect();
});
