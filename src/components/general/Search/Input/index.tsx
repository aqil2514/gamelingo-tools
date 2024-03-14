"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface SearchInputProps {
  field: "evertale" | "genshinImpact" | "mlbb";
  isInPage: boolean;
  keyword?: string;
  setKeyword?: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({
  field,
  isInPage,
  setKeyword,
  keyword,
}: SearchInputProps) => {
  const pathName = usePathname();
  const pathes = pathName.split("/");

  const category = pathes[2];
  let url;
  if (!isInPage && !setKeyword) {
    if (field === "evertale") url = `/evertale/search`;
    return (
      <form action={url} className="my-auto mx-auto w-full">
        <div className="relative">
          <input type="hidden" name="category" id="category" value={category} />
          <input
            type="text"
            name="s"
            placeholder={`Cari ${category}...`}
            className="w-full font-poppins font-bold px-4 rounded-xl"
          />
        </div>
      </form>
    );
  } else if (setKeyword)
    return (
      <>
        <input
          type="text"
          name="s"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Cari..."
          className="w-full md:w-1/2 mx-auto block font-poppins font-bold px-4 rounded-xl"
        />
      </>
    );
};

export default SearchInput;
