import express from "express";
import API from "../controller/API";

let router = express.Router();

const initAPI = (app) => {
  router.get("/user", API.getUserpage);
  router.post("/create-user", API.createNewUser);
  router.delete("/delete-user", API.deleteUser);
  router.put("/update-info", API.updateInfo);
  return app.use("/api", router);
};

module.exports = initAPI;
