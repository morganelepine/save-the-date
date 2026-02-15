import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function test() {
    const res = await prisma.pushSubscription.findMany();
    console.log("DB OK:", res);
}
// test();
