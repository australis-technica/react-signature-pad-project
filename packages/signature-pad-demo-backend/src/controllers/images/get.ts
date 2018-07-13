import { RequestHandler } from "express-serve-static-core";
import repos from "../../repos";
import sqlConnection from "../../sql-connection";
import { Connection } from "tedious";
/** */
export default (async function get(req, res, next) {
    let connection: Connection;
    try {
        connection = await sqlConnection();
        const image = await repos.images.get(connection, req.params.id);
        if (!image) {
            return next(Object.assign(new Error("not found"), { code: 404 }));
        }
        return res.json(image.img);
    } catch (error) {
        return next(error);
    } finally {
        connection && connection.close();
    }
}) as RequestHandler;