import { NotificationCreateRequestSchema } from "./validationScheme";
import { Router } from "express";
import { validateRequest } from "../../core/helper/genericValidation";

import {
  getAllWarnings,
  getWarnings,
  createWarning,
  editWarning,
  deleteWarning,
} from "./warning.controller";
import { checkRole } from "../../core/middleware/checkRole";

const router = Router();

router.get("/all", [checkRole(["Admin"])], getAllWarnings);
router.get("/", getWarnings);
router.post(
  "/",
  [checkRole(["Admin", "Moderator"])],
  validateRequest(NotificationCreateRequestSchema),
  createWarning
);
router.put("/:id/update", [checkRole(["Admin", "Moderator"])], editWarning);
router.delete("/:id/delete", [checkRole(["Admin"])], deleteWarning);

export default router;
