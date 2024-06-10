import { Router } from "express";
import {
  addAccount,
  deleteAccount,
  editAccount,
  getAccountById,
  getAccounts,
} from "../controllers/accounts.controller";

const router: Router = Router();

router.get("/", getAccounts);
router.get("/:id", getAccountById);
router.post("/", addAccount);
router.put("/:id", editAccount);
router.delete("/:id", deleteAccount);

export default router;
