import express from "express";
import { json } from "body-parser";
import cors from "cors";

import variables from "./config/enviromentVariables";
import swaggerConfig from "./config/swaggerConfig";
import { RegisterRoutes } from "./routes/routes";
import { errorhandler } from "./utils/errorHandler";

const init = () => {
  const server = express();

  server.use(json());
  server.use(cors());

  // Init routes
  // server.use(routes);
  RegisterRoutes(server); // New router version

  server.use(swaggerConfig);
  server.use(errorhandler);

  server.get("/", (_, res: express.Response) => {
    res.send({
      status: "Api is running",
      docs: `Go to /docs to see the routes documentation.`,
    });
  });

  const PORT = variables.PORT || 5000;

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

export default {
  init,
};
