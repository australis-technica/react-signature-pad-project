import { RequestHandler } from "express-serve-static-core";
import repos from "../../repos";
import sqlConnection from "../../sql-connection";
import { Connection } from "tedious";
/** */
export default (async function get(req, res, next) {
    let connection: Connection;
    try {
        connection = await sqlConnection();
        let image : { img: any };
        if(req.params.id === "last") {
            image = await repos.images.get(connection, req.params.id);
        } else {
            image = await repos.images.get(connection, req.params.id);
        }        
        if (!image) {
            return next(Object.assign(new Error("not found"), { code: 404 }));
        }
        res.setHeader("Content-Type", "image/png");
        // image.img.toString("base64")
        return res.send(image.img);
    } catch (error) {
        return next(error);
    } finally {
        connection && connection.close();
    }
}) as RequestHandler;