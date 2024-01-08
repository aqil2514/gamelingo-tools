"use client";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const PostList = ({ UID, sort, category, limit = 9 }: { UID: string; sort: string; category: string; limit?: number }) => {
  const URL = `/api/post?UID=${UID}&tag=true&sort=${sort}&category=${category}&limit=${limit}`;
  const res = useSWR(URL, fetcher);

  if (!res.data) return <></>;

  console.log(res.data);

  const title = res.data.title;
  const data = res.data.data;

  return (
    <div className="bg-slate-800 rounded-xl p-4">
      <h1 className="font-bold text-center text-white font-merienda text-lg md:text-xl lg:text-2xl">{title}</h1>
      <div>
        {data.map((d: any) => (
          <Link key={d.id} href={`/evertale/char/${d.id}`}>
            <figure className="flex flex-row justify-start my-4 gap-4">
              <Image width={64} height={64} alt={d.name} src={d.image} className="object-cover rounded-xl" />
              <figcaption className="my-auto text-white text-base font-merriweather font-semibold">{d.name}</figcaption>
            </figure>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostList;
