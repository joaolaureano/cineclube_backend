"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const enviromentVariables_1 = __importDefault(require("./enviromentVariables"));
const {
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
} = enviromentVariables_1.default;
exports.default = {
  type: "postgres",
  database: DB_DATABASE,
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  logging: false,
  synchronize: false,
  entities: ["src/models/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "src/database/migrations",
  },
  extra: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
};
