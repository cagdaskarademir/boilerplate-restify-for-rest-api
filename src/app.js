const restify = require('restify');
const restifyValidator = require('restify-validator');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');

const PORT = process.env.PORT || 3000;
const MONGO_URL = 'mongodb://localhost:27018/testdb';

mongoose.connect(
  MONGO_URL,
  { useNewUrlParser: true },
);

const server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restifyValidator);

userController(server);

server.listen(PORT, () => {
  console.log('%s listening at %s', server.name, server.url);
});
