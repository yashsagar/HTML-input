import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { test } from "./db.js";

const yash = test();

const app = express();

app.use(cookieParser());
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    },
    store: MongoStore.create({
      clientPromise: yash,
      ttl: 14 * 24 * 60 * 60,
    }),
    name: "authCookie",
  })
);

//routes
// app.use();

app.get("/api", (req, res) => {
  req.session.user = { test: "test" };

  res.json({
    success: true,
  });
});

app.get("/api/test", (req, res) => {
  console.log(req.session.id);
  res.json({
    success: true,
  });
});

app.listen(3000, () => {
  console.log("server started http://localhost:3000");
});
