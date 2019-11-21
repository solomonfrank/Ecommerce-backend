"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var orderSchema = _mongoose["default"].Schema({
  firstName: {
    type: String,
    required: [true, 'first Name is required']
  },
  lastName: {
    type: String,
    required: [true, 'last name is required']
  },
  email: {
    type: String,
    required: [true, 'email is required']
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'password is required'],
    select: false
  },
  createdAt: {
    type: Date,
    "default": Date.now()
  }
});

var _default = orderSchema;
exports["default"] = _default;