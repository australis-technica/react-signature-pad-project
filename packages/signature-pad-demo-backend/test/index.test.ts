import "../src/env";
import connect from "../src/sql-connection";
import { Connection, Request, TYPES } from "tedious";
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

    it("works again / straight tedious / no abstraction", async () => {
        const img = dataUrlToBuffer(dataUrl);
        let connection: Connection;
        try {
            connection = await connect();

            await new Promise((resolve, reject) => {
                const request = new Request(`
            INSERT INTO IMAGES (id, img) VALUES ( NEWID(), @img)
        `, (error, rowCount, rows) => {
                        if (error) return reject(error);
                        resolve();
                    });
                /** */
                request.addParameter(/*name:*/ "img", /*type:*/ TYPES.VarBinary, img, {
                    length: "max"
                });
                connection.execSql(request);
            })
        } catch (error) {
            // debug it
            throw error;
        } finally {
            connection && connection.close();
        }
    });

    it("adds 512px data-url", async () => {
        const imgName = "baseline_android_black_512px";
        let connection: Connection;
        try {
            connection = await connect();
            const img = readFileSync(join(__dirname, `${imgName}.data-url`), "utf8");
            const id = uuid.v1();
            await repos.images.addImage(connection, id, img);
            const x = await repos.images.get(connection, id);
            // todo: 
            writeFileSync(
                join(__dirname, `${imgName}.out.data-url`),
                "data:image/png;base64," + (x.img as Buffer).toString("base64")
            );
        } catch (error) {
            throw error;
        } finally {
            connection && connection.close(); ``
        }
    })

    it("adds 1024px data-url", async () => {
        const imgName = "baseline_android_black_1024px";
        let connection: Connection;
        try {
            connection = await connect();
            const img = readFileSync(join(__dirname, `${imgName}.data-url`), "utf8");
            const id = uuid.v1();
            await repos.images.addImage(connection, id, img);
            const x = await repos.images.get(connection, id);
            // todo: 
            writeFileSync(
                join(__dirname, `${imgName}.out.data-url`),
                "data:image/png;base64," + (x.img as Buffer).toString("base64")
            );
        } catch (error) {
            throw error;
        } finally {
            connection && connection.close(); ``
        }
    })
})