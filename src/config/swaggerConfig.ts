import * as swaggerDoc from "../../dist/swagger.json";
import swaggerUI from "swagger-ui-express";
import express from "express";
// import {RegisterRoutes} from "../routes/routes"

const swaggerServer = express();

// RegisterRoutes(swaggerServer)

swaggerServer.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

export default swaggerServer;
