import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import { connectDb } from "./db.js";
import path from "path";
import { fileURLToPath } from "url";

const connection = connectDb();

const app = express();

console.log(path.resolve("test"));
console.log(fileURLToPath(import.meta.url));
console.log(path.resolve());

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 60,
    },
    store: MongoStore.create({
      clientPromise: connection,
      ttl: 60 * 60 * 24 * 7,
      collectionName: "useSession",
    }),
  })
);

app.get("/api", (req, res) => {
  req.session.user = "test";
  console.log(req.sessionID);
  res.json({
    success: true,
  });
});

app.listen(3000, () => {
  console.log("server started http://localhost:3000");
});
