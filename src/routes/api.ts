import announcementRouters from '../features/announcements/announcement.routes';
import authRouters from '../features/auth/auth.routes';
import badgeRouters from '../features/badges/badge.routes';
import notificationRoutes from '../features/notifications/notification.routes';
import userRoutes from '../features/users/user.routes';
import warningRoutes from '../features/warnings/warning.routes';
import { checkAuthenticate } from '../core/middleware/jwt/checkAuthenticate';
import { checkRole } from '../core/middleware/checkRole';
import { Router } from 'express';

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
router.use("/notifications", [checkAuthenticate], notificationRoutes);
router.use("/warnings", [checkAuthenticate], warningRoutes);
router.use("/users", [checkAuthenticate], userRoutes);

export default router;
