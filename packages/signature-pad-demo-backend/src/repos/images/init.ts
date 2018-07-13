import { debugModule } from "@australis/create-debug";
import { execSql as ExecSql } from "@australis/tiny-sql";
import { Connection } from "tedious";
import { TABLENAME } from "./constants";
// ...
const debug = debugModule(module);
/** */
export default async function init(connection: Connection) {
    try {
        const execSql = ExecSql(connection);
        const result = await execSql(`
    /*${TABLENAME}*/
    if(not(exists(select * from sys.tables where name = '${TABLENAME}')))
        create table ${TABLENAME} (id VARCHAR(1024) NOT NULL UNIQUE default NEWID(), img VARBINARY(max));
    `);
        const { error, ...rest } = result;
        if (error) throw error;        
        debug("affected %s, status %s", rest.affected, rest.status);
        return Promise.resolve();
    } catch (error) {
        debug(error);
        return Promise.reject(error);
    }
}