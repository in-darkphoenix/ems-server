import { Router } from "express";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getTransactions,
} from "../controllers/transactions.controller";
import {
  checkIfAuthenticated,
  handleAuthError,
} from "../middlewares/auth.middleware";
import responseInterceptor from "../middlewares/log_interceptor.middleware";

const router: Router = Router();

router.use(checkIfAuthenticated, handleAuthError);
router.use(responseInterceptor);

router.get("/", getTransactions);
router.post("/", addTransaction);
router.put("/:id", editTransaction);
router.delete("/:id", deleteTransaction);

export default router;
