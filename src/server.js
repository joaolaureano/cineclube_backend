"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const enviromentVariables_1 = __importDefault(
  require("./config/enviromentVariables")
);
const swaggerConfig_1 = __importDefault(require("./config/swaggerConfig"));
const routes_1 = require("./routes/routes");
const errorHandler_1 = require("./utils/errorHandler");
const init = () => {
  const server = (0, express_1.default)();
  server.use((0, body_parser_1.json)());
  server.use((0, cors_1.default)());
  // Init routes
  (0, routes_1.RegisterRoutes)(server); // New router version
  server.use(swaggerConfig_1.default);
  server.use(errorHandler_1.errorhandler);
  server.get("/", (_, res) => {
    res.redirect("/doc");
  });
  const PORT = enviromentVariables_1.default.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};
exports.default = {
  init,
};
