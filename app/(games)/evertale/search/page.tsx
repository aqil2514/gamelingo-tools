"use client";

import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import axios from "axios";
import Result from "./Result";
import SearchInput from "./SearchInput";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Search() {
  const [loading, setLoading] = useState<Boolean>(false);
  const [data, setData] = useState<React.ComponentState>();
  const params = useSearchParams();
  const s = params.get("s");

  async function getSearch() {
    try {
      setLoading(true);

      const { data } = await axios.get(`/api/gamelingo/evertale?category=chars&name=${s}`);

      if (data.status !== 200) {
        alert(data.msg);
        return;
      }

      setData(data.data);
      console.log(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSearch();
  }, []);

  return (
    <div className={DIV_MAIN_STYLE + " py-20"}>
      <SearchInput />
      {loading ? (
        <p className="font-poppins font-semibold text-base lg:text-2xl text-white mx-8 mt-4">Mencari Data...</p>
      ) : (
        <>
          <Result data={data} s={s} loading={loading} />
        </>
      )}
    </div>
  );
}
