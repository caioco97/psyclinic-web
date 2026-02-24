import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const { pathname } = req.nextUrl;

  const publicPages = ["/login", "/register"];
  const isPublicPage = publicPages.includes(pathname);

  const isHomePage = pathname === "/";

  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && (isHomePage || isPublicPage)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};