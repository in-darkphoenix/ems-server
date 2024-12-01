import { Router } from "express";
import {
  addAccount,
  deleteAccount,
  editAccount,
  getAccountById,
  getAccounts,
} from "../controllers/accounts.controller";
import {
  checkIfAuthenticated,
  handleAuthError,
} from "../middlewares/auth.middleware";
import responseInterceptor from "../middlewares/log_interceptor.middleware";

const router: Router = Router();

router.use(checkIfAuthenticated, handleAuthError);
router.use(responseInterceptor);

router.get("/", getAccounts);
router.get("/:id", getAccountById);
router.post("/", addAccount);
router.put("/:id", editAccount);
router.delete("/:id", deleteAccount);

export default router;
