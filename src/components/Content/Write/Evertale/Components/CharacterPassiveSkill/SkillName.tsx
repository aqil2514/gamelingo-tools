import TextField from "@/components/Input/TextField";
import { useEffect, useState } from "react";

interface SkillNameProps {
  passive: Evertale.Misc.PassiveSkill[];
  data: any;
  isLoading: boolean;
  el: number;
  setPassiveTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SkillName({
  passive,
  data,
  isLoading,
  el,
  setPassiveTypes
}: SkillNameProps) {
  const [skillName, setSkillName] = useState<string>("");
  const [instantAdd, setInstantAdd] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  const passiveName = passive?.map((p) => p.skillName);

  useEffect(() => {
    if (passiveName?.includes(skillName) && !isDone) return setInstantAdd(true);
  }, [skillName, instantAdd, passiveName, isDone]);

  function keyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!instantAdd) return;

      const target = e.target as HTMLInputElement;
      const children = target?.parentElement?.parentElement?.children;
      if (!children) throw new Error("Terjadi kesalahan dalam seleksi");
      const types = children[4].children[0].children[0] as HTMLInputElement;
      const descEn = children[5].children[0].children[1] as HTMLTextAreaElement;
      const descId = children[5].children[1].children[1] as HTMLTextAreaElement;

      if (!types.id.includes("type"))
        throw new Error("Yang diseleksi bukan types");
      if (!descEn.id.includes("desc-en"))
        throw new Error("Yang diseleksi bukan description");
      if (!descId.id.includes("desc-id"))
        throw new Error("Yang diseleksi bukan deskripsi");

      const selected = passive.find((p) => p.skillName === target.value);
      if (!selected) throw new Error("Passive tidak ada");

      setPassiveTypes(selected.typeSkill)
      descEn.value = selected.skillDescEn;
      descId.value = selected.skillDescId;

      setInstantAdd(false);
      setIsDone(true);
    }
  }

  return (
    <>
      <datalist id="passive-skill-list">
        {passiveName?.map((p) => (
          <option value={p} key={p} />
        ))}
      </datalist>
      <TextField
        forId={`passive-skill-name-${el + 1}`}
        value={skillName}
        onChange={(e) => {
          setIsDone(false);
          setSkillName((prev) => e.target.value);
        }}
        label="Skill Name"
        variant={
          !data || isLoading ? "skeleton-variant-1" : "default-variant-1"
        }
        list="passive-skill-list"
        name={`passive-skill-name-${el + 1}`}
        onKeyDown={keyDownHandler}
      />

      {instantAdd && (
        <p className="text-green-500 font-bold my-2">
          Skill Passive ada di database. Enter untuk tambah cepat
        </p>
      )}
    </>
  );
}
