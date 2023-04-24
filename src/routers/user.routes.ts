import { Router } from "express";
import {
  createUserController,
  userListController,
  updatedUserController,
  deleteUserController,
} from "../controllers/user/user.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { regexUuidValidation } from "../middlewares/regexValidation.middleware";
import { userSchema } from "../schemas/userSchemas/userSchemas";
import cors from 'cors';


const userRoutes = Router();
userRoutes.use(cors()); // definir cors middleware aqui

userRoutes.post(
  "/register",
  ensureDataIsValidMiddleware(userSchema),
  createUserController
);

userRoutes.get("", ensureAuthMiddleware, userListController
);

userRoutes.patch(
  "/:id",
  regexUuidValidation,
  ensureAuthMiddleware,
  updatedUserController
);

userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  deleteUserController
);

export default userRoutes;
