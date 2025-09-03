import { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "src/server/auth";
import { prisma } from "src/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  
  if (session?.user.role !== "SUPER_ADMIN") {
    return res.status(403).json({ error: "Super admin access required" });
  }

  const { userId, newRole } = req.body;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole }
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Role update failed" });
  }
}