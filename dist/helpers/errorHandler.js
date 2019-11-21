"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var AppError =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2["default"])(AppError, _Error);

  function AppError(message, statusCode) {
    var _this;

    (0, _classCallCheck2["default"])(this, AppError);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AppError).call(this, message));
    _this.statusCode = statusCode;
    _this.status = "".concat(statusCode).startsWith('4') ? 'fail' : 'error';
    _this.isOperational = true;
    Error.captureStackTrace((0, _assertThisInitialized2["default"])(_this), _this.constructor);
    return _this;
  }

  return AppError;
}((0, _wrapNativeSuper2["default"])(Error));

var _default = AppError;
exports["default"] = _default;