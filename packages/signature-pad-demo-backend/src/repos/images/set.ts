import { execSql as ExecSql } from "@australis/tiny-sql";
import { Connection } from "tedious";
import { ImageDto } from "./types";
import { ensureBuffer } from "./util";
import { debugModule } from "@australis/create-debug";
import { TABLENAME } from "./constants";
// ...
const debug = debugModule(module);
/** */
export default async function set(connection: Connection, imageDto: ImageDto) {
    const execSql = ExecSql(connection);
    return execSql<ImageDto>(`
    UPDATE * from ${TABLENAME} where id = @id
    ` // ,,,
        , ensureBuffer(imageDto)) // ...
        .then(x => {
            const { error, ...rest } = x;
            if (error) {
                debug(error);
                return Promise.reject(x.error);
            }
            return Promise.resolve(rest.values[0]);
        });
}
