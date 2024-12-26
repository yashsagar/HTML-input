import express from "express";
import cors from "cors";
import multer from "multer";

import { connectToDB } from "./database.js";

import userdata from "./models/userdata.model.js";

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "avatar/");
  },
  filename: (req, file, cb) => {
    const prefix = Date.now() + "-" + Math.round(Math.random() * 10);
    cb(null, file.fieldname + "-" + prefix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.get("/test", (req, res) => {
  console.log(req.path);
  res.status(200).json({ success: true, message: "sever working good" });
});

app.post("/form", upload.single("avatar"), (req, res) => {
  req.body.files = req.file;
  console.log(req.path, "body data: ", req.body);
  res.status(200).json(req.body);
});

app.listen(3000, () => {
  console.log("server started http://localhost:3000");
  connectToDB();
});
