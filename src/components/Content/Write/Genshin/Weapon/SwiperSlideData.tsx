import { Input, VariantClass } from "@/components/general/Input";
import React from "react";

interface SwiperDataSlide {
  weapon: GenshinImpact.ApiResponseWeapon;
  keyValue: keyof GenshinImpact.ApiResponseWeapon["costs"];
}

const keyValueMap: Record<
  keyof GenshinImpact.ApiResponseWeapon["costs"],
  string
> = {
  ascend1: "ascend-1",
  ascend2: "ascend-2",
  ascend3: "ascend-3",
  ascend4: "ascend-4",
  ascend5: "ascend-5",
  ascend6: "ascend-6",
};

const keyValueTitle: Record<
  keyof GenshinImpact.ApiResponseWeapon["costs"],
  string
> = {
  ascend1: "Ascend 1",
  ascend2: "Ascend 2",
  ascend3: "Ascend 3",
  ascend4: "Ascend 4",
  ascend5: "Ascend 5",
  ascend6: "Ascend 6",
};

export default function SwiperSlideData({ weapon, keyValue }: SwiperDataSlide) {
  const arrayData = weapon?.costs[keyValue];

  return (
    <>
      <h2 className="text-white font-semibold font-poppins">
        {keyValueTitle[keyValue]}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {arrayData.map((data, i: number) => (
          <React.Fragment key={`${keyValueMap[keyValue]}-material-${i + 1}`}>
            <Input
              forId={`${keyValueMap[keyValue]}-material-${i + 1}`}
              name={`${keyValueMap[keyValue]}-material-${i + 1}`}
              labelMarginY="0"
              label="Material"
              defaultValue={data.name}
              variant={VariantClass.dashboard}
            />
            <Input
              forId={`${keyValueMap[keyValue]}-count-${i + 1}`}
              name={`${keyValueMap[keyValue]}-count-${i + 1}`}
              labelMarginY="0"
              label="Count"
              defaultValue={data.count}
              type="number"
              variant={VariantClass.dashboard}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
