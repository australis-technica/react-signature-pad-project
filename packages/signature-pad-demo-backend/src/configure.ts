import { Express } from "express";
import errorHandler from "./error-handler";
import controllers from "./controllers";
import cors from "cors";
import helmet from "helmet";
/** */
export default function configure(app: Express) {
    return new Promise((resolve, reject) => {
        try {
            app.use(cors({
                origin: "*"
            }));
            app.use(helmet());
            app.get("/api/images/:id", controllers.images.get);
            app.post("/api/images", controllers.images.set);
            app.put("/api/images", controllers.images.add);
            app.use(errorHandler);
            return resolve();
        } catch (error) {
            return reject(error);
        }
    });
}