import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    static async getAll(req: Request, res: Response) {
        const response = await new UserService().getAll();
        res.json({ data: response });
    }

    static async getById(req: Request, res: Response) {
        const id = req.params.id;
        const response = await new UserService().getById(id);

        res.json({ data: response });
    }
}
