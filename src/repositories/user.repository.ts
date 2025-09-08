import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
    async save(name: string, email: string, password: string) {
        const data = await prisma.user.create({
            data: { name, email, password },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return data;
    }

    async getAll() {
        const data = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return data;
    }

    async getById(id: string) {
        const data = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return data;
    }

    async getUserByEmail(email: string) {
        const data = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return data;
    }
}
