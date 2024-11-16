import { Router } from "express";
import { loginHandler } from "../controllers/auths.controller";
import responseInterceptor from "../middlewares/log_interceptor.middleware";

const router: Router = Router();

router.use(responseInterceptor);

router.post("/login", loginHandler);

export default router;
