import { Router } from "express";
import { addAccount, getAccounts } from "../handlers/accounts.controller";

const router: Router = Router();

router.get("/", getAccounts);

router.post("/", addAccount);

export default router;
