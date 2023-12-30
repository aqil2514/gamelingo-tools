"use client";

import Error from "@/components/general/Error";
import Loading from "@/components/general/Loading";
import useSWR from "swr";
import CharPost from "./CharPost";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const Post = ({ type, UID }: { type: "chars" | "weapon"; UID: string }) => {
  const URL = `/api/gamelingo/evertale/${type}?UID=${UID}`;
  const { data, isLoading, error } = useSWR(URL, fetcher);

  if (!data || isLoading) return <Loading />;
  if (error) return <Error />;

  if (type === "chars") return <CharPost data={data.character} />;
};

export default Post;
