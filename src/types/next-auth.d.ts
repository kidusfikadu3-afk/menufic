import { type DefaultSession } from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user?: {
            id: string;
            role?: string; // ← ADD THIS LINE
        } & DefaultSession["user"];
    }
}

// ADD THIS NEW MODULE DECLARATION
declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
    }
}
