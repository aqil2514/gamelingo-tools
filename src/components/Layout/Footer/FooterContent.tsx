"use client";
import { Link } from "@/navigation";
import { usePathname } from "next/navigation";
import { Globe } from "react-bootstrap-icons";

export default function FooterContent({ about, news, lang }: any) {
  // const router = useRouter();
  const pathName = usePathname();
  const currentLang = pathName.split("/")[1];

  const targetPathName = pathName.endsWith(currentLang) ? pathName.replace(`${currentLang}`, "") : pathName.replace(`/${currentLang}`, "");

  return (
    <footer className="w-full grid grid-cols-2 md:grid-cols-3 relative px-4 z-[999] h-[60px] bg-amber-600 ">
      <Link
        href={targetPathName}
        locale={currentLang === "id" ? "en" : "id"}
        className="my-auto max-w-[200px]"
        replace
      >
        <div className="flex gap-2 p-2 border rounded-lg border-white h-[45px]  ">
          <Globe className="text-center my-auto text-white font-poppins font-semibold" />
          <p className="text-center my-auto text-white font-poppins font-semibold">
            {lang}
          </p>
        </div>
      </Link>
      <div className="hidden md:flex justify-center content-center">
        <p className="text-center my-auto text-white font-poppins font-semibold">
          @GameLingo Tools 2024
        </p>
      </div>
      <div className=" px-4 flex flex-row justify-end content-center">
        <Link
          className="text-white font-bold font-merienda my-auto mx-4"
          href={"/about"}
        >
          {about}
        </Link>
        <Link
          className="text-white font-bold font-merienda my-auto mx-4"
          href={"/new"}
        >
          {news}
        </Link>
      </div>
    </footer>
  );
}
