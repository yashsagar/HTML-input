import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  console.log(req.path);
  res.status(200).json({ success: true, message: "sever working good" });
});

app.post("/form", (req, res) => {
  console.log(req.path, "body data: ", req.body);
  res.status(200).json(req.body);
});

app.get("/form", (req, res) => {
  console.log(req.path, "query data: ", req.query);
  res.status(200).json(req.search);
});

app.listen(3000, () => {
  console.log("server started http://localhost:3000");
});
