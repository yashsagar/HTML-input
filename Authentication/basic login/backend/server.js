import express from "express";
import session from "express-session";
import DotenvFlow from "dotenv-flow";

import ENV_VAR from "./src/var.js";

const app = express();

console.log(ENV_VAR);

app.listen(ENV_VAR.PORT, () => {
  console.log(`server started http://localhost:${ENV_VAR.PORT}`);
});
