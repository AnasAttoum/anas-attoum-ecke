import { jwtVerify } from "jose";
import { defaultLocale, locales, routing } from "@/lib/localization/routing";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { paths } from "./lib/paths";

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authCookie = request.cookies.get("auth");

  let locale = defaultLocale;
  let pathWithoutLocale = pathname;

  for (const loc of locales) {
    if (pathname.startsWith(`/${loc}`)) {
      locale = loc;
      pathWithoutLocale = pathname.slice(loc.length + 1) || "/";
      break;
    }
  }

   if (authCookie) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(authCookie.value, secret);
    } catch {
      const response = NextResponse.redirect(
        new URL(`/${locale}${paths.login}`, request.url)
      );

      response.cookies.delete("auth");
      return response;
    }
  }

  if (pathWithoutLocale !== paths.login && !authCookie) {
    return NextResponse.redirect(
      new URL(`${paths.login}${locale}`, request.url),
    );
  }

  if (pathWithoutLocale === paths.login && authCookie) {
    return NextResponse.redirect(
      new URL(`/${locale}${paths.about}`, request.url),
    );
  }

  // Step 1: Use the incoming request (example)
  //   const defaultLocale: localesType = request.headers.get('x-your-custom-locale') as localesType || myDefaultLocale;

  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);

  // Step 3: Alter the response (example)
  //   response.headers.set('x-your-custom-locale', defaultLocale);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
