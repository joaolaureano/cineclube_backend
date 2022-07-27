"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const database_1 = __importDefault(require("./database"));
const server_1 = __importDefault(require("./server"));
(0, database_1.default)()
  .then(() => {
    console.log("Connected successfully to database.");
    server_1.default.init();
  })
  .catch((err) => {
    console.log(err);
    console.log(`Error connecting to database!\n${err.message}`);
  });
