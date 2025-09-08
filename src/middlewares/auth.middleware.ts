import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtUserPayload } from "../models/user.model";
import { UserService } from "../services/user.service";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.url);
    if (
        (req.method === "POST" && req.url.startsWith("/api/auth/register")) ||
        (req.method === "POST" && req.url.startsWith("/api/auth/login"))
    ) {
        return next();
    }
    const token = req.headers.authorization?.split("Bearer ")[1]; // [BARRER, TOKEN]

    if (!token) {
        return res.json({ error: "Token não fornecido" });
    }

    try {
        // já lança o erro se der errado
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtUserPayload;
        const user = await new UserService().getById(decoded.id);
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: "Token inválido" });
    }
};
