"use client";
import React from "react";
import { SubTemplateDataState, subTemplateData } from "../Content/Misc/Data";
import Button, { VariantClass } from "../Input/Button";
import axios from "axios";
import { notif } from "@/utils/fe";

export default function BackupComponents() {
  const [game, setGame] = React.useState<keyof SubTemplateDataState>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const uniqueId = React.useId();

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = "/api/backup";

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      setIsLoading(true);
      const res = await axios.postForm(url, formData);

      notif(res.data.msg, { color: "green", refElement: "backup-button", location: "before" });
    } catch (error) {
      notif("Terjadi kesalahan", { color: "red", refElement: "backup-button", location: "before" });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4 w-full">
      <form onSubmit={submitHandler}>
        <select disabled={isLoading} name="game" id="game-select" onChange={(e) => setGame(e.target.value as keyof SubTemplateDataState)} className="px-4 py-2 bg-slate-600 font-bold text-center text-white rounded-md block my-4 mx-auto">
          <option value="genshin-impact">Genshin Impact</option>
          <option value="evertale">Evertale</option>
        </select>
        {game && (
          <select disabled={isLoading} name="category" id="category-select" className="block my-4 mx-auto px-4 py-2 bg-slate-600 font-bold text-center text-white rounded-md">
            {subTemplateData[game].map((el) => (
              <option key={uniqueId} value={el}>
                {el}
              </option>
            ))}
          </select>
        )}
        <Button id="backup-button" className={VariantClass.fetch + "block mx-auto font-bold"}>
          {isLoading ? "Backing up..." : "Backup"}
        </Button>
      </form>
    </div>
  );
}
