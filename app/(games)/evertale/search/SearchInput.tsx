"use client";
import { usePathname } from "next/navigation";

export default function SearchInput({ keyword, setKeyword }: React.ComponentState) {
  const pathName = usePathname();

  return (
    <form action="/evertale/search" className="my-auto mx-auto w-full md:w-1/3">
      <div className="relative">
        {pathName === "/evertale/chars" ? (
          <input type="text" name="s" id="s" placeholder="Cari..." className="w-full font-poppins font-bold px-4 rounded-xl" />
        ) : (
          <input type="text" name="s" value={keyword} onChange={(e) => setKeyword(e.target.value)} id="s" placeholder="Cari..." className="w-full font-poppins font-bold px-4 rounded-xl" />
        )}
      </div>
    </form>
  );
}
