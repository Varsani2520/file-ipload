const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
// const upload = multer({ storage });
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
});

app.set("view engine", "ejs");
app.set("views ", path.resolve("./views"));

// middleware
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});
app.listen(8000, () => console.log("server started"));
