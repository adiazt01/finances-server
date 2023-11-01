import { Router } from "express";
import { login, logout, register } from "../controllers/user.controllers";
import { validatorSchema } from "../middlewares/validator.middleware";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/user.validator";

export const usersRouter = Router();

usersRouter.post("/login", validatorSchema(userLoginValidator), login);
usersRouter.post("/register", validatorSchema(userRegisterValidator), register);
usersRouter.post("/logout", logout)

/* 
Features
usersRouter.put("/profile", );
usersRouter.delete("/profile", );
usersRouter.post("/logout", );
 */
