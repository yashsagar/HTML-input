import DotenvFlow from "dotenv-flow";

DotenvFlow.config({ path: "./src/env" });

const ENV_VAR = {
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL,
};

export default ENV_VAR;
