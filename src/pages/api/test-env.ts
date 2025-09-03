import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    imageKitPrivateKey: process.env.IMAGEKIT_PRIVATE_KEY ? "DEFINED" : "UNDEFINED",
    nextPublicImageKitKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ? "DEFINED" : "UNDEFINED",
    imageKitBaseFolder: process.env.IMAGEKIT_BASE_FOLDER ? "DEFINED" : "UNDEFINED",
    githubClientId: process.env.GITHUB_CLIENT_ID ? "DEFINED" : "UNDEFINED",
    databaseUrl: process.env.DATABASE_URL ? "DEFINED" : "UNDEFINED"
  });
}