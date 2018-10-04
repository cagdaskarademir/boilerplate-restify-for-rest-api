const { success, failure } = require('../utils/response');
const User = require('../models/User');

module.exports = server => {
  server.get('/users', async (req, res, next) => {
    try {
      const users = await User.find({});
      return success(res, next, users);
    } catch (error) {
      return failure(
        res,
        next,
        'Something went wrong fetching the users from the database',
        500,
      );
    }
  });

  server.get('/users/:id', async (req, res, next) => {
    req.assert('id', 'Id is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      return failure(res, next, errors[0], 400);
    }

    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return failure(
          res,
          next,
          'The specified user could not be found in the database',
          404,
        );
      }
      return success(res, next, user);
    } catch (error) {
      return failure(
        res,
        next,
        'Something went wrong fetching the user from the database',
        500,
      );
    }
  });

  server.post('/users', async (req, res, next) => {
    req.assert('name', 'Name is required').notEmpty();
    req
      .assert('age', 'Age  is required and must be numeric')
      .notEmpty()
      .isInt();
    req
      .assert('gender', 'Gender must be either male or female')
      .isIn(['male', 'female']);
    req
      .assert('email', 'Email address is required and must be a valid email')
      .notEmpty()
      .isEmail();
    const errors = req.validationErrors();
    if (errors) {
      return failure(res, next, errors, 400);
    }

    try {
      const user = new User();
      user.name = req.body.name;
      user.age = req.body.age;
      user.gender = req.body.gender;
      user.email = req.body.email;
      await user.save();
      return success(res, next, user);
    } catch (error) {
      return failure(res, next, 'Error saving user to the database', 500);
    }
  });

  server.put('/users/:id', async (req, res, next) => {
    req.assert('id', 'Id is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      return failure(res, next, errors[0], 400);
    }

    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return failure(
          res,
          next,
          'The specified user could not be found in the database',
          404,
        );
      }

      const updates = req.body;
      delete updates.id;
      Object.assign(user, updates);
      await user.save();

      return success(res, next, user);
    } catch (error) {
      return failure(
        res,
        next,
        'Something went wrong fetching or saving the user from the database',
        500,
      );
    }
  });

  server.del('/users/:id', async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return failure(
          res,
          next,
          'The specified user could not be found in the database',
          404,
        );
      }

      user.remove();

      return success(res, next, user);
    } catch (error) {
      return failure(
        res,
        next,
        'Something went wrong fetching or removing the user from the database',
        500,
      );
    }
  });
};
