import DisplayImage from "@/components/DataDisplay/Image";
import ImageInput from "@/components/general/ImageInput";
import { Input, VariantClass } from "@/components/general/Input";
import Textarea, { TextareaStyle } from "@/components/Input/Textarea";
import Image from "next/image";
import React from "react";

interface PassiveTalentProps {
  talent?: GenshinImpact.ApiResponseTalent;
  setTalent?: React.Dispatch<React.SetStateAction<GenshinImpact.ApiResponseTalent>>;
  edit?: GenshinImpact.Talent;
  index: "passive1" | "passive2" | "passive3";
  template: "Write" | "Edit" | "Detail";
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

export default function PassiveTalent({ talent, setTalent, index, template, edit }: PassiveTalentProps) {
  if (template === "Write") return <WritePassiveTalent talent={talent} setTalent={setTalent} index={index} />;
  else if (template === "Edit") return <EditPassiveTalent edit={edit} index={index} />;
  else if (template === "Detail") return <DetailPassiveTalent edit={edit} index={index} />;
}

function WritePassiveTalent({ talent, setTalent, index }: Omit<PassiveTalentProps, "template">) {
  if (!talent || !setTalent) throw new Error("Talent dan Set Talent belum ditentukan");
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
      e.stopPropagation()
      setPreviewLinks({ ...previewLinks, [previewLink]: "" });
    }
  }

  const imageLink = previewLinks[`link${index}` as keyof PreviewLinksState];

  return (
    <>
      <h2 className="text-white font-semibold font-poppins">{title[index]}</h2>

      <div className="grid grid-cols-[200px_auto] gap-4 my-4">
        <label
          htmlFor={`passive-${index}-icon`}
          className={`relative m-auto ${!imageLink ? "border border-dashed group border-white rounded-md" : ""} w-full h-full flex justify-center items-center transition duration-200 cursor-pointer hover:border-zinc-500 overflow-hidden`}
        >
          {imageLink ? (
            <>
              <span className="font-bold text-red-600 top-2 group: right-2 cursor-pointer z-20 absolute" onClick={deleteHandler} data-previewLink={`link${index}`}>
                X
              </span>
              <Image src={imageLink} fill sizes="auto" alt={`${index}-icon`} className="w-auto group-hover:scale-125 transition duration-500" />
            </>
          ) : (
            <span className="transition duration-200 group-hover:text-zinc-500 text-white font-bold"> No Image</span>
          )}

          <input type="file" name={`passive-${index}-icon`} data-previewLink={`link${index}`} id={`passive-${index}-icon`} className="hidden" onChange={changeHandler} />
        </label>

        <Input
          forId={`passive-${index}-name`}
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
        forId={`passive-${index}-description`}
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

function EditPassiveTalent({ edit, index }: Omit<PassiveTalentProps, "template">) {
  if (!edit) throw new Error("data sebelumnya belum ditentukan");
  const passives = edit.passives;

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

  const imageUrl = edit.passives[index].icon;
  const talentName = edit.passives[index].name

  return (
    <>
      <h2 className="text-white font-semibold font-poppins">{title[index]}</h2>

      <div className="gap-4 my-4">

        <ImageInput template="Character" id={`passive-${index}-icon`} dataImage={imageUrl} imageName={edit.charName+ " Talent Icon"} />
<br />
        <Input forId={`passive-${index}-name`} label="Talent Name" name={`${index}-name`} variant={VariantClass.dashboard} defaultValue={talentName} />
      </div>

      <Textarea forId={`passive-${index}-description`} label="Passive Description" name={`${index}-description`} className={TextareaStyle.variant_1} defaultValue={passives[index]?.description} />
    </>
  );
}

function DetailPassiveTalent({ edit, index }: Omit<PassiveTalentProps, "template">) {
  if (!edit) throw new Error("data sebelumnya belum ditentukan");
  const passives = edit.passives;

  return (
    <>
      <h2 className="text-white font-semibold font-poppins">{title[index]}</h2>

      <DisplayImage template="variant1" src={passives[index]!.icon} alt={passives[index]!.name} />

      <p className="font-poppins text-white">
        <strong className="font-bold">Talent Name : </strong>
        {passives[index]!.name}
      </p>

      <p className="font-poppins text-white">
        <strong className="font-bold">Talent Description : </strong>
        {passives[index]!.description}
      </p>

      <p className="font-bold text-white my-4">Tabel Scalling damage masih belum sepenuhnya selesai</p>
      {/* {label && label?.length !== 0 && <CombatMapping talent={talent} config={config} index={index} />} */}
    </>
  );
}
