import { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export function middleware(req: NextRequest) {
    req.headers.set("Accept-Language", "en");
    const lang = req.headers.get("Accept-Language");

    console.log(lang)
//   let headers = { "accept-language": "id,en;q=0.5" };
//   let languages = new Negotiator({ headers }).languages();
//   let locales = ["id", "en"];
//   let defaultLocale = "id";

//   const test = match(languages, locales, defaultLocale);

//   console.log(test)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
