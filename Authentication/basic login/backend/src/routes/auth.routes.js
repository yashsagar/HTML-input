import { Router } from "express";
import * as auth from "../controllers/auth.controllers.js";
const router = Router();

router.post("/login", auth.login);
router.get("/logout", auth.logout);
router.post("/signup", auth.signup);
router.get("/authcheck", auth.authcheck);

export default router;
