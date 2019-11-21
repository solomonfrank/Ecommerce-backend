"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var productSchema = _mongoose["default"].Schema({
  productName: {
    type: String,
    required: [true, 'product name is required'],
    trim: true
  },
  discount: String,
  price: {
    type: Number,
    required: [true, 'price is category'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    required: [true, 'image is required']
  }
});

var _default = productSchema;
exports["default"] = _default;