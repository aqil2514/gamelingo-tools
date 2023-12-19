"use client";

import { Button } from "@/app/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { FormEvent, useState } from "react";

const Commentar = () => {
  return (
    <div className="flex flex-row w-full my-8">
      <div className="w-[180px] h-[48px] relative">
        <Image src="/no-profile.png" fill alt="Account" className="rounded-full w-auto h-auto object-cover" />
      </div>
      <div className="flex flex-col ml-4">
        <h4 className="font-mclaren font-semibold text-lg text-white">Nama akun yang komentar</h4>
        <p className="font-poppins text-base text-white text-justify">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam voluptates quis nobis aspernatur, in nulla ipsa excepturi dolorum tempora laudantium reiciendis accusantium vero ratione beatae dolor pariatur atque incidunt autem rem
          ex vel molestias ea totam voluptate. Praesentium cum odio nemo corporis modi qui veniam velit culpa, libero architecto accusamus!
        </p>
      </div>
    </div>
  );
};

const CommentBox = () => {
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      alert("Fitur sedang dikembangkan");
      // const { data } = await axios.post("/api/gamelingo/evertale/comment", {
      //   comment,
      // });

      // console.log(data);
    } catch (error) {
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
        <Button variant={"secondary"} disabled={loading} className="py-2">
          {loading ? "Menambah komentar..." : "Tambah Komentar"}
        </Button>
      </form>
    </div>
  );
};

export default function Comment() {
  return (
    <div className="w-2/3 min-h-[100px] bg-[rgba(0,0,0,0.5)] px-8 py-4 rounded-xl mx-8">
      <h3 className="text-center text-white font-bold font-merriweather">Komentar</h3>
      <Commentar />
      <CommentBox />
    </div>
  );
}
