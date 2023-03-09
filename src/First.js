import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
import initAPI from "./route/webAPI";
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initWebRoute(app);
initAPI(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
