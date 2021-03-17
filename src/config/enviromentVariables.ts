import * as dotenv from "dotenv";

dotenv.config({path: (__dirname + "/.env")})

const variables = {
    "port": process.env.PORT
}

export default variables;