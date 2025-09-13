import { Router } from "express";
import announcementRouters from "../features/announcements/announcement.routes";
import badgeRouters from "../features/badges/badge.routes";
import authRouters from "../features/auth/auth.routes";
import { checkAuthenticate } from "../core/middleware/jwt/checkAuthenticate";
import { checkRole } from "../core/middleware/checkRole";

const router = Router();

router.use(
  "/announcements",
  [checkAuthenticate, checkRole(["Admin"])],
  announcementRouters
);
router.use(
  "/badges",
  [checkAuthenticate, checkRole(["Admin", "Moderator", "Writer"])],
  badgeRouters
);
router.use("/auth", authRouters);

export default router;
