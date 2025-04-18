import bcrypt from "bcryptjs";
import jwt, {JwtPayload} from 'jsonwebtoken';
import {PrismaClient, User} from '@prisma/client'

const prisma = new PrismaClient()

export const login = async (username: string, password: string): Promise<boolean> => {
    // Find the user
    const user: User = await prisma.user.findUnique({
        where: {
            username
        }
    });
    const pass = await bcrypt.compare(password, user.password)

    return user && pass
}

export const verifyToken = (token: string): JwtPayload | string => {
    return jwt.verify(token, 'secretKey');
}

export const createToken = (username: string):string => {
    return jwt.sign({ username }, 'secretKey', { expiresIn: '1h' });
}