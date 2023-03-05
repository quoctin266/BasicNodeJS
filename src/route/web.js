import express from "express";
import homeController from "../controller/homeController";

let router = express.Router();

const initWebRoute = (app) => {
  router.get("/", homeController.getHomepage);
  router.get("/detail/user/:userId", homeController.getDetailpage);
  return app.use("/", router);
};

module.exports = initWebRoute;
