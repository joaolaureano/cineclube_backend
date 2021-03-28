import express from "express";
import { json } from "body-parser";

import routes from "./routes/";
import variables from "./config/enviromentVariables";

const init = () => {
  const server = express();

  server.use(json());

  // Init routes
  server.use(routes);

  const PORT = variables.PORT || 5000;

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

export default {
  init,
};
