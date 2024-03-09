import Button, { VariantClass } from "@/components/Input/Button";
import TextField from "@/components/Input/TextField";
import Textarea, { TextareaStyle } from "@/components/Input/Textarea";
import React, { useState } from "react";
import { TrashFill } from "react-bootstrap-icons";

const introName = ["gachaIntroEn", "gachaIntroId", "gachaTextEn", "gachaTextId", "loginTextEn", "loginTextId", "text1En", "text1Id", "text2En", "text2Id", "text3Id", "text3En", "text4En", "text4Id"];

const introNameLabel: Record<string, string> = {
  gachaIntroEn: "Gacha Intro EN",
  gachaIntroId: "Gacha Intro ID",
  gachaTextEn: "Gacha Text EN",
  gachaTextId: "Gacha Text ID",
  loginTextEn: "Login Text EN",
  loginTextId: "Login Text ID",
  text1En: "Text 1 EN",
  text1Id: "Text 1 ID",
  text2En: "Text 2 EN",
  text2Id: "Text 2 ID",
  text3En: "Text 3 EN",
  text3Id: "Text 3 ID",
  text4En: "Text 4 EN",
  text4Id: "Text 4 ID",
};

interface NewFieldState {
  label: string;
}

export default function CharacterIntro() {
  const [newField, setNewField] = useState<NewFieldState[]>([{}] as NewFieldState[]);
  const [labelName, setLabelName] = useState<string>("");
  const [addMode, setAddMode] = useState<boolean>(false);

  function keyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      setNewField([...newField, { label: labelName }]);
      setLabelName("");
    }
  }

  function deleteHandler(e: React.MouseEvent<HTMLOrSVGElement>) {
    const target = e.target as HTMLOrSVGScriptElement;
    const labelTarget = target.getAttribute("data-label");

    if (!labelTarget) throw new Error("eror: Label Target belum diisi");
    const filtered = newField.filter((el) => el.label !== labelTarget);
    setNewField(filtered);
  }

  return (
    <div>
      <h5 className="font-bold font-poppins text-white text-center my-4">Character Intro</h5>
      <div>
        {introName.map((el) => (
          <Textarea key={el} className={TextareaStyle.variant_1} forId={el} label={introNameLabel[el]} name={el} />
        ))}
        {newField.map((el, i: number) => (
          <>
            <Textarea key={el.label} className={TextareaStyle.variant_1} forId={`new-field-${i + 1}-en`} label={el.label} name={`new-field-${i + 1}-en`} />
            <Textarea key={el.label} className={TextareaStyle.variant_1} forId={`new-field-${i + 1}-id`} label={el.label} name={`new-field-${i + 1}-id`} />
            <TrashFill data-label={el.label} className="my-2 text-lg text-red-500 cursor-pointer hover:text-red-300" onClick={deleteHandler} />
          </>
        ))}
      </div>
      <div>
        <Button className={addMode ? VariantClass.danger : VariantClass.fetch} type="button" onClick={() => setAddMode(!addMode)}>
          {addMode ? "Batalkan" : "Tambah Field untuk Intro"}
        </Button>
        {addMode && (
          <div className="my-4">
            <TextField variant="outline-variant-1" forId="new-variant-config" label="Nama Field" value={labelName} onChange={(e) => setLabelName(e.target.value)} onKeyDown={keyDownHandler} />
          </div>
        )}
      </div>
    </div>
  );
}
