import express from "express";
import homeController from "../controller/homeController";

let router = express.Router();

const initWebRoute = (app) => {
  router.get("/", (req, res) => {
    res.render("search.ejs");
  });
  router.get("/user", homeController.getUserpage);
  router.get("/detail/user/:userId", homeController.getDetailpage);
  return app.use("/", router);
};

module.exports = initWebRoute;
