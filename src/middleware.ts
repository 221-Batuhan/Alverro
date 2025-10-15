import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  if (url.pathname === "/admin") url.pathname = "/admin/overview";
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};


