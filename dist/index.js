"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _morgan = _interopRequireDefault(require("morgan"));

var _routes = _interopRequireDefault(require("./routes"));

var _errorHandler = _interopRequireDefault(require("./helpers/errorHandler"));

var _responseHandler = require("./helpers/responseHandler");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use(_express["default"].json()); //uncaught exception

process.on('uncaughtException', function (err) {
  console.log(err.name, err.message);
  process.exit(1);
}); // db conn using mongoose

var connectionString = process.env.DATABASE_LOCAL_URL; // if (process.env.NODE_ENV === 'production') {
//   connectionString = process.env.DATABASE_PROD_URL;
// }

_mongoose["default"].connect("".concat(connectionString), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(function () {
  return console.log('db successfully connected');
});

app.use((0, _morgan["default"])('dev')); // app.route('/api/v1/order').get(getOrders);

app.use(_routes["default"]);
app.all('*', function (req, res, next) {
  next(new _errorHandler["default"]('Routes does not exist on the error', 404));
}); // error handler middleware

app.use(function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    (0, _responseHandler.sendErrorDev)(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    var error = _objectSpread({}, err);

    if (error.name === 'CastError') error = (0, _responseHandler.handleCastErrorDb)(err);
    if (error.code === 11000) error = (0, _responseHandler.handleDuplicateErr)(err);
    if (error.name === 'ValidationError') error = (0, _responseHandler.handleDbValidationErr)(err);
    console.log(error);
    (0, _responseHandler.sendErrorProd)(error, res);
  }
});
var PORT = 5000 || process.env.PORT;
var server = app.listen(PORT, function () {
  console.log("app running on  port ".concat(PORT));
}); //unhandle rejection

process.on('unhandleRejection', function (err) {
  console.log(err.name, err.message);
  server.close(function () {
    process.exit(1);
  });
});