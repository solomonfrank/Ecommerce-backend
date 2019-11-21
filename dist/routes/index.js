"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authRoute = _interopRequireDefault(require("./authRoute"));

var apiRouter = (0, _express.Router)();
apiRouter.use('/api/v1/auth', _authRoute["default"]);
var _default = apiRouter;
exports["default"] = _default;