import Button, { VariantClass } from "@/components/Input/Button";
import TextField from "@/components/Input/TextField";
import { fetcher } from "@/lib/Data";
import { notif } from "@/utils/fe";
import axios from "axios";
import { Route } from "next";
import React, { useState } from "react";
import useSWR from "swr";

interface CharTeamProps {
  template: "Write" | "Edit";
}
export default function CharTeam({ template }: CharTeamProps) {
  if (template === "Write") return <WriteContent />;
}

function WriteContent() {
  const [teams, setTeams] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [choiceMode, setChoiceMode] = useState<boolean>(false);
  const url: Route = "/api/gamelingo/evertale?category=rss";
  const { data, isLoading, error } = useSWR(url, fetcher);

  async function addToDatabase(newCharTeam: string) {
    const category: General.AdminQueryGameEvertale["subfield"] = "typeskills";
    const type: keyof Evertale.Misc.TypeSkill = "typeCharTeam";
    const url: Route = `/api/gamelingo/evertale?category=${category}&type=${type}`;
    try {
      setLoading(true);
      const res = await axios.post(url, {
        newCharTeam,
      });

      notif(res.data.msg, { color: "green", refElement: "team-select", location: "after" });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function keyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    const charTeam: string[] = data.ts[0].typeCharTeam;
    const target = e.target as HTMLInputElement;
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      setChoiceMode(false);
    }
    else if (e.key === "Enter") {
      e.preventDefault();
      if (charTeam.includes(target.value)) {
        if (teams.includes(target.value)) {
          alert("Sudah ditambahkan");
          target.value = "";
          return;
        }

        setTeams([...teams, target.value]);
        target.value = "";
        return;
      }

      const permition = confirm(`${target.value} tidak ada di Database. Ingin tambahkan?`);
      if (!permition) return;
      addToDatabase(target.value);
      return;
    }
    else if (e.ctrlKey && e.key === "b") {
      e.preventDefault();
      setTeams([]);
      setChoiceMode(false);
    }
  }

  return (
    <div className="my-4">
      <TextField forId="charTeam" name="status-charTeam" label="Character Team" readOnly variant={!data || isLoading ? "skeleton-variant-1" : "default-variant-1"} value={teams.join(", ")} onFocus={() => {
        const select = document.getElementById("team-select") as HTMLInputElement | null;
        setChoiceMode(true);
        if(select){
          select.focus()
        }
        }} />

      {!choiceMode && (
        <Button className={!data || isLoading ? "animate-pulse h-[40px] w-[100px] rounded-lg bg-slate-700 px-4 py-2" : VariantClass.fetch} disabled={!data || isLoading} type="button" onClick={() => setChoiceMode(true)}>
          {data ? "Pilih Tim" : ""}
        </Button>
      )}

      {choiceMode && (
        <>
          <div className="flex gap-4">
            <Button
              className={VariantClass.danger}
              type="button"
              onClick={() => {
                setTeams([]);
                setChoiceMode(false);
              }}
            >
              Batal & Hapus
            </Button>
            <Button className={VariantClass.submit} type="button" onClick={() => setChoiceMode(false)}>
              Fiksasi
            </Button>
          </div>
          <ul>
            <li className="text-blue-500 font-bold font-poppins my-2">&gt; Enter untuk input data</li>
            <li className="text-blue-500 font-bold font-poppins my-2">&gt; CTRL + Enter untuk fiksasi</li>
            <li className="text-blue-500 font-bold font-poppins my-2">&gt; CTRL + B untuk Batal</li>
          </ul>
          <TextField forId="team-select" label="Team Select" variant="outline-variant-1" list="team-select-list" onKeyDown={keyDownHandler} />
          <datalist id="team-select-list" className="w-[10px]">
            {data.ts[0].typeCharTeam.map((t: string) => (
              <option value={t} key={`team-${t}`} />
            ))}
          </datalist>
        </>
      )}
    </div>
  );
}
