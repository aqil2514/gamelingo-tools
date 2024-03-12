import TextField from "@/components/Input/TextField";
import TypeSkill from "./TypeSkill";
import Textarea, { TextareaStyle } from "@/components/Input/Textarea";
import React, { useEffect, useRef, useState } from "react";
import { TrashFill } from "react-bootstrap-icons";
import Button, { VariantClass } from "@/components/Input/Button";
import { showTextareMessage, hideTextareaMessage, notif, translateHandler } from "@/utils/fe";
import { Route } from "next";
import useSWR from "swr";
import { fetcher } from "@/lib/Data";
import SkillName from "./SkillName";

export default function CharacterPassiveSkill() {
  const url: Route = "/api/gamelingo/evertale?category=passive-skill";
  const { data, isLoading, error } = useSWR(url, fetcher);
  const [index, setIndex] = useState<number>(0);
  const [newField, setNewField] = useState<number[]>([]);
  const [passiveTypes, setPassiveTypes] = useState<string[]>([]);

  const passive: Evertale.Misc.PassiveSkill[] = data?.data;

  function addHandler() {
    if (index === 4)
      return notif("passive Skill maksimal 4", {
        refElement: "passive-skill-add-field",
        color: "red",
        location: "after",
      });
    setIndex((_prev) => index + 1);
    setNewField([...newField, index]);
    notif("Berhasil tambah", {
      refElement: "passive-skill-add-field",
      color: "green",
      location: "after",
    });
  }

  function deleteHandler(e: React.MouseEvent<SVGSVGElement>) {
    const target = e.currentTarget as SVGSVGElement;
    const labelTarget = Number(target.getAttribute("data-label"));

    if (!labelTarget) throw new Error("eror: Label Target belum diisi");
    const filtered = newField.filter((el) => el + 1 !== labelTarget);
    setNewField(filtered);
    setIndex((_prev) => index - 1);
    notif("Berhasil hapus", {
      refElement: "passive-skill-add-field",
      color: "green",
      location: "after",
    });
  }

  return (
    <div id="character-passive-skill">
      <h5 className="text-white text-xl underline text-center font-bold font-poppins my-4">Character Passive Skill</h5>
      {newField.length === 0 ? (
        <div className="flex p-4 justify-center">
          <h5 className="text-white text-xl text-center font-bold font-mclaren my-4">Belum tambah data</h5>
        </div>
      ) : (
        newField.map((el) => {
          return (
            <div key={el}>
              <h6 className="text-white underline font-bold font-poppins my-4">Passive Skill {el + 1}</h6>

              <SkillName passive={passive} setPassiveTypes={setPassiveTypes} data={data} isLoading={isLoading} el={el} />
              <TypeSkill passiveTypes={passiveTypes} setPassiveTypes={setPassiveTypes} index={el + 1} />
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Textarea forId={`passive-skill-desc-en-${el + 1}`} className={TextareaStyle.variant_1} name={`passive-skill-desc-en-${el + 1}`} label="Description" onKeyDown={translateHandler} onFocus={showTextareMessage} onBlur={hideTextareaMessage} />
                  <p className="absolute bottom-[10%] right-[3%] bg-white w-[95%] text-right px-8 hidden">CTRL + Enter untuk terjemahkan langsung</p>
                </div>
                <div>
                  <Textarea forId={`passive-skill-desc-id-${el + 1}`} className={TextareaStyle.variant_1} name={`passive-skill-desc-id-${el + 1}`} label="Deskripsi" />
                </div>
              </div>
              {newField.length + 1 === el + 1 && <TrashFill data-label={el + 1} className="my-2 text-lg text-red-500 cursor-pointer hover:text-red-300" onClick={deleteHandler} />}
              <br />
            </div>
          );
        })
      )}

      <div className="flex my-4" id="passive-skill-add-field">
        <Button className={VariantClass.fetch} type="button" onClick={addHandler}>
          Tambah Field
        </Button>
      </div>
    </div>
  );
}
