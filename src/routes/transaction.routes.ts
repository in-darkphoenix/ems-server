import { Router } from "express";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getTransactions,
} from "../controllers/transactions.controller";

const router: Router = Router();

router.get("/", getTransactions);
router.post("/", addTransaction);
router.put("/:id", editTransaction);
router.delete("/:id", deleteTransaction);

export default router;
