import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const signedinPages = ["/", "/playlist", "/library"];

export default function middleware(req: NextRequest) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.get("NOTIFY_ACCESS_TOKEN");

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }
}
