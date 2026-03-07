import {PrismaClient} from '@/app/generated/prisma/client';

const prismaClientSinglton = () => {
    return new PrismaClient({} as any);
}

type prismaClientSingltonType = ReturnType<typeof prismaClientSinglton>;

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma ?? prismaClientSinglton();


export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;