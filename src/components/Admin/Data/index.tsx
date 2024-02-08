"use client";

import Error from "@/components/general/Error";
import Loading from "@/components/general/Loading";
import { Route } from "next";
import useSWR from "swr";
import AccountData from "./Account";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());
export default function AdminData({ field, subfield }: { field: string; subfield: string }) {
  const url: Route = `/api/admin?field=${field}&subfield=${subfield}`;
  const { data, isLoading, error } = useSWR(url, fetcher);

  if (!data || isLoading) return <Loading loading={1} textOn />;

  if (error) return <Error />;

  if(field === "account") return <AccountData subfield={subfield} data={data.data} />
  return (
    <>
      <h1>data here...</h1>
    </>
  );
}
