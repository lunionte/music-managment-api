import { Joi } from "celebrate";

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
}

export interface JwtUserPayload {
    id: string;
    name: string;
    email: string;
    iat?: number;
    exp?: number;
}

export const authRegisterSchema = Joi.object().keys({
    name: Joi.string().max(30).trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().max(30).trim().required(),
});

export const authLoginSchema = Joi.object().keys({
    email: Joi.string().email().trim().required(),
    password: Joi.string().max(30).trim().required(),
});
