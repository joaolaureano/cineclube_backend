import server from "../config/express";
import router from "../routes/index"
import variables from '../config/enviromentVariables';

const port = variables.port || 8080;

server.listen(port, () => {
    console.log(`Server port [${port}]`);
})

server.use(router);

export default server;