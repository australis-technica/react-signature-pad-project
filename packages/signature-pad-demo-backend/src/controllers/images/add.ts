import { RequestHandler } from "express-serve-static-core";
import sqlConnection from "../../sql-connection";
import { Connection } from "tedious";
import repos from "../../repos";
import bodyParser from "body-parser";
import uuid from "node-uuid";
//** */
export default [
    bodyParser.json(),
    (async function add(req, res, next) {
        let connection: Connection;
        try {
            let { id, img } = req.body;
            id = id || uuid.v1();
            connection = await sqlConnection();            
            const x = await repos.images.add(connection, { id, img });
            return res.json(x);
        } catch (error) {
            return next(error);
        } finally {
            connection && connection.close();
        }
    }) as RequestHandler];