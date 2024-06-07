import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
  getCategoryById,
} from "../controllers/categories.controller";

const router: Router = Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", addCategory);
router.patch("/:id", editCategory);
router.delete("/:id", deleteCategory);

export default router;
