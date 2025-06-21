import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import jwt from "jsonwebtoken";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = {
    id:session.userId,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  };
  console.log("Generating token for user:", payload);
  const token = jwt.sign(payload, process.env.WS_SECRET!, {
    expiresIn: "120m",
  });

  return NextResponse.json({ token });
}
