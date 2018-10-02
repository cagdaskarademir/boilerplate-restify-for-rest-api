function _respond(res, next, status, data, httpCode) {
  const response = {
    status,
    data,
  };

  res.header('content-type', 'application/json');
  res.send(httpCode, response);
  return next();
}

module.exports.success = (res, next, data) => {
  _respond(res, next, 'success', data, 200);
};

module.exports.failure = (res, next, data, httpCode) => {
  _respond(res, next, 'failure', data, httpCode);
};
