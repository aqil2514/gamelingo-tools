"use client";

import { usePathname } from "next/navigation";

const SearchInput = ({ field, isInPage, ...args }: { field: "evertale" | "genshinImpact" | "mlbb"; isInPage: boolean; keyword?: string; setKeyword?: any }) => {
  const pathName = usePathname();
  const pathes = pathName.split("/");

  const category = pathes[pathes.length - 1];
  let url;
  if (!isInPage) {
    if (field === "evertale") url = `/evertale/search`;
    return (
      <form action={url} className="my-auto mx-auto w-full md:w-1/3">
        <div className="relative">
          <input type="hidden" name="category" id="category" value={category} />
          <input type="text" name="s" id="s" placeholder="Cari..." className="w-full font-poppins font-bold px-4 rounded-xl" />
        </div>
      </form>
    );
  }

  return (
    <>
      <input type="text" name="s" id="s" value={args.keyword} onChange={(e) => args.setKeyword(e.target.value)} placeholder="Cari..." className="w-full md:w-1/2 mx-auto block font-poppins font-bold px-4 rounded-xl" />
    </>
  );
};

export default SearchInput;
