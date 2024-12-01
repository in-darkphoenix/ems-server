import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
  getCategoryById,
} from "../controllers/categories.controller";
import {
  checkIfAuthenticated,
  handleAuthError,
} from "../middlewares/auth.middleware";
import responseInterceptor from "../middlewares/log_interceptor.middleware";

const router: Router = Router();

router.use(checkIfAuthenticated, handleAuthError);
router.use(responseInterceptor);

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", addCategory);
router.put("/:id", editCategory);
router.delete("/:id", deleteCategory);

export default router;
