import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside

const publicPage = ["/login", "/register"];
const privatePage = ["/me"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const baseUrl = request.nextUrl.origin;
  const cookie = request.cookies.get("token");

  console.log("Middleware running:", pathname, "Token:", cookie?.value);
  if (publicPage.includes(pathname) && cookie?.value) {
    return NextResponse.redirect(`${baseUrl}/me`);
  }
  if (privatePage.includes(pathname) && !cookie?.value) {
    return NextResponse.redirect(`${baseUrl}/login`);
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register", "/me"],
};
