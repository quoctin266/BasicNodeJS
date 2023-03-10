import express from "express";
import homeController from "../controller/homeController";
import multer from "multer";
import path from "path";

let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/image");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

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
  router.get("/upload", homeController.getUploadPage);
  router.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    homeController.handleUpload
  );
  return app.use("/", router);
};

module.exports = initWebRoute;
