import { Router } from "express";
import { checkAuthenticate } from "../core/middleware/jwt/checkAuthenticate";

const router = Router();

router.get("/", (req, res, next) => { 
  checkAuthenticate(req, res, next);
});

export default router;
