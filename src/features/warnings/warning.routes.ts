import { NotificationCreateRequestSchema } from "./validationScheme";
import { Router } from "express";
import { validateRequest } from "@/core/helper/genericValidation";

import { WarningController } from "./warning.controller";
import { checkRole } from "@/core/middleware/checkRole";

const router = Router();

router.get("/all", [checkRole(["Admin"])], WarningController.getAllWarnings);
router.get("/", WarningController.getWarnings);
router.post(
  "/",
  [checkRole(["Admin", "Moderator"])],
  validateRequest(NotificationCreateRequestSchema),
  WarningController.createWarning
);
router.put(
  "/:id/update",
  [checkRole(["Admin", "Moderator"])],
  WarningController.editWarning
);
router.delete(
  "/:id/delete",
  [checkRole(["Admin"])],
  WarningController.deleteWarning
);

export default router;
