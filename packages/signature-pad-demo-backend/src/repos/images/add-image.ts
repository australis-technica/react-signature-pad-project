import { Connection, Request, TYPES } from "tedious";
import { dataUrlToBuffer } from "../../img"
import { debugModule } from "@australis/create-debug";
import { TABLENAME } from "./constants";
// ...
const debug = debugModule(module);
/** */
export default async function addImage(connection: Connection, id: string, img: string): Promise<void> {
    if (!id) {
        return Promise.reject(new Error("ID is required"));
    }
    if (!img) {
        return Promise.reject(new Error("IMG is Required"));
    }
    return new Promise<void>((resolve, reject) => {
        const request = new Request(`
    INSERT INTO ${TABLENAME} (id, img) VALUES ( @id, @img)
`, (error, _rowCount, _rows) => {
                if (error) {
                    debug(error);
                    return reject(error);
                }
                resolve();
            });
        /** */
        request.addParameter("id", TYPES.VarChar, id);
        request.addParameter(/*name:*/ "img", /*type:*/ TYPES.VarBinary, dataUrlToBuffer(img), {
            length: "max"
        });
        connection.execSql(request);
    });
}
