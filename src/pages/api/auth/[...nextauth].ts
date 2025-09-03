import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "src/server/db";
import { env } from "src/env/server.mjs";

export const authOptions: NextAuthOptions = {
    callbacks: {
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
                session.user.role = token.role;
            }
            return session;
        },
        
        async jwt({ token, user }) {
            if (user) {
                // Find user by email instead of ID to avoid mismatch
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email },
                    select: { role: true }
                });
                token.role = dbUser?.role;
                
                // First user becomes SUPER_ADMIN automatically
                if (!dbUser?.role && user.email) {
                    const userCount = await prisma.user.count();
                    if (userCount === 1) { // This is the first user
                        await prisma.user.update({
                            where: { email: user.email },
                            data: { role: "SUPER_ADMIN" }
                        });
                        token.role = "SUPER_ADMIN";
                    }
                }
            }
            return token;
        }
    },
    pages: { signIn: "/auth/signin" },
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        }),
        CredentialsProvider({
            authorize(credentials) {
                if (env.TEST_MENUFIC_USER_LOGIN_KEY && credentials?.loginKey === env.TEST_MENUFIC_USER_LOGIN_KEY) {
                    return { email: "testUser@gmail.com", id: "testUser", image: "", name: "Test User" };
                }
                return null;
            },
            credentials: { loginKey: { label: "Login Key", type: "password" } },
            type: "credentials",
        }),
    ],
    session: {
        maxAge: 30 * 24 * 60 * 60,
        strategy: "jwt",
        updateAge: 24 * 60 * 60,
    },
};

export default NextAuth(authOptions);