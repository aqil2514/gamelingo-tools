"use client";

import Loading from "@/components/general/Loading";
import SearchInput from "@/components/general/Search/Input";
import SearchResult from "@/components/general/Search/Result";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function Result() {
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const [keyword, setKeyword] = useState<string>(search as string);
  const URL = `/api/gamelingo/evertale/search?s=${keyword}`;
  const { data, isLoading, error } = useSWR(URL, fetcher);

  if (!keyword)
    return (
      <>
        <SearchInput field="evertale" isInPage={true} keyword={keyword} setKeyword={setKeyword} />
        <p className="font-poppins font-semibold text-base lg:text-2xl text-white">Masukkan Keyword</p>
      </>
    );

  return (
    <>
      <SearchInput field="evertale" isInPage={true} keyword={keyword} setKeyword={setKeyword} />
      {isLoading && <Loading loading={2} textOn={true} text={`Mencari data tentang ${keyword}...`} />}
      {data && <SearchResult game="evertale" category="character" data={data.char} />}
    </>
  );
}
