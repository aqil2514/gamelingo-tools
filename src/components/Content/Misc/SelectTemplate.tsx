"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface SelectTemplateProps{
  template: "write" | "edit";
}

export default function SelectTemplate({template}: SelectTemplateProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const game = searchParams.get("game");

  function changeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;

    if (value === "select-game") return router.replace(`/${template}`);

    router.replace(`/${template}?game=${value}`);
  }
  return (
    <div>
      <label
        htmlFor="section-template"
        className="text-lg text-white font-poppins font-semibold"
      >
        Game :{" "}
      </label>
      <select
        name="section-template"
        id="section-template"
        className="block my-2 bg-zinc-800 text-white font-semibold font-poppins px-4"
        defaultValue={game ? game : ""}
        onChange={changeHandler}
      >
        <option value="select-game"> Select Game</option>
        <option value="genshin-impact">Genshin Impact</option>
        <option value="evertale">Evertale</option>
      </select>
    </div>
  );
}
