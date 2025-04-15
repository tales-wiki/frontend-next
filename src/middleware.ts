import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/members/me`,
        {
          credentials: "include",
          headers: {
            Cookie: request.headers.get("cookie") || "",
          },
        }
      );

      if (!response.ok) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const data = await response.json();
      if (data.authority !== "ADMIN") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
