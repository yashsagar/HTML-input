import express from "express";
import ENV_VAR from "./src/utils/var.js";
import connectDB from "./src/config/connectDB.js";
import session from "express-session";
import mongoStore from "connect-mongo";

// routes
import authRoutes from "./src/routes/auth.routes.js";

//middleware import
import { customErrorResponse } from "./src/middleware/customErrorResponse.js";

const mongooConnection = connectDB();

const app = express();

//middleware
app.use(express.json());
app.use(
  session({
    secret: "this-is-my-secret",
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      clientPromise: mongooConnection,
      ttl: 60 * 60 * 24 * 14,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
    },
    name: "authCookie",
  })
);
app.use(customErrorResponse);

// testing routes
app.use((req, res, next) => {
  console.log("Test route triggered", req.path);
  next();
});

app.use("/api/auth", authRoutes);

app.listen(ENV_VAR.PORT, () => {
  console.log(`server started http://localhost:${ENV_VAR.PORT}`);
});
