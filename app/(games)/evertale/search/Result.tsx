"use client";

import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import Error from "@/components/general/Error";
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

  console.log(data);
  return (
    <>
      <SearchInput field="evertale" isInPage={true} keyword={keyword} setKeyword={setKeyword} />
      {isLoading && <p className="font-poppins font-semibold text-base lg:text-2xl text-white mx-8 mt-4">Mencari Data tentang {keyword}...</p>}
      {data && <SearchResult game="evertale" category="character" data={data.char} />}
    </>
  );
}
