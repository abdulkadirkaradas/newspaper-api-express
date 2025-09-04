import { Router } from "express";
import announcementRouters from "../features/announcements/announcement.routes";
import authRouters from "../features/auth/auth.routes";

const router = Router();

router.use("/announcements", announcementRouters);
router.use("/auth", authRouters);

export default router;