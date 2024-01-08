"use client";

import Loading from "@/components/general/Loading";
import { Option } from "@/components/general/Option";
import SearchInput from "@/components/general/Search/Input";
import SearchResult from "@/components/general/Search/Result";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function Result() {
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const category = searchParams.get("category");
  const [keyword, setKeyword] = useState<string>(search as string);
  const [cat, setCat] = React.useState(category);
  const URL = `/api/gamelingo/evertale/search?category=${cat}&s=${keyword}`;
  const res = useSWR(URL, fetcher);

  if (!keyword)
    return (
      <>
        <SearchInput field="evertale" isInPage={true} keyword={keyword} setKeyword={setKeyword} />
        <p className="font-poppins font-semibold text-base lg:text-2xl text-white">Masukkan Keyword</p>
        <OptionSearch cat={cat as string} setCat={setCat} />
      </>
    );

  console.log(res.data);

  return (
    <>
      <SearchInput field="evertale" isInPage={true} keyword={keyword} setKeyword={setKeyword} />
      <OptionSearch cat={cat as string} setCat={setCat} />
      {res.isLoading && <Loading loading={2} textOn={true} text={`Mencari data tentang ${keyword}...`} />}
      {res.data && <SearchResult category={cat as string} path={cat as string} data={res.data.data} />}
    </>
  );
}

const OptionSearch = ({ cat, setCat }: { cat: string; setCat: React.ComponentState }) => {
  return (
    <div className="my-4">
      <Option status={cat as string} setStatus={setCat} name="category" title="Weapon" value="weapons" />
      <Option status={cat as string} setStatus={setCat} name="category" title="Character" value="chars" />
    </div>
  );
};
