import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
    static async register(req: Request, res: Response) {
        const { name, email, password } = req.body;
        const response = await new AuthService().register(name, email, password);
        res.json({ data: response });
    }
    static async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const response = await new AuthService().login(email, password);

        res.json({ data: response });
    }
}
