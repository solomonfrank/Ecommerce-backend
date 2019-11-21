"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userSchema = _interopRequireDefault(require("./schema/userSchema"));

var User = _mongoose["default"].model('User', _userSchema["default"]);

var _default = User;
exports["default"] = _default;