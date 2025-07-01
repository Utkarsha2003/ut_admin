import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";


const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  const cookie = req.cookies.get("session")?.value;

  // Handle invalid or missing session cookie gracefully
  const session = cookie ? await decrypt(cookie) : null;

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect authenticated users away from public routes
  // if (isPublicRoute && session?.userId) {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }

  return NextResponse.next();
}
