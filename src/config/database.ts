import { ConnectionOptions } from "typeorm";
import variables from "./enviromentVariables";

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT } = variables;

export default {
  type: "postgres",
  database: DB_DATABASE,
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  logging: false,
  synchronize: false,
  entities: [`${__dirname}/src/models/*.{js,ts}`],
  migrations: [`${__dirname}/src/database/migrations/*.{js,ts}`],
  cli: {
    migrationsDir: "src/database/migrations",
  },
  extra: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
} as ConnectionOptions;
