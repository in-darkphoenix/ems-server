import { Router } from "express";
import { generatePDFHandler } from "../controllers/summary.controller";
import {
    checkIfAuthenticated,
    handleAuthError,
  } from "../middlewares/auth.middleware";
import responseInterceptor from "../middlewares/log_interceptor.middleware";
  
  const router: Router = Router();
  
  router.use(checkIfAuthenticated, handleAuthError);
  router.use(responseInterceptor);

router.get("/getpdf", generatePDFHandler);

export default router;
