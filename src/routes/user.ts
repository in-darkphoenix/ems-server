import { Router } from "express";
import { addUser, getUserById, getUsers } from "../handlers/user";

const router: Router = Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", addUser);

export default router;
