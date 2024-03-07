// <<<<< React Import >>>>>
import React, { useEffect, useState } from "react";

// <<<<< Next Import >>>>>
import Image from "next/image";

// <<<<< Local Utils Import >>>>>
import { SubmitConfig_GI, submitFormHandler } from "../genshinUtils";

// <<<<< Local Component Import >>>>>
import { FetchApi } from "../genshinComponents";

// <<<<< General Component Import >>>>>
import { Input, VariantClass } from "@/components/general/Input";
import Button, { VariantClass as ButtonStyle } from "@/components/Input/Button";
import Textarea, { TextareaStyle } from "@/components/general/Textarea";
import { PreviewLinksState, useConstellationsContext } from "@/components/Providers/Game/GenshinImpact/ConstellationsProvider";
import { useMenuContextData } from "@/components/Providers/Admin/ContextProvider";
import axios, { isAxiosError } from "axios";
import { Route } from "next";
import { getDate } from "@/components/Admin/ContextMenu/utils";
import { notif } from "@/utils/fe";
import Loading from "@/components/general/Loading";
import { EditContextButton } from "@/components/Admin/ContextMenu/EditMenu";

export default function GICharacterContentForm({ template }: { template: General.ContentTemplate }) {
  if (template === "Write") return <WriteContent />;
  else if (template === "Edit") return <EditContent />;
}

function WriteContent() {
  const { isLoading, setIsLoading, constellation, setConstellation, previewLinks, setPreviewLinks, moveLocation, setMoveLocation } = useConstellationsContext();

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

  const submitConfig: SubmitConfig_GI = {
    url: "/api/post",
    setIsLoading: setIsLoading,
    game: "Genshin Impact",
    category: "Constellations",
    ref: "constellation-button-submit",
    callbackUrl: "/admin/data?field=genshin-impact&subfield=Constellations&lang=English",
    moveLocation,
  };
  return (
    <form onSubmit={(e) => submitFormHandler(e, submitConfig)} className="my-4">
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

      <div className="flex gap-4" id="constellation-button-submit">
        <Button className={ButtonStyle.submit}>{isLoading ? "Submitting..." : "Submit"}</Button>
        <label htmlFor="move-location" className="text-white font-bold font-poppins my-auto">
          <input type="checkbox" id="move-location" className="mx-2" checked={moveLocation} onChange={() => setMoveLocation(!moveLocation)} />
          Lihat Data setelah selesai ditambah
        </label>
      </div>
    </form>
  );
}

function EditContent() {
  const [data, setData] = useState<GenshinImpact.Constellation>({} as GenshinImpact.Constellation);
  const [date, setDate] = useState<string>("");
  const { contextMenu, setIsLoading, setEditMenu, isLoading, searchParams } = useMenuContextData();
  const langParams = searchParams.get("lang");
  const lang = contextMenu.target?.getAttribute("data-lang");
  const id = contextMenu.target?.getAttribute("data-id");
  const [previewLinks, setPreviewLinks] = React.useState<PreviewLinksState>({} as PreviewLinksState);
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/gamelingo/genshin-impact?_id=${id}&category=Constellations&lang=${lang}`;
      axios(url).then((res) => setData(res.data.data));
    }

    if (Object.keys(data).length !== 0) {
      const { year, month, day, hour, minutes } = getDate(data.createdAt as string);

      setDate(`${year}-${month}-${day}T${hour}:${minutes}`);
    }
  }, [contextMenu, data, id, lang]);

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const _id = formData.get("id") as string;

    try {
      setIsLoading(true);
      const res = await axios.putForm("/api/gamelingo/genshin-impact" as Route, formData, {
        headers: {
          "Data-Category": "Material",
          "Old-Id": _id,
          "Content-Lang": langParams,
        },
      });

      notif(res.data.msg, {
        color: "green",
        refElement: "buttons",
        location: "before",
      });
      setTimeout(() => {
        setEditMenu(false);
        window.location.reload();
      }, 3000);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) {
          notif(error.response.data.msg, {
            color: "red",
            refElement: "buttons",
            location: "before",
          });
        }
        if (error.response?.status === 400) {
          notif(error.response.data.msg, {
            color: "red",
            refElement: "buttons",
            location: "before",
          });
        }
        if (error.response?.status === 401) {
          notif(error.response.data.msg, {
            color: "red",
            refElement: "buttons",
            location: "before",
          });
        }
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    const previewLink = target.getAttribute("data-previewLink");

    if (!previewLink) throw new Error("Data Preview link belum disematkan pada atribut html element");

    if (!target.files || (target.files && target.files.length === 0)) {
      target.value = "";
      setFileName("");
      setPreviewLinks({ ...previewLinks, [previewLink]: "" });

      return;
    }

    const image = target.files[0];
    const urlSrc = URL.createObjectURL(image);

    setFileName(image.name);
    setPreviewLinks({ ...previewLinks, [previewLink]: urlSrc });
  }

  const isDisabled = isLoading;
  return (
    <div className="w-1/2 max-h-[450px] overflow-y-scroll scrollbar-style absolute top-36 left-[35%] bg-zinc-700 rounded-xl border-2 border-white p-4">
      <h1 id="test" className="text-white text-center font-bold font-poppins">
        Edit Material
      </h1>
      {Object.keys(data).length === 0 ? (
        <Loading loading={1} textOn text="Mengambil data material..." />
      ) : (
        <form onSubmit={submitHandler} className="my-4">
          <Input forId="charName" name="charName" defaultValue={data.charName} label="Character Name" variant={VariantClass.dashboard} />

          {Object.keys(data.constellation)
            .filter((key) => key.startsWith("c"))
            .map((el, i: number) => {
              const obj = data.constellation[el as keyof GenshinImpact.Constellation["constellation"]];

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

                    <Input forId={`c${i + 1}`} name={`c${i + 1}`} label={`Constellation ${i + 1}`} variant={VariantClass.dashboard} defaultValue={obj.name} />
                  </div>

                  <div className="my-4">
                    <Textarea forId={`d${i + 1}`} name={`d${i + 1}`} label="Description" className={TextareaStyle.variant_1} defaultValue={obj.description} />
                  </div>
                </div>
              );
            })}

          <EditContextButton />
        </form>
      )}
    </div>
  );
}
