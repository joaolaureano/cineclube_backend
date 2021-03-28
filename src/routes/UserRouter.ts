import { Router } from "express";

import { UserController } from "../controllers";

const UserRouter = Router();

UserRouter.post("/", UserController.createUserExample);

export default UserRouter;
