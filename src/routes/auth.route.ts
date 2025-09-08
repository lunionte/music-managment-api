import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import { authLoginSchema, authRegisterSchema } from "../models/user.model";
import { AuthController } from "../controllers/auth.controller";

export const authRoute = Router();

authRoute.post(
    "/register",
    celebrate({ [Segments.BODY]: authRegisterSchema }),
    AuthController.register
);
authRoute.post("/login", celebrate({ [Segments.BODY]: authLoginSchema }), AuthController.login);
