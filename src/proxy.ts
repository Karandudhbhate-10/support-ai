import { getSession } from "./lib/getSession";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
