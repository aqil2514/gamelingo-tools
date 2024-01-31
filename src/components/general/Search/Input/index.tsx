"use client";

import { usePathname } from "next/navigation";
import React from "react";

const SearchInput = ({ field, isInPage, setKeyword, keyword }: { field: "evertale" | "genshinImpact" | "mlbb"; isInPage: boolean; keyword?: string; setKeyword?: React.Dispatch<React.SetStateAction<string>> }) => {
  const pathName = usePathname();
  const pathes = pathName.split("/");

  const category = pathes[pathes.length - 1];
  let url;
  if (!isInPage && !setKeyword) {
    if (field === "evertale") url = `/evertale/search`;
    return (
      <form action={url} className="my-auto mx-auto w-full md:w-1/3">
        <div className="relative">
          <input type="hidden" name="category" id="category" value={category} />
          <input type="text" name="s" id="s" placeholder="Cari..." className="w-full font-poppins font-bold px-4 rounded-xl" />
        </div>
      </form>
    );
  } else if (setKeyword)
    return (
      <>
        <input type="text" name="s" id="s" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Cari..." className="w-full md:w-1/2 mx-auto block font-poppins font-bold px-4 rounded-xl" />
      </>
    );
};

export default SearchInput;
