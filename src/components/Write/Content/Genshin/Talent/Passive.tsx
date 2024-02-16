import { Input, VariantClass } from "@/components/general/Input";
import Textarea, { TextareaStyle } from "@/components/general/Textarea";
import React from "react";

interface PassiveTalentProps {
  talent: GenshinImpact.ApiResponseTalent;
  setTalent: React.Dispatch<React.SetStateAction<GenshinImpact.ApiResponseTalent>>;
  index: "passive1" | "passive2" | "passive3";
}

const title = {
  passive1: "Passive 1",
  passive2: "Passive 2",
  passive3: "Passive 3",
};

export default function PassiveTalent({ talent, setTalent, index }: PassiveTalentProps) {
  return (
    <>
      <h2 className="text-white font-semibold font-poppins">{title[index]}</h2>

      <Input
        forId={`talent-${index}-name`}
        label="Passive Name"
        name={`${index}-name`}
        variant={VariantClass.dashboard}
        onChange={(e) =>
          setTalent({
            ...talent,
            [index]: { ...talent[index], name: e.target.value },
          })
        }
        value={talent[index]?.name}
      />

      <Textarea
        forId={`talent-${index}-description`}
        label="Passive Description"
        name={`${index}-description`}
        className={TextareaStyle.variant_1}
        onChange={(e) =>
          setTalent({
            ...talent,
            [index]: { ...talent[index], description: e.target.value },
          })
        }
        value={talent[index]?.description}
      />
    </>
  );
}
