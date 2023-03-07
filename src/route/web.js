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
  router.post("/delete-user", homeController.deleteUser);
  router.get("/update-user/:userId-:searchValue", homeController.getUpdatePage);
  router.post("/post-update-info", homeController.postUpdateInfo);
  return app.use("/", router);
};

module.exports = initWebRoute;
