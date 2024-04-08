import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./navigation";

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale: "id",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(id|en)/:path*", "/evertale/:path*"],
};
