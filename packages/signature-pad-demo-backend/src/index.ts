import express from "express";
import configure from "./configure";
import "./env";
import initDB from "./init-db";
import start from "./start";
// ...
const app = express();
/**
 * Init Db then Start
 */
Promise.all([initDB(), configure(app), start(app)])
  .then(() => {
    console.log("Started");
  })
  .catch(error => {
    console.error(error);
    process.exit(-1);
  });
