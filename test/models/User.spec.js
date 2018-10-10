const mongoose = require('mongoose');
const faker = require('faker');
const User = require('../../src/models/User');

beforeEach(async () => {
  await User.deleteMany({});
});

const users = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: faker.name.findName(),
    age: faker.random.number(100),
    gender: 'male',
    email: faker.internet.email(),
  },
];

describe('User model', () => {
  test('should save a user', async () => {
    const user = new User(users[0]);

    expect(user.isNew).toBeTruthy();
    const savedUser = await user.save();
    expect(savedUser.isNew).toBeFalsy();
    expect(savedUser).toMatchObject(users[0]);
  });
});
