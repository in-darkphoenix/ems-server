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

const router: Router = Router();

router.use(checkIfAuthenticated, handleAuthError);

router.get("/", getTransactions);
router.post("/", addTransaction);
router.put("/:id", editTransaction);
router.delete("/:id", deleteTransaction);

export default router;
