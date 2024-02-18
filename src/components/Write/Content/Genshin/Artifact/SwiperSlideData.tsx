import { Input, VariantClass } from "@/components/general/Input";
import Textarea, { TextareaStyle } from "@/components/general/Textarea";
import React from "react";

interface SwiperSlideProps {
  data: GenshinImpact.ApiResponseArtifacts;
  setData: React.Dispatch<React.SetStateAction<GenshinImpact.ApiResponseArtifacts>>;
  keyValue: "flower" | "circlet" | "goblet" | "plume" | "sands";
}

export default function SwiperSlideData({ data, setData, keyValue }: SwiperSlideProps) {
  return (
    <>
      <h2 className="text-white font-semibold font-poppins capitalize">{keyValue}</h2>
      <Input forId={`${keyValue}-name`} label="Name" name={`${keyValue}-name`} variant={VariantClass.dashboard} value={data[keyValue].name} onChange={(e) => setData({ ...data, [keyValue]: { ...data[keyValue], name: e.target.value } })} />

      <Input
        forId={`${keyValue}-type`}
        label="Type"
        name={`${keyValue}-type`}
        variant={VariantClass.dashboard}
        value={data[keyValue].relicText}
        onChange={(e) => setData({ ...data, [keyValue]: { ...data[keyValue], relicText: e.target.value } })}
      />

      <Textarea
        forId={`${keyValue}-description`}
        label="Description"
        name={`${keyValue}-description`}
        className={TextareaStyle.variant_1}
        value={data[keyValue].description}
        onChange={(e) => setData({ ...data, [keyValue]: { ...data[keyValue], description: e.target.value } })}
      />

      <Textarea
        forId={`${keyValue}-lore`}
        label="Lore"
        name={`${keyValue}-lore`}
        className={TextareaStyle.variant_1}
        value={data[keyValue].story}
        onChange={(e) => setData({ ...data, [keyValue]: { ...data[keyValue], story: e.target.value } })}
      />

      {/* Gambar di sini */}
    </>
  );
}
