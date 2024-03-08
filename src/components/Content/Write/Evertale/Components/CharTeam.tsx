import Button, { VariantClass } from "@/components/Input/Button";
import TextField from "@/components/Input/TextField";
import { fetcher } from "@/lib/Data";
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
  const [choiceMode, setChoiceMode] = useState<boolean>(false);
  const url: Route = "/api/gamelingo/evertale?category=rss";
  const { data, isLoading, error } = useSWR(url, fetcher);

  async function keyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    const charTeam: string[] = data.ts[0].typeCharTeam;
    const target = e.target as HTMLInputElement;
    if (e.key === "Enter") {
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
      alert("tidak ada di db");
      return;
    }
  }
  return (
    <div className="my-4">
      <TextField
        forId="charTeam"
        name="charTeam"
        label="Character Team"
        readOnly
        variant={
          !data || isLoading ? "skeleton-variant-1" : "default-variant-1"
        }
        value={teams.join(", ")}
      />

      {!choiceMode && (
        <Button
          className={
            !data || isLoading
              ? "animate-pulse h-[40px] w-[100px] rounded-lg bg-slate-700 px-4 py-2"
              : VariantClass.fetch
          }
          disabled={!data || isLoading}
          type="button"
          onClick={() => setChoiceMode(true)}
        >
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
            <Button
              className={VariantClass.submit}
              type="button"
              onClick={() => setChoiceMode(false)}
            >
              Fiksasi
            </Button>
          </div>
          <p className="text-white font-poppins my-2">Enter untuk input data</p>
          <TextField
            forId="team-select"
            label="Team Select"
            variant="outline-variant-1"
            list="team-select-list"
            withList={JSON.stringify(data.ts[0].typeCharTeam)}
            onKeyDown={keyDownHandler}
          />
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
