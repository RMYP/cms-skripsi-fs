import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const checkCookies = (request: NextRequest, value: string) => {
  const cookiesStore = request.cookies.get(value);
  if (cookiesStore) return true;
  return false;
};

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/login")) {
    const token = checkCookies(request, "_token");   
    if (token) return NextResponse.redirect(new URL("/", request.url));
  }
}
