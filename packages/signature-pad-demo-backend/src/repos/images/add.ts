import { execSql as ExecSql } from "@australis/tiny-sql";
import { Connection } from "tedious";
import { ImageDto } from "./types";
import { dataUrlToBuffer } from "../../img"
import { debugModule } from "@australis/create-debug";
import { TABLENAME } from "./constants";
// ...
const debug = debugModule(module);
/** */
export default async function add(connection: Connection, dto: ImageDto): Promise<ImageDto> {
    const execSql = ExecSql(connection);
    const { id } = dto;
    if (!id || !id.trim()) return Promise.reject(new Error("Empty ID"));
    if (!dto.img) return Promise.reject(new Error("img is required"));
    // ...
    const query = `
    insert into ${TABLENAME} (id, img) VALUES (@id, @img)
    ` ;
    const img = typeof dto.img === "string" ? dataUrlToBuffer(dto.img) : dto.img;
    
    /** 
     *  Let it error so we can see it.
     */
    
     // if (params.img && params.img instanceof Buffer) {
    //     if (params.img.length > 8000) return Promise.reject(new Error("Image is too big"));
    //     // Zero buffer
    //     if (!params.img.length) return Promise.reject(new Error("Can't add empty image"));
    // }

    const { error } = await execSql(query, { id, img }) // ...
    if (error) {
        debug(error);
        return Promise.reject(error);
    }
    return Promise.resolve(dto);
}
