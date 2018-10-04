const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  age: Number,
  gender: String,
  email: String,
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
