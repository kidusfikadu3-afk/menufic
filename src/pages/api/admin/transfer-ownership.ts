import { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "src/server/auth";
import { prisma } from "src/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  
  if (session?.user.role !== "SUPER_ADMIN") {
    return res.status(403).json({ error: "Super admin access required" });
  }

  const { restaurantId, newUserId } = req.body;

  try {
    // First update the restaurant ownership
    await prisma.restaurant.update({
      where: { id: restaurantId },
      data: { userId: newUserId }
    });

    // Then create the activity log
    await prisma.activityLog.create({
      data: {
        action: 'OWNERSHIP_TRANSFER',
        userId: session.user.id,
        targetUserId: newUserId,
        details: `Transferred restaurant ${restaurantId} from user ${session.user.id} to user ${newUserId}`
      }
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Transfer failed" });
  }
}