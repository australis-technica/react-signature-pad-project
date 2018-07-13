import bodyParser from "body-parser";
import { RequestHandler } from "express-serve-static-core";
import { Connection } from "tedious";
import repos from "../../repos";
import sqlConnection from "../../sql-connection";
//** */
export default [
    bodyParser.json(),
    (async function set(req, res, next) {
        let connection: Connection;
        try {
            const { id, img } = req.body;
            connection = await sqlConnection();
            const x = await repos.images.set(connection, { id, img });
            return res.json(x);
        } catch (error) {
            return next(error);
        } finally {
            connection && connection.close();
        }
    }) as RequestHandler];