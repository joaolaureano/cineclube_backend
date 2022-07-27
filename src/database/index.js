"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const database_1 = __importDefault(require("../config/database"));
exports.default = () => {
  return (0, typeorm_1.createConnection)(database_1.default);
};
