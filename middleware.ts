import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const checkCookies = (request: NextRequest, value: string) => {
  const cookiesStore = request.cookies.get(value);
  return !!cookiesStore;
};

function checkAndRedirect(request: NextRequest, path: string, requireToken: boolean) {
  const token = checkCookies(request, "_token");

  if (requireToken && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!requireToken && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/login", "/register" ];
  const protectedRoutes = ["/profile", "/setting"];

  for (const route of publicRoutes) {
    if (pathname.startsWith(route)) {
      return checkAndRedirect(request, route, false) || undefined;
    }
  }

  for (const route of protectedRoutes) {
    if (pathname.startsWith(route)) {
      return checkAndRedirect(request, route, true) || undefined;
    }
  }
}
