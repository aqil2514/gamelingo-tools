"use client";
import React, { useEffect, useRef, useState } from "react";
import { ACTIVE_NAV_LIST, NONACTIVE_NAV_LIST } from "..";
import { ChevronDoubleLeft, ChevronDoubleRight } from "react-bootstrap-icons";
import { usePathname } from "next/navigation";
import SearchInput from "@/components/general/Search/Input";
import { useRouter } from "@/navigation";

export default function EvertalePage() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const [navActive, setNavActive] = useState<boolean>(false);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (!navRef.current) return;
    const clickHandler = (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.id) return setNavActive(false);
    };

    window.addEventListener("click", clickHandler);

    return () => {
      window.removeEventListener("click", clickHandler);
    };
  }, [navRef]);

  function routerHandler(e: React.MouseEvent<HTMLParagraphElement>) {
    const target = e.target as HTMLParagraphElement;
    const pathName = target.getAttribute("data-pathName");
    const spanLoading = target.nextElementSibling as HTMLSpanElement;

    spanLoading.classList.remove("hidden");

    setTimeout(() => {
      spanLoading.classList.add("hidden");
    }, 3000);

    if (!pathName)
      throw new Error("Data tidak lengkap: Tambahkan 'data-pathname'");

    if (pathName === "chars") {
      return router.push("/evertale/chars");
    } else if (pathName === "/evertale") {
      return router.push("/evertale");
    } else if (pathName === "weapon") {
      return router.push("/evertale/weapons");
    }
    return;
  }

  return (
    <div
      ref={navRef}
      className={`min-h-full bg-zinc-800 fixed transition duration-200 left-0 top-0 ${
        navActive ? `translate-x-0` : `translate-x-[-100%]`
      } min-w-[200px] p-4 py-20 z-50`}
    >
      <p className="font-mclaren text-red-500 font-bold text-right cursor-pointer" onClick={() => setNavActive(false)}>X</p>
      <h1 className="font-mclaren text-white font-bold text-center underline">
        Evertale Navigation
      </h1>

      <div className="my-4">
        {pathName !== "/evertale" && (
          <SearchInput field="evertale" isInPage={false} />
        )}
      </div>

      {/* LIST  */}
      <>
        <div className="relative">
          <p
            onClick={routerHandler}
            data-pathName="/evertale"
            className={
              pathName === "/evertale" ? ACTIVE_NAV_LIST : NONACTIVE_NAV_LIST
            }
          >
            Home
          </p>
          <span className="absolute hidden top-1 right-1 w-4 h-4 border-2 animate-spin border-white border-dashed rounded-full"></span>
        </div>

        <div className="relative">
          <p
            onClick={routerHandler}
            data-pathName="chars"
            className={
              pathName.includes("chars") ? ACTIVE_NAV_LIST : NONACTIVE_NAV_LIST
            }
          >
            Character
          </p>
          <span className="absolute hidden top-1 right-1 w-4 h-4 border-2 animate-spin border-white border-dashed rounded-full"></span>
        </div>

        <div className="relative">
          <p
            onClick={routerHandler}
            data-pathName="weapon"
            className={
              pathName.includes("weapons")
                ? ACTIVE_NAV_LIST
                : NONACTIVE_NAV_LIST
            }
          >
            Weapon
          </p>

          <span className="absolute hidden top-1 right-1 w-4 h-4 border-2 animate-spin border-white border-dashed rounded-full"></span>
        </div>
      </>

      {!navActive && (
        <ChevronDoubleRight
          className="bi bi-chevron-double-right absolute right-[-32px] top-[45%] bg-zinc-800 text-white text-[2rem] rounded-[0_1rem_1rem_0] cursor-pointer hover:bg-white hover:text-zinc-800 transition-all duration-200"
          onClick={() => setNavActive(true)}
        />
      )}
      {navActive && (
        <ChevronDoubleLeft
          className="bi bi-chevron-double-right absolute right-[-32px] top-[45%] bg-zinc-800 text-white text-[2rem] rounded-[0_1rem_1rem_0] cursor-pointer hover:bg-white hover:text-zinc-800 transition-all duration-200"
          onClick={() => setNavActive(false)}
        />
      )}
    </div>
  );
}
