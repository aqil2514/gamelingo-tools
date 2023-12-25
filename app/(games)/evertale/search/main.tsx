"use client";

import Result from "./Result";
import SearchInput from "./SearchInput";
import React from "react";
import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function Main() {
  const [keyword, setKeyword] = React.useState("");
  const URL = `/api/gamelingo/evertale/search?s=${keyword}`;
  const { data, isLoading } = useSWR(URL, fetcher, { keepPreviousData: true });

  if (!keyword)
    return (
      <>
        <SearchInput keyword={keyword} setKeyword={setKeyword} />
        <p className="font-poppins font-semibold text-base lg:text-2xl text-white mx-8 mt-4">Masukkan Keyword</p>
      </>
    );
  return (
    <>
      <SearchInput keyword={keyword} setKeyword={setKeyword} />
      {isLoading ? (
        <p className="font-poppins font-semibold text-base lg:text-2xl text-white mx-8 mt-4">Mencari Data tentang &quot;{keyword}&quot;...</p>
      ) : (
        <>
          <Result data={data.char} s={keyword} />
        </>
      )}
    </>
  );
}
