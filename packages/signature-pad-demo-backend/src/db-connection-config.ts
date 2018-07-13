import { ConnectionConfig } from "tedious";
import { join } from "path";
const config: ConnectionConfig = require(join(__dirname, "../.secrets/db-connection.config.json"))
if(!config){
    throw new Error("Missing db-connection-config");
}
const { server, userName, password, options } = config;
if(!options){
    throw new Error("Missing Options");
}
const { database , ...rest} = options;
if(!database || database.trim() === "") {
    throw new Error("Missing database");
}
export default {
    server, userName, password, options
}
export const withoutDB = {
    server, userName, password, options: rest
}