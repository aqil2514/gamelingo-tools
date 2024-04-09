import { Input, VariantClass } from "@/components/general/Input";
import Textarea, { TextareaStyle } from "@/components/Input/Textarea";
import React from "react";
import { CombatStatus, tableMappingConfig, useTableConfig } from "./config";
import Image from "next/image";
import DisplayImage from "@/components/DataDisplay/Image";

interface PreviewLinksState {
  linkcombat1: string;
  linkcombat2: string;
  linkcombat3: string;
  linkcombatsp: string;
}

interface TableMappingProps {
  data?: GenshinImpact.ApiResponseTalent;
  setData?: React.Dispatch<React.SetStateAction<GenshinImpact.ApiResponseTalent>>;
  edit?: GenshinImpact.Talent;
  index: "combat1" | "combat2" | "combat3" | "combatsp";
  template: "Write" | "Edit" | "Detail";
}

// TODO: Add some typeguard and fix this

export default function TableMapping({ data, setData, index, edit, template }: TableMappingProps) {
  if (template === "Write") return <WriteTableMapping data={data} setData={setData} index={index} />;
  if (template === "Edit") return <EditTableMapping edit={edit} index={index} />;
  if (template === "Detail") return <DetailTableMapping edit={edit} index={index} />;
}

function WriteTableMapping({ data, setData, index }: Omit<TableMappingProps, "template">) {
  if (!data || !setData) throw new Error("Terjadi kesalahan: Data dan Setdata tidak boleh kosong");
  const [previewLinks, setPreviewLinks] = React.useState<PreviewLinksState>({} as PreviewLinksState);
  const label = React.useMemo(() => {
    const labels = data[index]?.attributes?.labels;
    const mapLabels = labels?.map((label) => label.split("|"));

    return mapLabels;
  }, [data, index]);

  // const config = useTableConfig(label);

  const title = {
    combat1: "Combat 1 (Normal Attack)",
    combat2: "Combat 2 (Elemental Skill)",
    combat3: "Combat 3 (Elemental Burst)",
    combatsp: "Sprint",
  };

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

  const attribute = data[index]?.attributes
  const imageLink = previewLinks[`link${index}` as keyof PreviewLinksState];

  return (
    <>
      <h2 className="text-white font-semibold font-poppins">{title[index]}</h2>

      <div className="grid grid-cols-[200px_auto] gap-4 my-4">
        <label
          htmlFor={`talent-${index}-icon`}
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

          <input type="file" name={`talent-${index}-icon`} data-previewLink={`link${index}`} id={`talent-${index}-icon`} className="hidden" onChange={changeHandler} />
        </label>

        <Input
          forId={`talent-${index}-name`}
          label="Talent Name"
          name={`${index}-name`}
          variant={VariantClass.dashboard}
          onChange={(e) =>
            setData({
              ...data,
              [index]: { ...data[index], name: e.target.value },
            })
          }
          value={data[index]?.name}
        />
      </div>

      <Textarea
        forId={`talent-${index}-info`}
        label="Talent Info"
        className={TextareaStyle.variant_1}
        onChange={(e) =>
          setData({
            ...data,
            [index]: { ...data[index], description: e.target.value },
          })
        }
        value={data[index]?.description}
        name={`${index}-description`}
      />

      {attribute?.labels.map((v, i) => (
        <input type="hidden" name={`${index}-attribute-label-${i + 1}`} id={`${index}-attribute-label-${i + 1}`} key={`${index}-attribute-label-${i + 1}`} value={v} />
      ))}

      {Object.keys(attribute!.parameters).map((v, i) => (
        <input type="hidden" name={`${index}-attribute-param-${i + 1}`} id={`${index}-attribute-param-${i + 1}`} value={attribute?.parameters[v].join(", ")} key={i + 1} />
      ))}
      {/* {label && label?.length !== 0 && <CombatMapping talent={talent} config={config} index={index} />} */}
    </>
  );
}

function EditTableMapping({ edit, index }: Omit<TableMappingProps, "template">) {
  if (!edit) throw new Error("Data sebelumnya belum ditentukan");
  const [previewLinks, setPreviewLinks] = React.useState<PreviewLinksState>({} as PreviewLinksState);
  const combats = edit.combats;

  // const config = useTableConfig(label);

  const title = {
    combat1: "Combat 1 (Normal Attack)",
    combat2: "Combat 2 (Elemental Skill)",
    combat3: "Combat 3 (Elemental Burst)",
    combatsp: "Sprint",
  };

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
          {/* TODO: BIKIN KOMPONEN KHUSUS UNTUK EDIT GAMBAR */}
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

        <Input forId={`talent-${index}-name`} label="Talent Name" name={`${index}-name`} variant={VariantClass.dashboard} defaultValue={combats[index]?.name} />
      </div>

      <Textarea forId={`talent-${index}-info`} label="Talent Info" className={TextareaStyle.variant_1} defaultValue={combats[index]?.description} name={`${index}-description`} />

      <p className="font-bold text-white my-4">Tabel Scalling damage masih belum sepenuhnya selesai</p>
      {/* {label && label?.length !== 0 && <CombatMapping talent={talent} config={config} index={index} />} */}
    </>
  );
}

