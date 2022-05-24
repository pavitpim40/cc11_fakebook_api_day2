const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    // cb(null, "./uploads/");
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "." + file.mimetype.split("/")[1]);
  },
});
// module.exports = multer({ dest: "public/images/" });
module.exports = multer({ storage: storage });
