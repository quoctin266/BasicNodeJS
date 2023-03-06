import express from "express";
import homeController from "../controller/homeController";

let router = express.Router();

const initWebRoute = (app) => {
  router.get("/", (req, res) => {
    let success = null;
    res.render("search.ejs", { success: success });
  });
  router.get("/user", homeController.getUserpage);
  router.get("/detail/user/:userId", homeController.getDetailpage);
  router.post("/create-new-user", homeController.createNewUser);
  return app.use("/", router);
};

module.exports = initWebRoute;
