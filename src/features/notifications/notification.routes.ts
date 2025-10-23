import { checkRole } from '../../core/middleware/checkRole';
import { NotificationCreateRequestSchema } from './validationScheme';
import { Router } from 'express';
import { validateRequest } from '../../core/helper/genericValidation';
import {
  createNotification,
  getNotifications,
  deleteNotification,
  changeNotificationStatus,
  editNotification,
} from "./notification.controller";

const router = Router();

router.get("/", getNotifications);
router.post(
  "/",
  [
    checkRole(["Admin", "Moderator"]),
    validateRequest(NotificationCreateRequestSchema),
  ],
  createNotification
);
router.put("/:id", [checkRole(["Admin", "Moderator"])], editNotification);
router.patch(
  "/:id/read",
  [checkRole(["Admin", "Writer"])],
  changeNotificationStatus
);
router.delete("/:id/delete", [checkRole(["Admin"])], deleteNotification);
export default router;
