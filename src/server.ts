import express from "express";
import { json } from "body-parser";

import variables from "./config/enviromentVariables";
import swaggerConfig from "./config/swaggerConfig";
import { RegisterRoutes } from "./routes/routes";
import { errorhandler } from "./utils/errorHandler";

const init = () => {
  const server = express();

  server.use(json());

  // Init routes
  // server.use(routes);
  RegisterRoutes(server); // New router version

  server.use(swaggerConfig);
  server.use(errorhandler);

  const PORT = variables.PORT || 5000;

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

export default {
  init,
};
