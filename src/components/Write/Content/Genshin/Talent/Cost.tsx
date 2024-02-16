import { Input, VariantClass } from "@/components/general/Input";
import React from "react";

interface UpgradeCostProps {
  talent: GenshinImpact.ApiResponseTalent;
  setTalent: React.Dispatch<React.SetStateAction<GenshinImpact.ApiResponseTalent>>;
  keyValue: keyof GenshinImpact.ApiResponseTalent["costs"];
}

const title: Record<keyof GenshinImpact.ApiResponseTalent["costs"], string> = {
  lvl2: "Level 2",
  lvl3: "Level 3",
  lvl4: "Level 4",
  lvl5: "Level 5",
  lvl6: "Level 6",
  lvl7: "Level 7",
  lvl8: "Level 8",
  lvl9: "Level 9",
  lvl10: "Level 10",
};

export default function UpgradeCost({ talent, keyValue }: UpgradeCostProps) {
  return (
    <>
      <h1 className="font-semibold font-poppins text-white">{title[keyValue]}</h1>
      <div className="grid grid-cols-2 gap-4">
        {talent.costs[keyValue].map((cost, i: number) => (
          <React.Fragment key={`${keyValue}-material-cost-${i + 1}`}>
            <Input forId={`${keyValue}-material-${i + 1}`} name={`${keyValue}-material-${i + 1}`} labelMarginY="0" label="Material" defaultValue={cost.name} variant={VariantClass.dashboard} />
            <Input forId={`${keyValue}-count-${i + 1}`} name={`${keyValue}-count-${i + 1}`} labelMarginY="0" label="Count" defaultValue={cost.count} type="number" variant={VariantClass.dashboard} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
