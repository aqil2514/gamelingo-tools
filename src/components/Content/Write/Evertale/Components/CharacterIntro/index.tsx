import Button, { VariantClass } from "@/components/Input/Button";
import Checkbox from "@/components/Input/Checkbox";
import TextField from "@/components/Input/TextField";
import Textarea, { TextareaStyle } from "@/components/Input/Textarea";
import { blurHandler, focusHandler } from "@/utils/fe";
import React, { useState } from "react";
import { TrashFill } from "react-bootstrap-icons";

const introName = [
  "intro-gachaIntroEn",
  "intro-gachaIntroId",
  "intro-gachaTextEn",
  "intro-gachaTextId",
  "intro-loginTextEn",
  "intro-loginTextId",
  "intro-text1En",
  "intro-text1Id",
  "intro-text2En",
  "intro-text2Id",
  "intro-text3En",
  "intro-text3Id",
  "intro-text4En",
  "intro-text4Id",
];

const introNameLabel: Record<string, string> = {
  "intro-gachaIntroEn": "Gacha Intro EN",
  "intro-gachaIntroId": "Gacha Intro ID",
  "intro-gachaTextEn": "Gacha Text EN",
  "intro-gachaTextId": "Gacha Text ID",
  "intro-loginTextEn": "Login Text EN",
  "intro-loginTextId": "Login Text ID",
  "intro-text1En": "Text 1 EN",
  "intro-text1Id": "Text 1 ID",
  "intro-text2En": "Text 2 EN",
  "intro-text2Id": "Text 2 ID",
  "intro-text3En": "Text 3 EN",
  "intro-text3Id": "Text 3 ID",
  "intro-text4En": "Text 4 EN",
  "intro-text4Id": "Text 4 ID",
};

interface NewFieldState {
  label: string;
}

export default function CharacterIntro() {
  const [newField, setNewField] = useState<NewFieldState[]>(
    [] as NewFieldState[]
  );
  const [labelName, setLabelName] = useState<string>("");
  const [addMore, setAddMore] = useState<boolean>(false);
  const [addMode, setAddMode] = useState<boolean>(false);

  function keyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      setNewField([...newField, { label: labelName }]);
      setLabelName("");
      if (!addMore) {
        setAddMode(false);
      }
    }
  }

  function deleteHandler(e: React.MouseEvent<HTMLOrSVGElement>) {
    const target = e.currentTarget as HTMLOrSVGScriptElement;
    const labelTarget = target.getAttribute("data-label");

    if (!labelTarget) throw new Error("eror: Label Target belum diisi");
    const filtered = newField.filter((el) => el.label !== labelTarget);
    setNewField(filtered);
  }

  return (
    <div>
      <h5 className="text-white text-xl underline text-center font-bold font-poppins my-4">
        Character Intro
      </h5>
      <div className="grid grid-cols-2 gap-4">
        {introName.map((el) => {
          if (el.toLowerCase().includes("en"))
            return (
              <div key={el}>
                <Textarea
                  className={TextareaStyle.variant_1}
                  forId={el}
                  label={introNameLabel[el]}
                  name={el}
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                />
                <p className="absolute bottom-[15%] right-[1%] hidden">
                  CTRL + Enter untuk terjemahkan langsung
                </p>
              </div>
            );

          return (
            <div key={el}>
              <Textarea
                className={TextareaStyle.variant_1}
                forId={el}
                label={introNameLabel[el]}
                name={el}
              />
            </div>
          );
        })}
        {newField.map((el, i: number) => (
          <>
            <div className="relative">
              <Textarea
                key={`${el.label}-en`}
                className={TextareaStyle.variant_1}
                forId={`new-field-${i + 1}-en`}
                label={`${el.label} EN`}
                name={`intro-new-field-${i + 1}-en`}
                onFocus={focusHandler}
                onBlur={blurHandler}
              />
              <p className="absolute bottom-[15%] right-[1%] hidden">
                CTRL + Enter untuk terjemahkan langsung
              </p>
            </div>
            <div>
              <Textarea
                key={`${el.label}-id`}
                className={TextareaStyle.variant_1}
                forId={`new-field-${i + 1}-id`}
                label={`${el.label} ID`}
                name={`intro-new-field-${i + 1}-id`}
              />
            </div>
            <TrashFill
              data-label={el.label}
              className="my-2 text-lg text-red-500 cursor-pointer hover:text-red-300"
              onClick={deleteHandler}
            />
            <br />
          </>
        ))}
      </div>
      <div className="flex my-4">
        <Button
          className={VariantClass.fetch}
          type="button"
          onClick={() => setAddMode(!addMode)}
        >
          {addMode ? "Kembali" : "Tambah Field"}
        </Button>
      </div>
      {addMode && (
        <>
          <Checkbox
            variant="default-variant-1"
            checked={addMore}
            onChange={() => setAddMore(!addMore)}
            forId="multiple-add-field"
            label="Tambah Lagi"
          />
          <div className="my-4">
            <TextField
              variant="outline-variant-1"
              forId="new-variant-config"
              label="Nama Field"
              value={labelName}
              onChange={(e) => setLabelName(e.target.value)}
              onKeyDown={keyDownHandler}
            />
          </div>
        </>
      )}
    </div>
  );
}
