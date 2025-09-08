import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
    private userRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(name: string, email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = await this.userRepository.save(name, email, hashedPassword);
        const token = jwt.sign(
            { id: userData.id, name: userData.name, email: userData.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        );

        return { userData, token };
    }
    async login(email: string, password: string) {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const validPassword = bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error("Senha inválida");
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1d",
            }
        );
        return { user, token };
    }
}
