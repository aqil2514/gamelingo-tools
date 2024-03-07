import { Input, VariantClass } from "@/components/general/Input";
import { FetchApi } from "../genshinComponents";
import { SubmitConfig_GI, submitFormHandler } from "../genshinUtils";
import Button, { VariantClass as ButtonStyle } from "@/components/Input/Button";
import Image from "next/image";
import Textarea, { TextareaStyle } from "@/components/general/Textarea";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperDataSlide from "../Components/SwiperSlideData";
import { Pagination } from "swiper/modules";
import { useWeaponContext } from "@/components/Providers/Game/GenshinImpact/WeaponProvider";
import ImageInput, { changeHandler as imageHandler } from "@/components/general/ImageInput";
import { useMenuContextData } from "@/components/Providers/Admin/ContextProvider";
import axios, { isAxiosError } from "axios";
import { Route } from "next";
import { notif } from "@/utils/fe";
import Loading from "@/components/general/Loading";
import { EditContextButton } from "@/components/Admin/ContextMenu/EditMenu";

interface WeaponContentFormProps {
  template: "Write" | "Edit";
}

export type RefinementType = keyof Pick<GenshinImpact.ApiResponseWeapon, "r1" | "r2" | "r3" | "r4" | "r5">;

export default function GIWeaponContentForm({ template }: WeaponContentFormProps) {
  if (template === "Write") return <WriteContent />;
  else if (template === "Edit") return <EditContent />;
}

export const refinementData: RefinementType[] = ["r1", "r2", "r3", "r4", "r5"];

