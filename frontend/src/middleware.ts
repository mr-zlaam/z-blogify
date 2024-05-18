import { type NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/home", request.url));
}
export const config = {
  matcher: ["/"],
};
