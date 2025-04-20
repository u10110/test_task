import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs";
const prisma = new PrismaClient()
async function main() {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('password', salt);
    const admin = await prisma.user.upsert({
        where: {username: 'admin'},
        update: {},
        create: {
            username: 'admin',
            password: hashedPassword
        },
    })
    console.log(admin)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });