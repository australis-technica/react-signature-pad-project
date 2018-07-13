import { NextFunction, Request, Response, ErrorRequestHandler } from "express-serve-static-core";
import { isNumber } from "util";

const errorHandler: ErrorRequestHandler = (error: Error & { code?: number }, _req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    if (error) {
        res.statusMessage = error.message;
        return res.status(isNumber(error.code) ? error.code :  500).end();
    }
    return next();
};

export default errorHandler;