import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     * 5. all folder files inside /public (e.g. /static/images/image.png
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // special case for Vercel preview deployment URLs
  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${
      process.env.NEXT_PUBLIC_ROOT_DOMAIN
    }`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // rewrites for app pages
  if (
    hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
    hostname == `www.app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
  ) {
    const cookiesList = req.cookies.getAll();
    const sessionCookie = process.env.NEXTAUTH_URL?.startsWith("https://")
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";
    // no session token present, remove all next-auth cookies and redirect to sign-in
    if (path == "/logout") {
      console.log("Logging out...");
      return NextResponse.rewrite(new URL(`/app${path}`, req.url));
    }
    if (
      !cookiesList.some((cookie) => cookie.name.includes(sessionCookie)) &&
      path !== "/login"
    ) {
      console.log("No session token found, redirecting to /login");
      // remove all next-auth cookies
      for (const cookie of cookiesList) {
        if (cookie.name.startsWith("next-auth.")) {
          req.cookies.delete(cookie.name);
        }
      }
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (
      cookiesList.some((cookie) => cookie.name.includes(sessionCookie)) &&
      path == "/login"
    ) {
      console.log("Session token found, redirecting to /");
      return NextResponse.redirect(new URL("/", req.url));
    }
    console.log("Session token found, continuing to requested page");

    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, req.url),
    );
  }

  // rewrite root application to `/home` folder
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN ||
    hostname === `www.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
  ) {
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url),
    );
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route

  if (
    process.env.NODE_ENV === "production" &&
    (path.includes("en-CA") || path.includes("fr-CA"))
  ) {
    return NextResponse.rewrite(
      new URL(`/${hostname}${path.slice(0, 6)}/upcoming/le-temple`, req.url),
    );
  }
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
