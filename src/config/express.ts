import express from "express"
import router from "../routes/index"


const server = express();
server.use(router);


export default server;