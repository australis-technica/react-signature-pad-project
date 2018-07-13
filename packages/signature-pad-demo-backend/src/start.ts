import {Express } from "express";
import { debugModule } from "@australis/create-debug";
// ...
const debug = debugModule(module);
/** */
export default function start(app: Express) {
    return new Promise((resolve, reject) => {
      try {
        const { PORT } = process.env;
        const port = Number(PORT);
        if (!port) { return reject(new Error("missing env  PORT")) };
        app.listen(port, (error: Error) => {
          if (error) {
            console.error(error);
            return Promise.reject(error);
          }
          debug("listening on port: %s", port);
          debug("process pid: %s", process.pid);
          return resolve();
        });
      } catch (error) {
        return reject(error);
      }
    });
  }