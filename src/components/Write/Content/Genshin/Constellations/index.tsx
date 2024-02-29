import React from "react";
import { submitFormHandler } from "../genshinUtils";
import { Input, VariantClass } from "@/components/general/Input";
import Button, { VariantClass as ButtonStyle } from "@/components/general/Button";
import { FetchApi } from "../genshinComponents";
import Textarea, { TextareaStyle } from "@/components/general/Textarea";
import Image from "next/image";

interface PreviewLinksState {
  link1: string;
  link2: string;
  link3: string;
  link4: string;
  link5: string;
  link6: string;
}

export default function ConstellationsForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [constellation, setConstellation] = React.useState<GenshinImpact.ApiResponseConstellations>({} as GenshinImpact.ApiResponseConstellations);
  const [previewLinks, setPreviewLinks] = React.useState<PreviewLinksState>({} as PreviewLinksState);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    const previewLink = target.getAttribute("data-previewLink") as keyof PreviewLinksState;
    const files = target.files;

    if (!files || files?.length === 0 || !files[0]) return;

    const imageLink = URL.createObjectURL(files[0]);

    setPreviewLinks({ ...previewLinks, [previewLink]: imageLink });
  }

  function deleteHandler(e: React.MouseEvent<HTMLParagraphElement>) {
    const target = e.target as HTMLParagraphElement;
    const previewLink = target.getAttribute("data-previewLink") as keyof PreviewLinksState;
    const input = target.nextSibling?.nextSibling as HTMLInputElement;

    if (input.files?.length !== 0) {
      input.value = "";
      setPreviewLinks({ ...previewLinks, [previewLink]: "" });
    }
  }

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
              <div key={`el-${obj.name}`} className="my-4">
                <div className="grid grid-cols-[200px_auto] gap-4">
                  <label
                    htmlFor={`constellation-${i + 1}-icon`}
                    className="relative m-auto border border-dashed group border-white rounded-md w-full h-full flex justify-center items-center transition duration-200 cursor-pointer hover:border-zinc-500 overflow-hidden"
                  >
                    {previewLinks[`link${i + 1}` as keyof PreviewLinksState] ? (
                      <>
                        <span className="font-bold text-red-600 top-2 group: right-2 cursor-pointer z-20 absolute" onClick={deleteHandler} data-previewLink={`link${i + 1}`}>
                          X
                        </span>
                        <Image src={previewLinks[`link${i + 1}` as keyof PreviewLinksState]} fill sizes="auto" alt={`${obj.name}-icon`} className="w-auto group-hover:scale-125 transition duration-500" />
                      </>
                    ) : (
                      <span className="transition duration-200 group-hover:text-zinc-500 text-white font-bold"> No Image</span>
                    )}

                    <input type="file" name={`constellation-${i + 1}-icon`} data-previewLink={`link${i + 1}`} id={`constellation-${i + 1}-icon`} className="hidden" onChange={changeHandler} />
                  </label>

                  <Input
                    forId={`c${i + 1}`}
                    name={`c${i + 1}`}
                    label={`Constellation ${i + 1}`}
                    variant={VariantClass.dashboard}
                    value={obj.name}
                    onChange={(e) => setConstellation({ ...constellation, [el]: { ...obj, name: e.target.value } })}
                  />
                </div>

                <div className="my-4">
                  <Textarea
                    forId={`d${i + 1}`}
                    name={`d${i + 1}`}
                    label="Description"
                    className={TextareaStyle.variant_1}
                    value={obj.description}
                    onChange={(e) => setConstellation({ ...constellation, [el]: { ...obj, description: e.target.value } })}
                  />
                </div>
              </div>
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
