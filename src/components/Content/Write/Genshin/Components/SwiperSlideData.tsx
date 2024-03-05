import { Input, VariantClass } from "@/components/general/Input";
import React, { useEffect, useState } from "react";

interface SwiperDataSlide {
  passData: any;
  keyValue: keyof GenshinImpact.UpgradeMaterial;
  template: "Write" | "Edit" | "Detail";
  category: General.Game["category"]
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

function isApiResponseWeapon(data: any): data is GenshinImpact.ApiResponseWeapon {
  return "costs" in data;
}

function isApiResponseCharacter(data: any): data is GenshinImpact.ApiResponseCharacter {
  return "costs" in data;
}

function isWeapon(data: any): data is GenshinImpact.Weapon {
  return data;
}

function isCharacter(data: any): data is GenshinImpact.Character {
  return data;
}

export default function SwiperSlideData({ passData, keyValue, template,category }: SwiperDataSlide) {
  if (template === "Write") return <WriteContent category={category} passData={passData} keyValue={keyValue} />;
  else if (template === "Edit") return <EditContent category={category} passData={passData} keyValue={keyValue} />;
  else if (template === "Detail") return <DetailContent category={category} passData={passData} keyValue={keyValue} />;
}

/**
 *
 * EDIT CONTENT
 *
 */

function EditContent({ passData, keyValue, category }: Omit<SwiperDataSlide, "template">) {
  if (isWeapon(passData) && category === "Weapon") return <WeaponData passData={passData} keyValue={keyValue} />;
  if (isCharacter(passData && category === "Character")) return <CharacterData passData={passData} keyValue={keyValue} />;
}

const WeaponData = ({ passData, keyValue }: Omit<SwiperDataSlide, "template" | "category">) => {
  const [data, setData] = useState<GenshinImpact.Weapon>({} as GenshinImpact.Weapon);

  useEffect(() => {
    if (isWeapon(passData)) {
      setData(passData);
    }
  }, [data, passData]);

  if (!data || Object.keys(data).length === 0) return <></>;
  return (
    <>
      <h2 className="text-white font-semibold font-poppins">{keyValueTitle[keyValue]}</h2>
      <div className="grid grid-cols-2 gap-4">
        {data[keyValue as "ascend1"].map((ascend, i: number) => (
          <React.Fragment key={`${keyValueMap[keyValue]}-material-${i + 1}`}>
            <Input forId={`${keyValueMap[keyValue]}-material-${i + 1}`} name={`${keyValueMap[keyValue]}-material-${i + 1}`} labelMarginY="0" label="Material" defaultValue={ascend.name} variant={VariantClass.dashboard} />
            <Input forId={`${keyValueMap[keyValue]}-count-${i + 1}`} name={`${keyValueMap[keyValue]}-count-${i + 1}`} labelMarginY="0" label="Count" defaultValue={ascend.count} type="number" variant={VariantClass.dashboard} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

const CharacterData = ({ passData, keyValue }: Omit<SwiperDataSlide, "template" | "category">) => {
  const [data, setData] = useState<GenshinImpact.Character["ascendMaterial"]>({} as GenshinImpact.Character["ascendMaterial"]);

  useEffect(() => {
    if (isCharacter(passData)) {
      setData(passData.ascendMaterial);
    }
  }, [data, passData]);

  if (!data || Object.keys(data).length === 0) return <></>;
  return (
    <>
      <h2 className="text-white font-semibold font-poppins">{keyValueTitle[keyValue]}</h2>
      <div className="grid grid-cols-2 gap-4">
        {data[keyValue as "ascend1"].map((ascend, i: number) => (
          <React.Fragment key={`${keyValueMap[keyValue]}-material-${i + 1}`}>
            <Input forId={`${keyValueMap[keyValue]}-material-${i + 1}`} name={`${keyValueMap[keyValue]}-material-${i + 1}`} labelMarginY="0" label="Material" defaultValue={ascend.name} variant={VariantClass.dashboard} />
            <Input forId={`${keyValueMap[keyValue]}-count-${i + 1}`} name={`${keyValueMap[keyValue]}-count-${i + 1}`} labelMarginY="0" label="Count" defaultValue={ascend.count} type="number" variant={VariantClass.dashboard} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

/**
 *
 * DETAIL CONTENT
 *
 *  */

function DetailContent({ passData, keyValue, category }: Omit<SwiperDataSlide, "template">) {
  if (isWeapon(passData) && category === "Weapon") return <WeaponDetail passData={passData} keyValue={keyValue} />;
  else if (isCharacter(passData) && category === "Character") return <CharacterDetail passData={passData} keyValue={keyValue} />;
}

const WeaponDetail = ({ passData, keyValue }: Omit<SwiperDataSlide, "template" | "category">) => {
  const [data, setData] = useState<GenshinImpact.Weapon>({} as GenshinImpact.Weapon);

  useEffect(() => {
    if (isWeapon(passData)) {
      setData(passData);
    }
  }, [data, passData]);

  if (!data || Object.keys(data).length === 0) return <></>;
  return (
    <>
      <h2 className="text-white font-semibold font-poppins">{keyValueTitle[keyValue]}</h2>
      <div className="grid grid-cols-2 gap-4">
        {data[keyValue as "ascend1"].map((ascend, i: number) => (
          <React.Fragment key={`${keyValueMap[keyValue]}-material-${i + 1}`}>
            <p className="font-poppins text-white">
              <strong className="font-bold">Name : </strong>
              {ascend.name}
            </p>
            <p className="font-poppins text-white">
              <strong className="font-bold">Count : </strong>
              {ascend.count}
            </p>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

const CharacterDetail = ({ passData, keyValue }: Omit<SwiperDataSlide, "template" | "category">) => {
  const [data, setData] = useState<GenshinImpact.Character["ascendMaterial"]>({} as GenshinImpact.Character["ascendMaterial"]);

  useEffect(() => {
    if (isCharacter(passData)) {
      setData(passData.ascendMaterial);
    }
  }, [data, passData]);

  if (!data || Object.keys(data).length === 0) return <></>;
  return (
    <>
      <h2 className="text-white font-semibold font-poppins">{keyValueTitle[keyValue]}</h2>
      <div className="grid grid-cols-2 gap-4">
        {data[keyValue as "ascend1"].map((ascend, i: number) => (
          <React.Fragment key={`${keyValueMap[keyValue]}-material-${i + 1}`}>
            <p className="font-poppins text-white">
              <strong className="font-bold">Name : </strong>
              {ascend.name}
            </p>
            <p className="font-poppins text-white">
              <strong className="font-bold">Count : </strong>
              {ascend.count}
            </p>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

/**
 *
 * WRITE CONTENT
 *
 */

function WriteContent({ passData, keyValue, category }: Omit<SwiperDataSlide, "template">) {
  if (isApiResponseWeapon(passData) && category === "Weapon") return <ApiResponseWeaponData passData={passData} keyValue={keyValue} />;
  else if (isApiResponseCharacter(passData) && category === "Character") return <ApiResponseCharData passData={passData} keyValue={keyValue} />;
}

const ApiResponseCharData = ({ passData, keyValue }: { passData: GenshinImpact.ApiResponseCharacter; keyValue: keyof GenshinImpact.UpgradeMaterial }) => {
  const data = passData.costs[keyValue];

  return (
    <>
      <h2 className="text-white font-semibold font-poppins">{keyValueTitle[keyValue]}</h2>
      <div className="grid grid-cols-2 gap-4">
        {data.map((d, i: number) => (
          <React.Fragment key={`${keyValueMap[keyValue]}-material-${i + 1}`}>
            <Input forId={`${keyValueMap[keyValue]}-material-${i + 1}`} name={`${keyValueMap[keyValue]}-material-${i + 1}`} labelMarginY="0" label="Material" defaultValue={d.name} variant={VariantClass.dashboard} />
            <Input forId={`${keyValueMap[keyValue]}-count-${i + 1}`} name={`${keyValueMap[keyValue]}-count-${i + 1}`} labelMarginY="0" label="Count" defaultValue={d.count} type="number" variant={VariantClass.dashboard} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

const ApiResponseWeaponData = ({ passData, keyValue }: { passData: GenshinImpact.ApiResponseWeapon; keyValue: keyof GenshinImpact.UpgradeMaterial }) => {
  const data = passData.costs[keyValue];

  return (
    <>
      <h2 className="text-white font-semibold font-poppins">{keyValueTitle[keyValue]}</h2>
      <div className="grid grid-cols-2 gap-4">
        {data.map((d, i: number) => (
          <React.Fragment key={`${keyValueMap[keyValue]}-material-${i + 1}`}>
            <Input forId={`${keyValueMap[keyValue]}-material-${i + 1}`} name={`${keyValueMap[keyValue]}-material-${i + 1}`} labelMarginY="0" label="Material" defaultValue={d.name} variant={VariantClass.dashboard} />
            <Input forId={`${keyValueMap[keyValue]}-count-${i + 1}`} name={`${keyValueMap[keyValue]}-count-${i + 1}`} labelMarginY="0" label="Count" defaultValue={d.count} type="number" variant={VariantClass.dashboard} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
