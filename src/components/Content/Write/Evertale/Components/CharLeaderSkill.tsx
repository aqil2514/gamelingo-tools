import Button, { VariantClass } from "@/components/Input/Button";
import TextField from "@/components/Input/TextField";
import Textarea, { TextareaStyle } from "@/components/Input/Textarea";
import { fetcher } from "@/lib/Data";
import { notif } from "@/utils/fe";
import axios, { isAxiosError } from "axios";
import { Route } from "next";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";

export default function LeaderSkill() {
  const url: Route = "/api/gamelingo/evertale?category=rss";
  const { data, isLoading, error } = useSWR(url, fetcher);
  const [leaderSkill, setLeaderSkill] = useState<string>("");
  const [noDataExist, setNoDataExist] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addMode, setAddMode] = useState<boolean>(true);
  const [lsData, setLsData] = useState<Evertale.Misc.LeaderSkill>({} as Evertale.Misc.LeaderSkill);

  const ls: Evertale.Misc.LeaderSkill[] = data?.ls;
  const lsType: Evertale.Misc.TypeSkill["typeLeaderSkill"] = data?.ts[0]?.typeLeaderSkill;
  useEffect(() => {
    const lsName = ls?.map((l) => l.name.toLowerCase());
    if (!lsName?.includes(leaderSkill.toLowerCase()) && leaderSkill) {
      setNoDataExist(true);
      return;
    }
    setNoDataExist(false);
    return;
  }, [leaderSkill, ls]);

  async function addHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const url: Route = "/api/gamelingo/evertale";
    const category: General.AdminQueryGameEvertale["subfield"] = "leaderskills";
    const type: keyof Evertale.Misc.TypeSkill = "typeLeaderSkill";
    try {
      setIsAdding(true);
      const res = await axios.post(url, lsData, {
        params: {
          category,
          type,
        },
      });

      notif(res.data.msg, { refElement: "ls-data-add-mode-button", color: "green", location: "before" });
      setTimeout(() => {
        setAddMode(false);
      }, 3000);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 409) {
          notif(error.response.data.msg, { refElement: "ls-data-add-mode-button", color: "red", location: "before" });
        }
      }
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div>
      <TextField
        variant={!data || isLoading ? "skeleton-variant-1" : "default-variant-1"}
        forId="charLeaderSkill"
        label="Character Leader Skill"
        value={leaderSkill}
        onChange={(e) => setLeaderSkill((prev) => e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && noDataExist) {
            e.preventDefault();
            setAddMode(true);
          }
        }}
        list="ls-list"
        name="charLeaderSkill"
      />
      {noDataExist && <p className="font-bold  font-poppins my-4 text-blue-500">Tidak ada di database. Tekan Enter untuk menambahkan</p>}

      <datalist id="ls-list">
        {ls?.map((skill) => (
          <option value={skill.name} key={skill._id} />
        ))}
      </datalist>

      <datalist id="ls-type-list">
        {lsType?.map((skill) => (
          <option value={skill} key={skill} />
        ))}
      </datalist>

      {addMode && (
        <div className="fixed  left-[250px] rounded-xl top-20 bg-slate-700 w-2/3 h-[400px] overflow-scroll scrollbar-style p-4">
          <TextField disabled={isAdding} forId="lsAddName" value={lsData.name} onChange={(e) => setLsData({ ...lsData, name: e.target.value })} variant="default-variant-1" label="Leader Skill Name" />

          <TextField disabled={isAdding} forId="lsAddName" value={lsData.typeSkill} onChange={(e) => setLsData({ ...lsData, typeSkill: e.target.value })} variant="default-variant-1" label="Leader Skill Name" list="ls-type-list" />

          <Textarea disabled={isAdding} forId="indo-desc" value={lsData.descId} onChange={(e) => setLsData({ ...lsData, descId: e.target.value })} className={TextareaStyle.variant_1} label="Deskripsi Indonesia" />

          <Textarea disabled={isAdding} forId="en-desc" value={lsData.descEn} onChange={(e) => setLsData({ ...lsData, descEn: e.target.value })} className={TextareaStyle.variant_1} label="English Description" />

          <div id="ls-data-add-mode-button" className="flex gap-4">
            <Button disabled={isAdding} className={VariantClass.danger} type="button" onClick={() => setAddMode(false)}>
              Batal
            </Button>
            <Button disabled={isAdding} className={VariantClass.submit} type="button" onClick={addHandler}>
              {isAdding ? "Menambahkan..." : "Tambahkan"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
