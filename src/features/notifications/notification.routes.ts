import { checkRole } from "@/core/middleware/checkRole";
import { NotificationCreateRequestSchema } from "./validationScheme";
import { Router } from "express";
import { validateRequest } from "@/core/helper/genericValidation";
import { NotificationController } from "./notification.controller";

const router = Router();

router.get(
  "/all",
  [checkRole(["Admin"])],
  NotificationController.getAllNotifications
);
router.get("/", NotificationController.getNotifications);
router.post(
  "/",
  [
    checkRole(["Admin", "Moderator"]),
    validateRequest(NotificationCreateRequestSchema),
  ],
  NotificationController.createNotification
);
router.put(
  "/:id/update",
  [checkRole(["Admin", "Moderator"])],
  NotificationController.editNotification
);
router.patch(
  "/:id/read",
  [checkRole(["Admin", "Writer"])],
  NotificationController.changeNotificationStatus
);
router.delete(
  "/:id/delete",
  [checkRole(["Admin"])],
  NotificationController.deleteNotification
);
export default router;
