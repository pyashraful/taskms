import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
app.use(cors());

const UPLOADS_FOLDER = "./uploads/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    console.log("🚀 ~ file: index.js:19 ~ file", file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.any("files"), (req, res) => {
  res.send("Upload success");
});

app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("There was an upload error!");
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send("success");
  }
});

app.listen(4000, () => {
  console.log("Server listening on http://localhost:4000 ...");
});
