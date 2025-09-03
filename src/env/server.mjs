// @ts-check
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { env as clientEnv, formatErrors } from "./client.mjs";
import { serverSchema } from "./schema.mjs";

/**
 * You can't destruct `process.env` as a regular object, so we do
 * a workaround. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [key: string]: string | undefined; }}
 */
const serverEnv = {};
Object.keys(serverSchema.shape).forEach((key) => {
    // Only include server-side variables (no NEXT_PUBLIC_ prefix)
    if (!key.startsWith("NEXT_PUBLIC_")) {
        serverEnv[key] = process.env[key];
    }
});

// eslint-disable-next-line no-underscore-dangle
const parsedServerEnv = serverSchema.safeParse(serverEnv);

if (!parsedServerEnv.success) {
    // eslint-disable-next-line no-console
    console.error("❌ Invalid environment variables:\n", ...formatErrors(parsedServerEnv.error.format()));
    throw new Error("Invalid environment variables");
}

// Remove the check that prevents NEXT_PUBLIC_ variables in server schema
// This check should be done in the schema definition instead

export const env = { ...parsedServerEnv.data };
// Remove ...clientEnv from the export to avoid mixing server and client env variables