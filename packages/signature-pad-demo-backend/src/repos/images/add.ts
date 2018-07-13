import { execSql as ExecSql } from "@australis/tiny-sql";
import { Connection } from "tedious";
import { ImageDto } from "./types";
import { ensureBuffer } from "./util";
import { debugModule } from "@australis/create-debug";
import { TABLENAME } from "./constants";
// ...
const debug = debugModule(module);
/** */
export default async function add(connection: Connection, imageDto: ImageDto): Promise<ImageDto> {
    const execSql = ExecSql(connection);
    if (imageDto.id) {

    }
    if (imageDto.id.trim() === "") return Promise.reject(new Error("Empty ID"));
    // ...
    const query = `
    insert into ${TABLENAME} (id, img) VALUES (@id, @img)
    ` ;
    const params = ensureBuffer(imageDto);
    if (params.img && params.img instanceof Buffer) {
        if (params.img.length > 8000) return Promise.reject(new Error("Image is too big"));
        // Zero buffer
        if (!params.img.length) return Promise.reject(new Error("Can't add empty image"));
    }

    const { error } = await execSql(query, params) // ...
    if (error) {
        debug(error);
        return Promise.reject(error);
    }
    return Promise.resolve(imageDto);
}
