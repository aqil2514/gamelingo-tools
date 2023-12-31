"use client";

import Error from "@/components/general/Error";
import Loading from "@/components/general/Loading";
import useSWR from "swr";
import CharPost from "./CharPost";

// TODO : Tampilin data ke halamannya jangan dari api chars, tapi dari api Post ///////////

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const Post = ({ type, UID }: { type: "chars" | "weapon"; UID: string }) => {
  const URL = `/api/post?UID=${UID}`;
  const { data, isLoading, error } = useSWR(URL, fetcher);

  if (!data || isLoading) return <Loading loading={1} textOn={true} text="Mengambil Data..." />;
  if (error) return <Error />;

  if (type === "chars") return <CharPost data={data.post.content} />;
};

export default Post;
