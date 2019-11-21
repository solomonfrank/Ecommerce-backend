"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signupController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _userModel = _interopRequireDefault(require("../model/userModel"));

var _catchAsync = _interopRequireDefault(require("../helpers/catchAsync"));

var signupController = (0, _catchAsync["default"])(function _callee(req, res, next) {
  var newUser;
  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator["default"].awrap(_userModel["default"].create(req.body));

        case 2:
          newUser = _context.sent;
          res.status(201).json({
            status: 'success',
            data: newUser
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.signupController = signupController;