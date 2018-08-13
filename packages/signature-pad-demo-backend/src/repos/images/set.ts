import { execSql as ExecSql } from "@australis/tiny-sql";
import { Connection } from "tedious";
import { ImageDto } from "./types";
import { ensureBuffer } from "./ensure-buffer";
import { TABLENAME } from "./constants";
/** TODO: */
export default async function set(connection: Connection, dto: ImageDto) {
    const execSql = ExecSql(connection);
    await  execSql<ImageDto>(`
    UPDATE ${TABLENAME} set img = @img where id = @id
    ` // ,,,
        , ensureBuffer(dto));
    return await  execSql<ImageDto>(`select top 1 * from ${TABLENAME} where id=@id`, dto);
}
