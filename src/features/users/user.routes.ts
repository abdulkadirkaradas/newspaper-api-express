import { Router } from "express";
import { getUser, updateRole, updateUserStatus } from "./user.controller";
import { checkRole } from "../../core/middleware/checkRole";

const router = Router();

router.get("/", getUser);
router.put("/:id/update-role", [checkRole(["Admin"])], updateRole);
router.put("/:id/update-status", [checkRole(["Admin", "Moderator"])], updateUserStatus);

export default router;
