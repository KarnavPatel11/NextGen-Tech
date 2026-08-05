import { PrismaClient } from "@/src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.warn(
      "⚠️  DATABASE_URL not set — Prisma client created without adapter. DB queries will fail."
    );
    // Return a client that will throw on actual queries but allows import/build
    return new Proxy({} as PrismaClient, {
      get(_, prop) {
        if (prop === "$connect" || prop === "$disconnect") {
          return () => Promise.resolve();
        }
        if (typeof prop === "string" && !prop.startsWith("$")) {
          return new Proxy(
            {},
            {
              get() {
                return () => {
                  throw new Error(
                    "DATABASE_URL is not configured. Cannot perform database operations."
                  );
                };
              },
            }
          );
        }
        return undefined;
      },
    });
  }

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
