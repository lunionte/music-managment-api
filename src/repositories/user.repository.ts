import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
    async save(name: string, email: string, password: string) {
        const data = await prisma.user.create({
            data: { name, email, password },
        });
        return {
            id: data.id,
            name,
            email,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    }

    async getAll() {
        const data = await prisma.user.findMany();
        return data;
    }

    async getById(id: string) {
        const data = await prisma.user.findUnique({
            where: { id },
        });
        return data;
    }

    async getUserByEmail(email: string) {
        const data = await prisma.user.findUnique({
            where: { email },
        });
        return data;
    }
}
