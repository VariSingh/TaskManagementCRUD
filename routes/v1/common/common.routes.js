const express = require("express");
const router = express.Router();
const { uploadFile } = require("./common.controller");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../../uploads/"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  uploadFile
);
module.exports = router;
