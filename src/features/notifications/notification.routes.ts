import { checkRole } from "../../core/middleware/checkRole";
import { NotificationCreateRequestSchema } from "./validationScheme";
import { Router } from "express";
import { validateRequest } from "../../core/helper/genericValidation";
import {
  createNotification,
  getAllNotifications,
  getNotifications,
  deleteNotification,
  changeNotificationStatus,
  editNotification,
} from "./notification.controller";

const router = Router();

router.get("/all", [checkRole(["Admin"])], getAllNotifications);
router.get("/", getNotifications);
router.post(
  "/",
  [
    checkRole(["Admin", "Moderator"]),
    validateRequest(NotificationCreateRequestSchema),
  ],
  createNotification
);
router.put(
  "/:id/update",
  [checkRole(["Admin", "Moderator"])],
  editNotification
);
router.patch(
  "/:id/read",
  [checkRole(["Admin", "Writer"])],
  changeNotificationStatus
);
router.delete("/:id/delete", [checkRole(["Admin"])], deleteNotification);
export default router;
