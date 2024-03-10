import Button, { VariantClass } from "@/components/Input/Button";
import TextField from "@/components/Input/TextField";
import { fetcher } from "@/lib/Data";
import { notif } from "@/utils/fe";
import axios from "axios";
import { Route } from "next";
import React, { useState } from "react";
import useSWR from "swr";

export default function TypeSkill({ index }: { index: number }) {
  const [passiveTypes, setPassiveTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [choiceMode, setChoiceMode] = useState<boolean>(false);
  const url: Route = "/api/gamelingo/evertale?category=rss";
  const { data, isLoading, error } = useSWR(url, fetcher);

  async function addToDatabase(newCharPassiveSkillType: string) {
    const category: General.AdminQueryGameEvertale["subfield"] = "typeskills";
    const type: keyof Evertale.Misc.TypeSkill = "typePassiveSkill";
    const url: Route = `/api/gamelingo/evertale?category=${category}&type=${type}`;
    try {
      setLoading(true);
      const res = await axios.post(url, {
        newCharPassiveSkillType,
      });

      notif(res.data.msg, { color: "green", refElement: "passive-skill-type-select", location: "after" });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function keyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    const charPassiveSkillType: string[] = data.ts[0].typePassiveSkill;
    const target = e.target as HTMLInputElement;
    if (e.key === "Enter") {
      e.preventDefault();
      if (charPassiveSkillType.includes(target.value)) {
        if (passiveTypes.includes(target.value)) {
          alert("Sudah ditambahkan");
          target.value = "";
          return;
        }

        setPassiveTypes([...passiveTypes, target.value]);
        target.value = "";
        return;
      }

      const permition = confirm(`${target.value} tidak ada di Database. Ingin tambahkan?`);
      if (!permition) return; 
      addToDatabase(target.value);
      return;
    }
  }

  return (
    <div className="my-4">
      <TextField forId={`passive-type-${index}`} name={`passive-type-${index}`} label="Passive Skill Type" readOnly variant={!data || isLoading ? "skeleton-variant-1" : "default-variant-1"} value={passiveTypes.join(", ")} />

      {!choiceMode && (
        <Button className={!data || isLoading ? "animate-pulse h-[40px] w-[100px] rounded-lg bg-slate-700 px-4 py-2" : VariantClass.fetch} disabled={!data || isLoading} type="button" onClick={() => setChoiceMode(true)}>
          {data ? "Pilih Tipe Skill" : ""}
        </Button>
      )}

      {choiceMode && (
        <>
          <div className="flex gap-4">
            <Button
              className={VariantClass.danger}
              type="button"
              onClick={() => {
                setPassiveTypes([]);
                setChoiceMode(false);
              }}
            >
              Batal & Hapus
            </Button>
            <Button className={VariantClass.submit} type="button" onClick={() => setChoiceMode(false)}>
              Fiksasi
            </Button>
          </div>
          <p className="text-white font-poppins my-2">Enter untuk input data</p>
          <TextField forId="passive-skill-type-select" label="Passive Skill Type Select" variant="outline-variant-1" list="passive-skill-type-select-list" onKeyDown={keyDownHandler} />
          <datalist id="passive-skill-type-select-list" className="w-[10px]">
            {data.ts[0].typePassiveSkill.map((t: string) => (
              <option value={t} key={`passive-skill-type-${t}`} />
            ))}
          </datalist>
        </>
      )}
    </div>
  );
}
