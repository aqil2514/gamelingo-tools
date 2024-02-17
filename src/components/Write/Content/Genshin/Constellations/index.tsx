import React from "react";
import { submitFormHandler } from "../genshinUtils";
import { Input, VariantClass } from "@/components/general/Input";
import Button, { VariantClass as ButtonStyle } from "@/components/general/Button";
import { FetchApi } from "../genshinComponents";
import Textarea, { TextareaStyle } from "@/components/general/Textarea";

export default function ConstellationsForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [constellation, setConstellation] = React.useState<GenshinImpact.ApiResponseConstellations>({} as GenshinImpact.ApiResponseConstellations);
  const uniqueId = React.useId();

  const dataExist = constellation.c1;
  return (
    <form onSubmit={(e) => submitFormHandler(e, "/api/post", setIsLoading, "Genshin Impact", "Constellations", "constellation-submit-button")} className="my-4">
      <FetchApi elementId="charName" msgNoInput="Karakter belum ditambah" msgNoData="Data karakter tidak ada" refElement="charName" query="constellations" setData={setConstellation} />

      <Input forId="charName" name="charName" value={constellation.name} onChange={(e) => setConstellation({ ...constellation, name: e.target.value })} label="Character Name" variant={VariantClass.dashboard} />

      {dataExist ? (
        Object.keys(constellation)
          .filter((key) => key.startsWith("c"))
          .map((el, i: number) => {
            const obj = constellation[el as keyof GenshinImpact.ApiResponseConstellations] as GenshinImpact.ApiResponseBasicInfo;
            return (
              <React.Fragment key={`el-${uniqueId}`}>
                <Input
                  forId={`c${i + 1}`}
                  name={`c${i + 1}`}
                  label={`Constellation ${i + 1}`}
                  variant={VariantClass.dashboard}
                  value={obj.name}
                  onChange={(e) => setConstellation({ ...constellation, [el]: { ...obj, name: e.target.value } })}
                />
                <Textarea
                  forId={`d${i + 1}`}
                  name={`d${i + 1}`}
                  label="Description"
                  className={TextareaStyle.variant_1}
                  value={obj.description}
                  onChange={(e) => setConstellation({ ...constellation, [el]: { ...obj, description: e.target.value } })}
                />
              </React.Fragment>
            );
          })
      ) : (
        <p className="font-bold text-white text-center underline">No Data Selected</p>
      )}

      <Button className={ButtonStyle.submit} id="constellation-submit-button">
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
