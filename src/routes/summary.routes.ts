import { Router } from "express";
import { generatePDFHandler } from "../controllers/summary.controller";

const router: Router = Router();

router.get("/getpdf", generatePDFHandler);

export default router;
