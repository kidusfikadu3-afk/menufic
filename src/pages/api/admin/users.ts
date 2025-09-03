import { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "src/server/auth";
import { prisma } from "src/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  
  if (session?.user.role !== "SUPER_ADMIN") {
    return res.status(403).json({ error: "Super admin access required" });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      restaurants: { select: { id: true, name: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  res.status(200).json(users);
}