import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

if (!globalForPrisma.prisma) {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is missing from process.env!");
  }

  const adapter = new PrismaNeon({ connectionString });
  globalForPrisma.prisma = new PrismaClient({ adapter });
}

prisma = globalForPrisma.prisma;

export default prisma;
