import { debugModule } from "@australis/create-debug";
import { execSql as ExecSql } from "@australis/tiny-sql";
import { Connection } from "tedious";
import connectionConfig from "./db-connection-config";
import repos from "./repos";
import connectToDb , { connectToServer } from "./sql-connection";
const { options } = connectionConfig;
const { database } = options;
// ...
const debug = debugModule(module);
/** */
export default async function initDB() {
  let connection: Connection;
  try {
    connection = await connectToServer();
    const execSql = ExecSql(connection);
    // Database
    const query = `
    if(not(exists(select * from sys.databases where name = '${database}')))
      create database ${database}
    `;
    await execSql(query).catch((error: Error) => Promise.reject(Object.assign(error, { query })));
    connection && connection.close();
    // ... Tables
    connection = await connectToDb();
    await repos.images.init(connection);
    return Promise.resolve();
  } catch (error) {
    debug(error);
    return Promise.reject(error);
  } finally {
    connection && connection.close();
  }
}