function WriteContent() {
  const { weapon, setWeapon, isLoading, setIsLoading, fileName, setFileName, previewLink, setPreviewLink, moveLocation, setMoveLocation } = useWeaponContext();

  const dataExist = Object.keys(weapon).length > 1;

  const submitConfig: SubmitConfig_GI = {
    url: "/api/post",
    setIsLoading: setIsLoading,
    game: "Genshin Impact",
    category: "Weapon",
    ref: "weapon-button-submit",
    callbackUrl: "/admin/data?field=genshin-impact&subfield=Weapon&lang=English",
    moveLocation,
  };

  return (
    <>
      <form onSubmit={(e) => submitFormHandler(e, submitConfig)} className="my-4">
        <FetchApi elementId="weapon-name" refElement="weapon-name" msgNoData="Weapon tidak ditemukan" query="weapons" msgNoInput="Masukkan Nama Weapon" setData={setWeapon} />

        <Input disabled={isLoading} forId="weapon-name" name="name" value={weapon.name} onChange={(e) => setWeapon({ ...weapon, name: e.target.value })} label="Weapon Name" variant={VariantClass.dashboard} />

        {dataExist ? (
          <>
            <div className="grid grid-cols-2">
              <Image width={200} height={200} alt={weapon.name} src={weapon.images.icon} className="block mx-auto" />
              <div>
                <Input
                  disabled={isLoading}
                  forId="weapon-base-atk"
                  name="weapon-base-atk"
                  label="Base Atk"
                  value={weapon.baseAtkValue.toFixed()}
                  onChange={(e) =>
                    setWeapon({
                      ...weapon,
                      baseAtkValue: Number(e.target.value),
                    })
                  }
                  variant={VariantClass.dashboard}
                />

                <Input
                  disabled={isLoading}
                  forId="weapon-base-stat"
                  name="weapon-base-stat"
                  label="Base Status"
                  value={weapon.baseStatText}
                  onChange={(e) =>
                    setWeapon({
                      ...weapon,
                      baseStatText: e.target.value,
                    })
                  }
                  variant={VariantClass.dashboard}
                />

                <Input
                  disabled={isLoading}
                  forId="weapon-sub-status"
                  name="subStatus"
                  label="Weapon Sub Status"
                  value={weapon.mainStatText}
                  onChange={(e) => setWeapon({ ...weapon, mainStatText: e.target.value })}
                  variant={VariantClass.dashboard}
                />
              </div>
            </div>

            <Input
              disabled={isLoading}
              forId="weapon-type"
              name="type"
              label="Weapon Type"
              list="weapon-type-list"
              value={weapon.weaponText}
              onChange={(e) => setWeapon({ ...weapon, weaponText: e.target.value })}
              variant={VariantClass.dashboard}
            />

            <Textarea forId="weapon-lore" name="lore" label="Weapon Lore" value={weapon.story} onChange={(e) => setWeapon({ ...weapon, story: e.target.value })} className={TextareaStyle.variant_1} />

            <Input disabled={isLoading} forId="weapon-rarity" name="rarity" label="Weapon Rarity" value={weapon.rarity} onChange={(e) => setWeapon({ ...weapon, rarity: Number(e.target.value) })} variant={VariantClass.dashboard} />

            <div className="border border-white rounded-xl p-4 my-4">
              <div>
                <h3 className="text-center font-bold font-poppins text-white">Passive Weapon</h3>
                <Input
                  disabled={isLoading}
                  forId="weapon-passive-name"
                  name="passive-name"
                  label="Passive Name"
                  value={weapon.effectName}
                  onChange={(e) => setWeapon({ ...weapon, effectName: e.target.value })}
                  variant={VariantClass.dashboard}
                />
              </div>

              <div>
                {refinementData.map((refinement, i: number) => (
                  <React.Fragment key={`weapon-ref-${refinement}-element`}>
                    <Textarea
                      forId={`weapon-ref-${refinement}`}
                      name={`weapon-ref-${refinement}`}
                      label={`Weapon Refinement ${i + 1}`}
                      value={(weapon[refinement as keyof GenshinImpact.ApiResponseWeapon] as GenshinImpact.ApiResponseWeapon[`r1`]).description}
                      onChange={(e) =>
                        setWeapon({
                          ...weapon,
                          [refinement]: {
                            ...(weapon[refinement as keyof GenshinImpact.ApiResponseWeapon] as GenshinImpact.ApiResponseWeapon[`r1`]),
                            description: e.target.value,
                          },
                        })
                      }
                      className={TextareaStyle.variant_1}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="border-2 border-white rounded-lg p-4 my-4">
              <h1 className="text-white font-semibold font-poppins text-center">Material Ascend</h1>
              <div>
                <Swiper slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
                  <SwiperSlide>
                    <SwiperDataSlide category="Weapon" template="Write" passData={weapon} keyValue="ascend1" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperDataSlide category="Weapon" template="Write" passData={weapon} keyValue="ascend2" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperDataSlide category="Weapon" template="Write" passData={weapon} keyValue="ascend3" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperDataSlide category="Weapon" template="Write" passData={weapon} keyValue="ascend4" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperDataSlide category="Weapon" template="Write" passData={weapon} keyValue="ascend5" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperDataSlide category="Weapon" template="Write" passData={weapon} keyValue="ascend6" />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>

            <ImageInput changeHandler={(e) => imageHandler(e, setFileName, setPreviewLink)} fileName={fileName} setFileName={setFileName} previewLink={previewLink} setPreviewLink={setPreviewLink} />
          </>
        ) : (
          <p className="font-bold text-white font-poppins">No Data Selected</p>
        )}

        <div className="flex gap-4" id="weapon-button-submit">
          <Button className={ButtonStyle.submit}>{isLoading ? "Submitting..." : "Submit"}</Button>
          <label htmlFor="move-location" className="text-white font-bold font-poppins my-auto">
            <input type="checkbox" id="move-location" className="mx-2" checked={moveLocation} onChange={() => setMoveLocation(!moveLocation)} />
            Lihat Data setelah selesai ditambah
          </label>
        </div>
      </form>
      <datalist id="weapon-type-list">
        <option value="Bow" />
        <option value="Catalyst" />
        <option value="Claymore" />
        <option value="Polearm" />
        <option value="Sword" />
      </datalist>
    </>
  );
}

function EditContent() {
  const [data, setData] = useState<GenshinImpact.Weapon>({} as GenshinImpact.Weapon);

  const { contextMenu, isLoading } = useMenuContextData();
  const lang = contextMenu.target?.getAttribute("data-lang");
  const id = contextMenu.target?.getAttribute("data-id");
  const [previewLink, setPreviewLink] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/gamelingo/genshin-impact?_id=${id}&category=Weapon&lang=${lang}`;
      axios(url).then((res) => {
        setData(res.data.data);
      });
    }
  }, [contextMenu, data, id, lang]);
  const { setIsLoading, setEditMenu, searchParams } = useMenuContextData();
  const langParams = searchParams.get("lang");

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const _id = formData.get("id") as string;

    try {
      setIsLoading(true);
      const res = await axios.putForm("/api/gamelingo/genshin-impact" as Route, formData, {
        headers: {
          "Data-Category": "Weapon",
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

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;

    if (!target.files || (target.files && target.files.length === 0)) {
      target.value = "";
      setFileName("");
      setPreviewLink("");

      return;
    }

    const image = target.files[0];
    const urlSrc = URL.createObjectURL(image);

    setFileName(image.name);
    setPreviewLink(urlSrc);
  }

  const isDisabled = isLoading;

  return (
    <div className="w-1/2 max-h-[450px] overflow-y-scroll scrollbar-style absolute top-36 left-[35%] bg-zinc-700 rounded-xl border-2 border-white p-4">
      <h1 id="test" className="text-white text-center font-bold font-poppins">
        Edit Weapon
      </h1>
      <form onSubmit={(e) => submitHandler(e)} method="post">
        {!data || Object.keys(data).length === 0 ? (
          <Loading loading={1} textOn text="Mengambil data Weapon..." />
        ) : (
          <>
            <input type="hidden" defaultValue={data._id} name="id" />

            <Input forId="UID" defaultValue={data._id} disabled variant={VariantClass.dashboard} label="UID" />

            <Input forId="name" defaultValue={data.name} disabled={isDisabled} required name="name" variant={VariantClass.dashboard} label="Weapon Name" />

            <div>
              <label
                className="relative m-auto border border-dashed group border-white rounded-md min-h-[128px] min-w-[128px] max-h-[210px] max-w-[210px] flex justify-center items-center transition duration-200 cursor-pointer hover:border-zinc-500 overflow-hidden"
                htmlFor="input-image"
              >
                <input type="file" name="image" id="input-image" className="hidden" onChange={changeHandler} />
                {data.image ? (
                  <Image src={data.image} fill sizes="auto" alt={data.name + " Image"} className="w-auto group-hover:scale-125 transition duration-500" />
                ) : fileName && previewLink ? (
                  <Image src={previewLink} width={64} height={64} alt={fileName + " Image"} className="w-auto group-hover:scale-125 transition duration-500" />
                ) : (
                  <span className="transition duration-200 group-hover:text-zinc-500 text-white font-bold"> No Image</span>
                )}
              </label>
            </div>

            <div>
              <Input disabled={isLoading} forId="weapon-base-atk" name="weapon-base-atk" label="Base Atk" defaultValue={data.baseAtk} variant={VariantClass.dashboard} />

              <Input disabled={isLoading} forId="weapon-base-stat" name="weapon-base-stat" label="Base Status" defaultValue={data.baseStat} variant={VariantClass.dashboard} />

              <Input disabled={isLoading} forId="weapon-sub-status" name="subStatus" label="Weapon Sub Status" value={data.subStatus} variant={VariantClass.dashboard} />
            </div>

            <Input disabled={isLoading} forId="weapon-type" name="type" label="Weapon Type" list="weapon-type-list" defaultValue={data.type} variant={VariantClass.dashboard} />

            <Textarea forId="weapon-lore" name="lore" label="Weapon Lore" defaultValue={data.lore} className={TextareaStyle.variant_1} />

            <Input disabled={isLoading} forId="weapon-rarity" name="rarity" label="Weapon Rarity" defaultValue={data.rarity} variant={VariantClass.dashboard} />

            <div className="border border-white rounded-xl p-4 my-4">
              <div>
                <h3 className="text-center font-bold font-poppins text-white">Passive Weapon</h3>
                <Input disabled={isLoading} forId="weapon-passive-name" name="passive-name" label="Passive Name" defaultValue={data.passive.passiveName} variant={VariantClass.dashboard} />
              </div>

              <div>
                {refinementData.map((refinement, i: number) => (
                  <React.Fragment key={`weapon-ref-${refinement}-element`}>
                    <Textarea
                      forId={`weapon-ref-${refinement}`}
                      name={`weapon-ref-${refinement}`}
                      label={`Weapon Refinement ${i + 1}`}
                      value={data.passive[refinement as keyof GenshinImpact.Weapon["passive"]]}
                      className={TextareaStyle.variant_1}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="border-2 border-white rounded-lg p-4 my-4">
              <h1 className="text-white font-semibold font-poppins text-center">Material Ascend</h1>
              <Swiper slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
                <SwiperSlide>
                  <SwiperDataSlide category="Weapon" template="Edit" passData={data} keyValue="ascend1" />
                </SwiperSlide>
                <SwiperSlide>
                  <SwiperDataSlide category="Weapon" template="Edit" passData={data} keyValue="ascend2" />
                </SwiperSlide>
                <SwiperSlide>
                  <SwiperDataSlide category="Weapon" template="Edit" passData={data} keyValue="ascend3" />
                </SwiperSlide>
                <SwiperSlide>
                  <SwiperDataSlide category="Weapon" template="Edit" passData={data} keyValue="ascend4" />
                </SwiperSlide>
                <SwiperSlide>
                  <SwiperDataSlide category="Weapon" template="Edit" passData={data} keyValue="ascend5" />
                </SwiperSlide>
                <SwiperSlide>
                  <SwiperDataSlide category="Weapon" template="Edit" passData={data} keyValue="ascend6" />
                </SwiperSlide>
              </Swiper>
            </div>

            {data.image ? <></> : <ImageInput changeHandler={(e) => imageHandler(e, setFileName, setPreviewLink)} fileName={fileName} setFileName={setFileName} previewLink={previewLink} setPreviewLink={setPreviewLink} />}
            <EditContextButton />
          </>
        )}
      </form>
    </div>
  );
}
