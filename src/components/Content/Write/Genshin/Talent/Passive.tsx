import { Input, VariantClass } from "@/components/general/Input";
import Textarea, { TextareaStyle } from "@/components/general/Textarea";
import Image from "next/image";
import React from "react";

interface PassiveTalentProps {
  talent: GenshinImpact.ApiResponseTalent;
  setTalent: React.Dispatch<React.SetStateAction<GenshinImpact.ApiResponseTalent>>;
  index: "passive1" | "passive2" | "passive3";
}

interface PreviewLinksState {
  linkpassive1: string;
  linkpassive2: string;
  linkpassive3: string;
}

const title = {
  passive1: "Passive 1",
  passive2: "Passive 2",
  passive3: "Passive 3",
};

export default function PassiveTalent({ talent, setTalent, index }: PassiveTalentProps) {
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

  return (
    <>
      <h2 className="text-white font-semibold font-poppins">{title[index]}</h2>

      <div className="grid grid-cols-[200px_auto] gap-4 my-4">
        <label
          htmlFor={`talent-${index}-icon`}
          className="relative m-auto border border-dashed group border-white rounded-md w-full h-full flex justify-center items-center transition duration-200 cursor-pointer hover:border-zinc-500 overflow-hidden"
        >
          {previewLinks[`link${index}` as keyof PreviewLinksState] ? (
            <>
              <span className="font-bold text-red-600 top-2 group: right-2 cursor-pointer z-20 absolute" onClick={deleteHandler} data-previewLink={`link${index}`}>
                X
              </span>
              <Image src={previewLinks[`link${index}` as keyof PreviewLinksState]} fill sizes="auto" alt={`${index}-icon`} className="w-auto group-hover:scale-125 transition duration-500" />
            </>
          ) : (
            <span className="transition duration-200 group-hover:text-zinc-500 text-white font-bold"> No Image</span>
          )}

          <input type="file" name={`talent-${index}-icon`} data-previewLink={`link${index}`} id={`talent-${index}-icon`} className="hidden" onChange={changeHandler} />
        </label>

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
      </div>

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
