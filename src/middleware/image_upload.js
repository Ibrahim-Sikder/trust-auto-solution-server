const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("uploads/")) {
      cb(null, true); // File is accepted
    } else {
      cb(new Error("Invalid file type. Only images are allowed."));
    }
  },
});

const Uploader = upload.single("image"); // Set the maximum number of files (here, 5)

module.exports = Uploader;
