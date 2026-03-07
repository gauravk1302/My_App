 // relative path
import { PrismaClient } from "@/generated/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";


const prisma = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(prisma , {
        provider: 'mongodb',
    }), 
    emailAndPassword : {
        enabled:true,
    },
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
})