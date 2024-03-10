import TextField from "@/components/Input/TextField";
import TypeSkill from "./TypeSkill";
import Textarea, { TextareaStyle } from "@/components/Input/Textarea";
import { useState } from "react";
import { TrashFill } from "react-bootstrap-icons";
import Button, { VariantClass } from "@/components/Input/Button";

export default function CharacterActiveSkill() {
  const [index, setIndex] = useState<number>(1);
  const [newField, setNewField] = useState<number[]>([]);

  function addHandler() {
    setIndex(index + 1);
    setNewField([...newField, index]);
  }

  function deleteHandler(e: React.MouseEvent<HTMLOrSVGElement>) {
    const target = e.currentTarget as HTMLOrSVGScriptElement;
    const labelTarget = Number(target.getAttribute("data-label"));

    if (!labelTarget) throw new Error("eror: Label Target belum diisi");
    const filtered = newField.filter((el) => el !== labelTarget);
    setNewField(filtered);
  }

  return (
    <div>
      <h5 className="text-white text-xl underline text-center font-bold font-poppins my-4">Character Active Skill</h5>
      <div>
        <TextField forId={`active-skill-name-${index}`} label="Skill Name" variant="default-variant-1" name={`active-skill-name-${1}`} />
        <TypeSkill index={index} />
        <div className="grid grid-cols-3 gap-4">
          <TextField forId={`active-skill-spirit-${index}`} label="Skill Spirit" variant="default-variant-1" name={`active-skill-spirit-${1}`} />
          <TextField forId={`active-skill-target-${index}`} label="Skill Target" variant="default-variant-1" name={`active-skill-target-${1}`} />
          <TextField forId={`active-skill-tu-${index}`} label="Skill TU" variant="default-variant-1" name={`active-skill-tu-${1}`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Textarea forId={`active-skill-desc-en-${index}`} className={TextareaStyle.variant_1} name={`active-skill-desc-en-${index}`} label="Description" />
          </div>
          <div>
            <Textarea forId={`active-skill-desc-id-${index}`} className={TextareaStyle.variant_1} name={`active-skill-desc-id-${index}`} label="Description" />
          </div>
        </div>
      </div>
      {newField.map((el) => (
        <>
          <TextField forId={`active-skill-name-${el}`} label="Skill Name" variant="default-variant-1" name={`active-skill-name-${1}`} />
          <TypeSkill index={el} />
          <div className="grid grid-cols-3 gap-4">
            <TextField forId={`active-skill-spirit-${el}`} label="Skill Spirit" variant="default-variant-1" name={`active-skill-spirit-${1}`} />
            <TextField forId={`active-skill-target-${el}`} label="Skill Target" variant="default-variant-1" name={`active-skill-target-${1}`} />
            <TextField forId={`active-skill-tu-${el}`} label="Skill TU" variant="default-variant-1" name={`active-skill-tu-${1}`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Textarea forId={`active-skill-desc-en-${el}`} className={TextareaStyle.variant_1} name={`active-skill-desc-en-${index + 1}`} label="Description" />
            </div>
            <div>
              <Textarea forId={`active-skill-desc-id-${el}`} className={TextareaStyle.variant_1} name={`active-skill-desc-id-${index}`} label="Deskripsi" />
            </div>
          </div>
          <TrashFill data-label={el} className="my-2 text-lg text-red-500 cursor-pointer hover:text-red-300" onClick={deleteHandler} />
          <br />
        </>
      ))}
      <div className="flex my-4">
        <Button className={VariantClass.fetch} type="button" onClick={addHandler}>
          Tambah Field
        </Button>
      </div>
    </div>
  );
}
