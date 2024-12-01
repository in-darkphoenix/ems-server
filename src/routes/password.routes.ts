import { Router } from "express";
import {
  getPasswords,
  getPasswordById,
  addPassword,
  editPassword,
  deletePassword,
} from "../controllers/passwords.controller";
import {
  checkIfAuthenticated,
  handleAuthError,
} from "../middlewares/auth.middleware";
import responseInterceptor from "../middlewares/log_interceptor.middleware";

const router: Router = Router();

router.use(checkIfAuthenticated, handleAuthError);
router.use(responseInterceptor);

router.get("/", getPasswords);
router.get("/:id", getPasswordById);
router.post("/", addPassword);
router.put("/:id", editPassword);
router.delete("/:id", deletePassword);

export default router;
