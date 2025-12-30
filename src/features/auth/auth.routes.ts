import { checkAuthenticate } from "@/core/middleware/jwt/checkAuthenticate";
import { LoginController } from "./login/login.controller";
import { loginRequestSchema } from "./login/validationSchemes";
import { RegisterController } from "./register/register.controller";
import { registerRequestSchema } from "./register/validationSchemes";
import { Router } from "express";
import { validateRequest } from "@/core/helper/genericValidation";

const router = Router();

// Register Routes
router.post(
  "/register",
  validateRequest(registerRequestSchema),
  RegisterController.register
);

// Login Routes
router.post(
  "/login",
  validateRequest(loginRequestSchema),
  LoginController.login
);
router.get("/me", checkAuthenticate, LoginController.user);

export default router;
