import TextField from "@/components/Input/TextField";
import TypeSkill from "./TypeSkill";
import Textarea, { TextareaStyle } from "@/components/Input/Textarea";
import React, { useState } from "react";
import { TrashFill } from "react-bootstrap-icons";
import Button, { VariantClass } from "@/components/Input/Button";
import { showTextareMessage, hideTextareaMessage, notif, translateHandler } from "@/utils/fe";

export default function CharacterActiveSkill() {
  const [index, setIndex] = useState<number>(1);
  const [newField, setNewField] = useState<number[]>([]);

  function addHandler() {
    if (index === 4)
      return notif("Active Skill maksimal 4", {
        refElement: "active-skill-add-field",
        color: "red",
        location: "after",
      });
    setIndex((_prev) => index + 1);
    setNewField([...newField, index]);
    notif("Berhasil tambah", {
      refElement: "active-skill-add-field",
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
      refElement: "active-skill-add-field",
      color: "green",
      location: "after",
    });
  }

  return (
    <div id="character-active-skill">
      <h5 className="text-white text-xl underline text-center font-bold font-poppins my-4">Character Active Skill</h5>
      <div>
        <h6 className="text-white underline font-bold font-poppins my-4">Active Skill {1}</h6>
        <TextField forId={`active-skill-name-${1}`} label="Skill Name" variant="default-variant-1" name={`active-skill-name-${1}`} />
        <TypeSkill index={1} />
        <div className="grid grid-cols-3 gap-4">
          <TextField forId={`active-skill-spirit-${1}`} label="Skill Spirit" variant="default-variant-1" name={`active-skill-spirit-${1}`} />
          <TextField forId={`active-skill-target-${1}`} label="Skill Target" variant="default-variant-1" name={`active-skill-target-${1}`} />
          <TextField forId={`active-skill-tu-${1}`} label="Skill TU" variant="default-variant-1" name={`active-skill-tu-${1}`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Textarea forId={`active-skill-desc-en-${1}`} className={TextareaStyle.variant_1} name={`active-skill-desc-en-${1}`} onFocus={showTextareMessage} onBlur={hideTextareaMessage} label="Description" onKeyDown={translateHandler} />
            <p className="absolute bottom-[15%] right-[1%] hidden">CTRL + Enter untuk terjemahkan langsung</p>
          </div>
          <div>
            <Textarea forId={`active-skill-desc-id-${1}`} className={TextareaStyle.variant_1} name={`active-skill-desc-id-${1}`} label="Deskripsi" />
          </div>
        </div>
      </div>
      {newField.map((el) => {
        return (
          <div key={el}>
            <h6 className="text-white underline font-bold font-poppins my-4">Active Skill {el + 1}</h6>

            <TextField forId={`active-skill-name-${el + 1}`} label="Skill Name" variant="default-variant-1" name={`active-skill-name-${el + 1}`} />
            <TypeSkill index={el + 1} />
            <div className="grid grid-cols-3 gap-4">
              <TextField forId={`active-skill-spirit-${el + 1}`} label="Skill Spirit" variant="default-variant-1" name={`active-skill-spirit-${el + 1}`} />
              <TextField forId={`active-skill-target-${el + 1}`} label="Skill Target" variant="default-variant-1" name={`active-skill-target-${el + 1}`} />
              <TextField forId={`active-skill-tu-${el + 1}`} label="Skill TU" variant="default-variant-1" name={`active-skill-tu-${el + 1}`} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Textarea forId={`active-skill-desc-en-${el + 1}`} className={TextareaStyle.variant_1} name={`active-skill-desc-en-${el + 1}`} label="Description" onFocus={showTextareMessage} onBlur={hideTextareaMessage} onKeyDown={translateHandler} />
                <p className="absolute bottom-[15%] right-[1%] hidden">CTRL + Enter untuk terjemahkan langsung</p>
              </div>
              <div>
                <Textarea forId={`active-skill-desc-id-${el + 1}`} className={TextareaStyle.variant_1} name={`active-skill-desc-id-${el + 1}`} label="Deskripsi" />
              </div>
            </div>
            {newField.length + 1 === el + 1 && <TrashFill data-label={el + 1} className="my-2 text-lg text-red-500 cursor-pointer hover:text-red-300" onClick={deleteHandler} />}
            <br />
          </div>
        );
      })}

      <div className="flex my-4" id="active-skill-add-field">
        <Button className={VariantClass.fetch} type="button" onClick={addHandler}>
          Tambah Field
        </Button>
      </div>
    </div>
  );
}
