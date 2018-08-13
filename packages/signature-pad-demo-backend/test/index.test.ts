import "../src/env";
import connect from "../src/sql-connection";
import { Connection } from "tedious";
import repos from "../src/repos";
import uuid from "node-uuid";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
const dataUrl = readFileSync(join(__dirname, "baseline_android_black_48dp.data-url"), "utf8");
import dataUrlToBuffer from "../src/img/data-url-to-buffer";
/**
 * TODO: to-data-url: http://dataurl.net/#dataurlmaker
 */
describe("data-utl-to-buffer", () => {
    /** */
    it("Works", async () => {
        let connection: Connection
        try {
            const id = uuid.v1();
            connection = await connect();
            await repos.images.init(connection);
            await repos.images.add(connection, {
                id,
                img: dataUrlToBuffer(dataUrl)
            });
            const x = await repos.images.get(connection, id);
            // todo: 
            writeFileSync(
                join(__dirname, "out.data-url"),
                (x.img as Buffer).toString("base64")
            );
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            connection && connection.close();
        }
    });
})