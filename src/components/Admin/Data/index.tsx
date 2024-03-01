"use client";

import Error from "@/components/general/Error";
import Loading from "@/components/general/Loading";
import { Route } from "next";
import useSWR from "swr";
import AccountData from "./Account";
import EvertaleData from "./Evertale";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());
export default function AdminData({ field, subfield, user }: { field: string; subfield: string; user: Account.User }) {
  const url: Route = `/api/admin?field=${field}&subfield=${subfield}`;
  const { data, isLoading, error } = useSWR(url, fetcher);

  if (!data || isLoading) return <Loading loading={1} textOn />;

  // SOON : Buat pagination

  if (error) return <Error />;

  if (field === "account") {
    if (user.role !== "Admin") return <p className="text-white mx-4 font-poppins font-bold">Maaf, data sensitif. Aksi dibatasi</p>;

    return <AccountData subfield={subfield} data={data.data} />;
  }
  if (field === "evertale") {
    if (user.role !== "Admin of Evertale") return <p className="text-white mx-4 font-poppins font-bold">Maaf, anda belum mendapat izin untuk melihat data game ini</p>;

    return <EvertaleData subfield={subfield} data={data.data} />;
  }
}
