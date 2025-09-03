
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "src/server/db";
import { getImageKit } from "src/server/imageUtil"; // ✅ CORRECT IMPORT

/** Health check endpoint to verify whether Menufic is able to communicate with Database & ImageKit */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const imageKit = getImageKit(); // ✅ INITIALIZE HERE
    await Promise.all([prisma.restaurant.findFirst(), imageKit.listFiles({ limit: 1 })]);
    res.status(200).json({ status: "success" });
};

export default handler;