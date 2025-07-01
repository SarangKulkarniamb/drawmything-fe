// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
const protectedRoutes = ["/game", "/dashboard", "/profile"]; 

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isProtected = protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/unauth", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/game/:path*", "/dashboard/:path*", "/profile/:path*"], 
};