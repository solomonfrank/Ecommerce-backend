"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleDuplicateErr = exports.handleDbValidationErr = exports.handleCastErrorDb = exports.sendErrorProd = exports.sendErrorDev = void 0;

var _errorHandler = _interopRequireDefault(require("./errorHandler"));

var sendErrorDev = function sendErrorDev(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

exports.sendErrorDev = sendErrorDev;

var sendErrorProd = function sendErrorProd(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    res.status(err.statusCode).json({
      status: 'error',
      message: 'something went wrong'
    });
  }
};

exports.sendErrorProd = sendErrorProd;

var handleCastErrorDb = function handleCastErrorDb(err) {
  var message = "invalid data ".concat(err.value, " format");
  return new _errorHandler["default"](message);
};

exports.handleCastErrorDb = handleCastErrorDb;

var handleDbValidationErr = function handleDbValidationErr(err) {
  var errors = Object.values(err.errors).map(function (el) {
    return el.message;
  });
  var message = "invlaid input data ".concat(errors.join('. '));
  return new _errorHandler["default"](message, 400);
};

exports.handleDbValidationErr = handleDbValidationErr;

var handleDuplicateErr = function handleDuplicateErr(err) {
  var value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  var message = "input already ".concat(value, " exist");
  return new _errorHandler["default"](message, 400);
};

exports.handleDuplicateErr = handleDuplicateErr;