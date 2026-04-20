import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const GONE_PATHS = [
  /^\/wp-/,
  /^\/category\//,
  /^\/search\//,
  /^\/web-design-trends-for-2020\//,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (GONE_PATHS.some((pattern) => pattern.test(pathname))) {
    return new NextResponse(null, { status: 410 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/wp-:path*",
    "/category/:path*",
    "/search/:path*",
    "/web-design-trends-for-2020/:path*",
  ],
};