function DetailTableMapping({ edit, index }: Omit<TableMappingProps, "template">) {
  if (!edit) throw new Error("Data sebelumnya belum ditentukan");
  const combats = edit.combats;

  // const config = useTableConfig(label);

  const title = {
    combat1: "Combat 1 (Normal Attack)",
    combat2: "Combat 2 (Elemental Skill)",
    combat3: "Combat 3 (Elemental Burst)",
    combatsp: "Sprint",
  };

  return (
    <>
      <h2 className="text-white font-semibold font-poppins">{title[index]}</h2>

      <DisplayImage template="variant1" src={combats[index]!.icon} alt={combats[index]!.name} />

      <p className="font-poppins text-white">
        <strong className="font-bold">Talent Name : </strong>
        {combats[index]!.name}
      </p>

      <p className="font-poppins text-white">
        <strong className="font-bold">Talent Description : </strong>
        {combats[index]!.description}
      </p>

      <p className="font-bold text-white my-4">Tabel Scalling damage masih belum sepenuhnya selesai</p>
      {/* {label && label?.length !== 0 && <CombatMapping talent={talent} config={config} index={index} />} */}
    </>
  );
}

// function CombatMapping({ talent, config, index }: { talent: GenshinImpact.ApiResponseTalent; config: CombatStatus[]; index: "combat1" | "combat2" | "combat3" | "combatsp" }) {
//   return (
//     <div className={`h-64 rounded px-4 overflow-scroll scrollbar-style`}>
//       <table>
//         <thead>
//           <tr className="text-white font-bold font-poppins p-4 text-center">
//             <td className="bg-slate-700 hover:bg-slate-600 hover:cursor-pointer border border-slate-800">Nama Skill</td>
//             {talent[index]?.attributes?.parameters?.param1.map((value, i) => (
//               <td key={value} className="bg-slate-700 hover:bg-slate-600 hover:cursor-pointer border border-slate-800">
//                 {index === "combatsp" ? "Info" : `Level ${index}`}
//               </td>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="max-w-[200px] text-center">
//           {config?.map((stat) => {
//             const param = talent[index]?.attributes?.parameters[stat.paramName[0]];

//             return (
//               <tr key={stat.statsName}>
//                 <td className="bg-slate-700 hover:bg-slate-600 hover:cursor-pointer border border-slate-800">
//                   <p className="text-white font-bold font-poppins p-4">{stat.statsName}</p>
//                 </td>
//                 {/* <NumCombatMap number={param} status={stat} talent={talent} index={index} /> */}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function NumCombatMap({ number, status, talent, index }: { number: number[]; status: CombatStatus; talent: GenshinImpact.ApiResponseTalent; index: "combat1" | "combat2" | "combat3" | "combatsp" }) {
//   return (
//     <>
//       {number?.map((num: number, i: number) => {
//         const { basicStatus, isAdditional, isAnyParam, isSuffix, suffix } = tableMappingConfig({
//           status,
//           num,
//           talent,
//           i,
//         });

//         // SOON : FIX BAGIAN SEPERTI KASUS XIANYUN
//         return (
//           <td key={num} className="bg-slate-700 hover:bg-slate-600 hover:cursor-pointer border border-slate-800">
//             <p className="text-white font-bold font-poppins p-4 ">
//               {`${basicStatus} ${isSuffix ? suffix[0] : ""}`}
//               {isAdditional ? <SecondMapping status={status} talent={talent} combat={index} i={i} /> : ""}
//             </p>
//           </td>
//         );
//       })}
//     </>
//   );
// }

// function SecondMapping({ status, talent, combat, i }: { status: CombatStatus; talent: GenshinImpact.ApiResponseTalent; combat: "combat1" | "combat2" | "combat3" | "combatsp"; i: number }) {
//   const params = talent[combat]?.attributes.parameters[status.paramName[1]];
//   return <>{`${status.additionalRule} ${(params[i] * 100).toFixed(2)}% ${status.suffix[1] ? status.suffix[1] : ""}`}</>;
// }
