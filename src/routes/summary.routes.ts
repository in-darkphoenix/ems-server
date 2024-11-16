import { Router } from "express";
import { generatePDFHandler } from "../controllers/summary.controller";
import {
    checkIfAuthenticated,
    handleAuthError,
  } from "../middlewares/auth.middleware";
  
  const router: Router = Router();
  
  router.use(checkIfAuthenticated, handleAuthError);

router.get("/getpdf", generatePDFHandler);

export default router;
