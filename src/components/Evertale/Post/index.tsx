"use client";

import Error from "@/components/general/Error";
import Loading from "@/components/general/Loading";
import useSWR from "swr";
import CharPost from "./CharPost";
import WeapPost from "./WeapPost";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const Post = ({ type, UID }: { type: "chars" | "weapon"; UID: string }) => {
  const URL = `/api/post?UID=${UID}`;
  const { data, isLoading, error } = useSWR(URL, fetcher);

  if (!data || isLoading) return <Loading loading={1} textOn={true} text="Mengambil Data..." />;
  if (error) return <Error />;

  if (type === "chars") return <CharPost data={data.post.content} />;
  else if (type === "weapon") return <WeapPost data={data.post.content} />;
};

export default Post;
