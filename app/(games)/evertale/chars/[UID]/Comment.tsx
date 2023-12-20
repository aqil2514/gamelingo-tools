"use client";

import { Button } from "@/app/components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import { SWRError, SWRLoading } from "@/app/components/SWR";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const Commentar = ({ data }: { data: any }) => {
  if (data.comment.length === 0)
    return (
      <div className="flex flex-col w-full my-8">
        <h4 className="font-mclaren font-semibold my-auto ml-2 md:ml-4 text-base md:text-lg text-white">Belum ada yang Komentar. Jadilah yang pertama!</h4>
      </div>
    );
  return (
    <>
      {data.comment.map((comment: any, i: number) => (
        <div className="flex flex-col w-full my-8" key={i++}>
          <div className="flex flex-row ">
            <Image src={comment.avatar || "/no-profile.png"} width={64} height={64} alt="Account" className="rounded-full mr-2 md:mr-4 w-[32px] h-[32px] md:w-[64px] md:h-[64px] object-cover" />
            <h4 className="font-mclaren font-semibold my-auto ml-2 md:ml-4 text-base md:text-lg text-white">{comment.author}</h4>
          </div>
          <p className="font-poppins mt-4 text-sm md:text-base text-white text-justify">{comment.commentText}</p>
        </div>
      ))}
    </>
  );
};

const CommentBox = ({ data }: { data: any }) => {
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!session.data) {
        alert("Anda belum login");
        return;
      }
      const res = await axios.post("/api/gamelingo/evertale/post", {
        comment,
        UID: data.charId,
        session: session.data,
      });

      if (res.status !== 200) {
        alert(res.data.msg);
        return;
      }
      setComment("");
      alert(res.data.msg);
      router.refresh();
    } catch (error) {
      alert("Terjadi kesalahan");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="block w-full my-8">
      <form onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="text-area-comment">
          <h3 className="font-mclaren text-white font-bold">Comment Box : </h3>
          <textarea name="comment" value={comment} placeholder="Kolom Komentar..." onChange={(e) => setComment(e.target.value)} id="text-area-comment" disabled={loading} className="w-full min-h-[100px] rounded-xl mt-2 p-2 font-poppins" />
        </label>
        <Button variant={"secondary"} disabled={loading} className="py-2 my-2">
          {loading ? "Menambah komentar..." : "Tambah Komentar"}
        </Button>
      </form>
    </div>
  );
};

export default function Comment({ data }: { data: any }) {
  return (
    <div className="w-full lg:w-2/3 min-h-[100px] bg-[rgba(0,0,0,0.5)] px-8 py-4 md:rounded-xl md:mx-8">
      <h3 className="text-center text-white font-bold font-merriweather">Komentar</h3>
      <CommentBox data={data} />
      <Commentar data={data} />
    </div>
  );
}
