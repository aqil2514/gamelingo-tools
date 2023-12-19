"use client";

import { Button } from "@/app/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { FormEvent, useState } from "react";

const Commentar = () => {
  return (
    <div className="flex flex-col w-full my-8">
      <div className="flex flex-row ">
        <Image src="/no-profile.png" width={64} height={64} alt="Account" className="rounded-full mr-2 md:mr-4 w-[32px] h-[32px] md:w-[64px] md:h-[64px] object-cover" />
        <h4 className="font-mclaren font-semibold my-auto ml-2 md:ml-4 text-base md:text-lg text-white">Nama akun yang komentar</h4>
      </div>
      <p className="font-poppins mt-4 text-sm md:text-base text-white text-justify">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam voluptates quis nobis aspernatur, in nulla ipsa excepturi dolorum tempora laudantium reiciendis accusantium vero ratione beatae dolor pariatur atque incidunt autem rem ex
        vel molestias ea totam voluptate. Praesentium cum odio nemo corporis modi qui veniam velit culpa, libero architecto accusamus!
      </p>
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
        <Button variant={"secondary"} disabled={loading} className="py-2 my-2">
          {loading ? "Menambah komentar..." : "Tambah Komentar"}
        </Button>
      </form>
    </div>
  );
};

export default function Comment() {
  return (
    <div className="w-full lg:w-2/3 min-h-[100px] bg-[rgba(0,0,0,0.5)] px-8 py-4 md:rounded-xl md:mx-8">
      <h3 className="text-center text-white font-bold font-merriweather">Komentar</h3>
      <CommentBox />
      <Commentar />
    </div>
  );
}
