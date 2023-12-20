"use client";

import { SWRError, SWRLoading } from "@/app/components/SWR";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Data from "./data";
import Comment from "./Comment";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function CharBody() {
  const { UID } = useParams();

  const URL = `/api/gamelingo/evertale?category=chars&UID=${UID}`;
  const { data, isLoading, error } = useSWR(URL, fetcher);

  if (error) location.reload();
  if (!data || isLoading) return <SWRLoading />;
  return (
    <>
      <Data data={data.character} />
      <Comment data={data.post} />
    </>
  );
}
