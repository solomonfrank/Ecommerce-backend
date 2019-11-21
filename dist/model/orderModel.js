"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userSchema = _interopRequireDefault(require("./schema/userSchema"));

var orderModel = _mongoose["default"].model('Orders', _userSchema["default"]);

var _default = orderModel;
exports["default"] = _default;