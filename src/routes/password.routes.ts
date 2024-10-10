import { Router } from "express";
import {
  getPasswords,
  getPasswordById,
  addPassword,
  editPassword,
  deletePassword,
} from "../controllers/passwords.controller";

const router: Router = Router();

router.get("/", getPasswords);
router.get("/:id", getPasswordById);
router.post("/", addPassword);
router.put("/:id", editPassword);
router.delete("/:id", deletePassword);

export default router;
