import TextField from "@/components/Input/TextField";
import { useEffect, useState } from "react";

interface SkillNameProps{
    passiveName: string[];
    data: any;
    isLoading: boolean;
    el:number;
}

export default function SkillName({passiveName, data, isLoading, el}:SkillNameProps) {
  const [skillName, setSkillName] = useState<string>("");
  const [instantAdd, setInstantAdd] = useState<boolean>(false);

  useEffect(() => {
    if (passiveName?.includes(skillName)) return setInstantAdd(true);

    setInstantAdd(false);
  }, [skillName, instantAdd, passiveName]);

  function keyDownHandler(e:React.KeyboardEvent<HTMLInputElement>){
    if(e.key === "Enter"){
        e.preventDefault()
      const target = e.target as HTMLInputElement;
      const children = target?.parentElement?.parentElement?.children;
      if(!children) throw new Error("Terjadi kesalahan dalam seleksi");
      const types = children[3].children;

      console.log(types)
    //   const types = target?.parentElement?.nextElementSibling?.firstChild?.lastChild as HTMLInputElement;
    //   const descEn = types?.parentElement?.parentElement?.nextElementSibling?.firstChild?.children[1] as HTMLTextAreaElement;
    //   const descId = descEn?.parentElement?.nextElementSibling?.children[1] as HTMLTextAreaElement;

    //   if(!types.id.includes("type")) throw new Error("Yang diseleksi bukan types")
    //   if(!descEn.id.includes("desc-en")) throw new Error("Yang diseleksi bukan description")
    //   if(!descId.id.includes("desc-id")) throw new Error("Yang diseleksi bukan deskripsi")

    //   console.log(target);
    //   console.log(types);
    //   console.log(descEn);
    //   console.log(descId);
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
        onChange={(e) => setSkillName((prev) => e.target.value)}
        label="Skill Name"
        variant={
          !data || isLoading ? "skeleton-variant-1" : "default-variant-1"
        }
        list="passive-skill-list"
        name={`passive-skill-name-${el + 1}`}
        onKeyDown={keyDownHandler}
      />

      {instantAdd && <p className="text-green-500 font-bold my-2">Skill Passive ada di database. Enter untuk tambah cepat</p>}

      
    </>
  );
}
