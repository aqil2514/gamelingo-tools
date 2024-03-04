import { Input, VariantClass } from "@/components/general/Input";
import React, { useEffect, useState } from "react";

interface SwiperDataSlide {
  weapon: GenshinImpact.ApiResponseWeapon | GenshinImpact.Weapon;
  keyValue: keyof GenshinImpact.UpgradeMaterial;
  template: "Write" | "Edit";
}

const keyValueMap: Record<keyof GenshinImpact.UpgradeMaterial, string> = {
  ascend1: "ascend-1",
  ascend2: "ascend-2",
  ascend3: "ascend-3",
  ascend4: "ascend-4",
  ascend5: "ascend-5",
  ascend6: "ascend-6",
};

const keyValueTitle: Record<keyof GenshinImpact.UpgradeMaterial, string> = {
  ascend1: "Ascend 1",
  ascend2: "Ascend 2",
  ascend3: "Ascend 3",
  ascend4: "Ascend 4",
  ascend5: "Ascend 5",
  ascend6: "Ascend 6",
};

function isApiResponseWeapon(weapon: any): weapon is GenshinImpact.ApiResponseWeapon {
  return "costs" in weapon;
}

function isWeapon(weapon: any): weapon is GenshinImpact.Weapon {
  return weapon;
}

export default function SwiperSlideData({ weapon, keyValue, template }: SwiperDataSlide) {
  if (template === "Write") return <WriteContent weapon={weapon} keyValue={keyValue} />;
  else if (template === "Edit") return <EditContent weapon={weapon} keyValue={keyValue} />;
}

function WriteContent({ weapon, keyValue }: Omit<SwiperDataSlide, "template">) {
  let arrayData: any[] = [];
  if (isApiResponseWeapon(weapon)) {
    arrayData = weapon.costs[keyValue];
  }

  return (
    <>
      <h2 className="text-white font-semibold font-poppins">{keyValueTitle[keyValue]}</h2>
      <div className="grid grid-cols-2 gap-4">
        {arrayData.map((data, i: number) => (
          <React.Fragment key={`${keyValueMap[keyValue]}-material-${i + 1}`}>
            <Input forId={`${keyValueMap[keyValue]}-material-${i + 1}`} name={`${keyValueMap[keyValue]}-material-${i + 1}`} labelMarginY="0" label="Material" defaultValue={data.name} variant={VariantClass.dashboard} />
            <Input forId={`${keyValueMap[keyValue]}-count-${i + 1}`} name={`${keyValueMap[keyValue]}-count-${i + 1}`} labelMarginY="0" label="Count" defaultValue={data.count} type="number" variant={VariantClass.dashboard} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

function EditContent({ weapon, keyValue }: Omit<SwiperDataSlide, "template">) {
  const [data, setData] = useState<GenshinImpact.Weapon>({} as GenshinImpact.Weapon);

  useEffect(() => {
    if (isWeapon(weapon)) {
      setData(weapon);
    }

  }, [weapon])

if(!data || Object.keys(data).length===0) return <></>

  return (
    <>
      <h2 className="text-white font-semibold font-poppins">{keyValueTitle[keyValue]}</h2>
      <div className="grid grid-cols-2 gap-4">
        {data[keyValue as "ascend1"].map((ascend,i:number) => (
          <React.Fragment key={`${keyValueMap[keyValue]}-material-${i + 1}`}>
          <Input forId={`${keyValueMap[keyValue]}-material-${i + 1}`} name={`${keyValueMap[keyValue]}-material-${i + 1}`} labelMarginY="0" label="Material" defaultValue={ascend.name} variant={VariantClass.dashboard} />
          <Input forId={`${keyValueMap[keyValue]}-count-${i + 1}`} name={`${keyValueMap[keyValue]}-count-${i + 1}`} labelMarginY="0" label="Count" defaultValue={ascend.count} type="number" variant={VariantClass.dashboard} />
        </React.Fragment>
        ))}
        {/* {key.map((d) => {
          const value = data[d as "ascend1"];
          console.log(value)

          return value.map((val, i: number) => (
            <React.Fragment key={`${keyValueMap[keyValue]}-material-${i + 1}`}>
              <Input forId={`${keyValueMap[keyValue]}-material-${i + 1}`} name={`${keyValueMap[keyValue]}-material-${i + 1}`} labelMarginY="0" label="Material" defaultValue={val.name} variant={VariantClass.dashboard} />
              <Input forId={`${keyValueMap[keyValue]}-count-${i + 1}`} name={`${keyValueMap[keyValue]}-count-${i + 1}`} labelMarginY="0" label="Count" defaultValue={val.count} type="number" variant={VariantClass.dashboard} />
            </React.Fragment>
          ));
        })} */}
      </div>
    </>
  );
}
