import Button, { VariantClass } from "@/components/Input/Button";
import TextField from "@/components/Input/TextField";
import Textarea, { TextareaStyle } from "@/components/Input/Textarea";
import { fetcher } from "@/lib/Data";
import { Route } from "next";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";

export default function LeaderSkill() {
  const [configMode, setConfigMode] = useState<boolean>(false);
  const url: Route = "/api/gamelingo/evertale?category=rss";
  const { data, isLoading, error } = useSWR(url, fetcher);
  const [leaderSkill, setLeaderSkill] = useState<string>("");
  const [noDataExist, setNoDataExist] = useState<boolean>(false);
  const [addMode, setAddMode] = useState<boolean>(true);
  const ls: Evertale.Misc.LeaderSkill[] = data?.ls;

  useEffect(() => {
    const lsName = ls?.map((l) => l.name.toLowerCase());
    if (!lsName?.includes(leaderSkill.toLowerCase()) && leaderSkill) {
      setNoDataExist(true);
      return;
    }
    setNoDataExist(false);
    return;
  }, [leaderSkill, ls]);

  async function addHandler(e:React.MouseEvent<HTMLButtonElement>){
// Lanjutin ini nanti. ngantukk....
  }

  return (
    <div>
      <TextField
        variant={
          !data || isLoading ? "skeleton-variant-1" : "default-variant-1"
        }
        forId="charLeaderSkill"
        label="Character Leader Skill"
        value={leaderSkill}
        onChange={(e) => setLeaderSkill((prev) => e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setAddMode(true);
          }
        }}
        list="ls-list"
        name="charLeaderSkill"
      />
      {noDataExist && (
        <p className="font-bold  font-poppins my-4 text-blue-500">
          Tidak ada di database. Tekan Enter untuk menambahkan
        </p>
      )}
      <datalist id="ls-list">
        {ls?.map((skill) => (
          <option value={skill.name} key={skill._id} />
        ))}
      </datalist>

      {addMode && <div className="fixed  left-[250px] rounded-xl top-20 bg-slate-700 w-2/3 h-[400px] overflow-scroll scrollbar-style p-4">
        <TextField forId="lsAddName" variant="default-variant-1" label="Leader Skill Name" />
        <Textarea forId="indo-desc" className={TextareaStyle.variant_1} label="Deskripsi Indonesia" />
        <Textarea forId="en-desc" className={TextareaStyle.variant_1} label="English Description" />
        <div className="flex gap-4">

        <Button className={VariantClass.danger} type="button" onClick={() => setAddMode(false)}>Batal</Button>
        <Button className={VariantClass.submit} type="button" onClick={addHandler}>Tambahkan</Button>
        </div>
        </div>}
    </div>
  );
}
