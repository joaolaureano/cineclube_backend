"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./dotenv");
const {
  PORT,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
} = process.env;
const variables = {
  PORT: Number(PORT),
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT: Number(DB_PORT),
};
exports.default = variables;
