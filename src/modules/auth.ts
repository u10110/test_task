import bcrypt from "bcryptjs";
import jwt, {JwtPayload} from 'jsonwebtoken';
import {PrismaClient, User} from '@prisma/client'
import process from "node:process";

const prisma = new PrismaClient()

export const login = async (username: string, password: string): Promise<boolean> => {
    // Find the user
    const user: User = await prisma.user.findUnique({
        where: {
            username
        }
    });

    if(user) {
        const pass = await bcrypt.compare(password, user.password)
        return user && pass
    }
    return false;
}

export const verifyToken = (token: string): JwtPayload | string => {
    return jwt.verify(token, process.env.SECRET);
}

export const createToken = (username: string):string => {
    return jwt.sign({ username }, process.env.SECRET, { expiresIn: '1h' });
}