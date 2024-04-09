import TextField from "@/components/Input/TextField";
import ErrorFeching from "../Component/Error";
import { useState } from "react";
import TableMapping from "@/components/Content/Write/Genshin/Talent/Table";
import PassiveTalent from "@/components/Content/Write/Genshin/Talent/Passive";

const formNameMapping: Record<string, keyof FormUtils.Genshin.FormDataTalent> =
  {
    charName: "character-name",
    "combat1-name": "combat1-name",
    "combat1-description": "combat1-description",
    "combat1-icon" : "talent-combat1-icon",
  };

export default function Form({ data }: { data: GenshinImpact.Talent }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!data) return <ErrorFeching template="Characer" />;

  return (
    <form>
      <h3 className="font-bold text-white text-xl font-poppins text-center underline">
        Edit {data.charName} Talent
      </h3>

      <input type="hidden" name="id" value={data._id} />

      <TextField
        variant="default-variant-1"
        defaultValue={data.charName}
        label="Character Name"
        forId="charName"
        disabled={isLoading}
        name={formNameMapping.charName}
      />

      <TableMapping template="Edit" index="combat1" edit={data} />

      <TableMapping template="Edit" index="combat2" edit={data} />

      <TableMapping template="Edit" index="combat3" edit={data} />

      {data.combats.combatsp && <TableMapping template="Edit" index="combatsp" edit={data} />}

      <PassiveTalent template="Edit" edit={data} index="passive1" />

      <PassiveTalent template="Edit" edit={data} index="passive2" />
      
      <PassiveTalent template="Edit" edit={data} index="passive3" />
    </form>
  );
}
