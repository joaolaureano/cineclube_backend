"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorhandler = void 0;
const tsoa_1 = require("tsoa");
function errorhandler(err, req, res, next) {
  if (err instanceof tsoa_1.ValidateError) {
    return res
      .status(err.status)
      .json(Object.assign(Object.assign({}, err), { success: false }));
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
      errorMessage: err.message,
      success: false,
    });
  }
  next();
}
exports.errorhandler = errorhandler;
