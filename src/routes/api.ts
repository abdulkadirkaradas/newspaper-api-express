import { Router } from "express";
import announcementRouters from "../features/announcements/announcement.routes";
import authRouters from "../features/auth/auth.routes";
import { checkAuthenticate } from "../core/middleware/jwt/checkAuthenticate";

const router = Router();

router.use("/announcements", [checkAuthenticate], announcementRouters);
router.use("/auth", authRouters);

export default router;
