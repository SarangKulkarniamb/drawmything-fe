import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // Adjust if needed
import { prisma } from "../../db/prisma"; // or wherever your Prisma client is

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session || !session.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const room = await prisma.room.create({
    data: {
      hostId: session.userId,
    },
  });

  return NextResponse.json({ roomId: room.id , hostId: room.hostId }, { status: 200 });
}