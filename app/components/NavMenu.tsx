"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BASIC_STYLES = "font-playfair text-white text-xl px-1 font-bold rounded hover:bg-white hover:text-cyan-900";
const ACTIVE_ROUTE = "bg-white !text-cyan-900";
const LI_STYLES = "py-2 text-right";

export default function NavMenu() {
  return (
    <div className="sm:block hidden w-nav bg-cyan-900 px-4 pt-3 min-h-screen" id="database-navbar">
      <Menu />
    </div>
  );
}

function Menu() {
  const pathName = usePathname();

  return (
    <ul>
      <li className={LI_STYLES}>
        <Link id="home-section" className={pathName === "/" || pathName === "/admin" ? ACTIVE_ROUTE + " " + BASIC_STYLES : BASIC_STYLES} href="/">
          Home
        </Link>
      </li>
      <li className={LI_STYLES}>
        <Link id="gamelingo-section" className={pathName.includes("/gamelingo") || pathName.includes("/admin/gamelingo") ? ACTIVE_ROUTE + " " + BASIC_STYLES : BASIC_STYLES} href="/gamelingo">
          Game Lingo
        </Link>
      </li>
      <li className={LI_STYLES}>
        <Link id="melodimix-section" className={pathName.includes("/melodimix") || pathName.includes("/admin/melodimix") ? ACTIVE_ROUTE + " " + BASIC_STYLES : BASIC_STYLES} href="/melodimix">
          MelodiMix
        </Link>
      </li>
    </ul>
  );
}

export { Menu };
