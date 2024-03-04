import React from "react";
import { SubmitConfig_GI, submitFormHandler } from "../genshinUtils";
import Button, { VariantClass as ButtonStyle } from "@/components/general/Button";
import { Input, VariantClass } from "@/components/general/Input";
import Textarea, { TextareaStyle } from "@/components/general/Textarea";
import ImageInput, { changeHandler as imageHandler } from "@/components/general/ImageInput";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperDataSlide from "./SwiperSlideData";
import { Pagination } from "swiper/modules";
import { FetchApi } from "../genshinComponents";

type RefinementType = Pick<GenshinImpact.ApiResponseWeapon, "r1" | "r2" | "r3" | "r4" | "r5">;

export default function WeaponForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [fileName, setFilename] = React.useState<string>("");
  const [previewLink, setPreviewLink] = React.useState<string>("");
  const [weapon, setWeapon] = React.useState<GenshinImpact.ApiResponseWeapon>({} as GenshinImpact.ApiResponseWeapon);
  const refinementData = ["r1", "r2", "r3", "r4", "r5"];

  function changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const textareas = document.querySelectorAll("textarea[data-textarea='weapon-ref'") as NodeListOf<HTMLTextAreaElement>;

    textareas.forEach((textarea) => {
      textarea.value = e.target.value;
    });
  }

  const dataExist = Object.keys(weapon).length > 1;

  const submitConfig: SubmitConfig_GI = {
    url: "/api/post",
    setIsLoading: setIsLoading,
    game: "Genshin Impact",
    category: "Weapon",
    ref: "artifact-button-submit",
    callbackUrl: "/admin/data?field=genshin-impact&subfield=Weapon",
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
                    <SwiperDataSlide weapon={weapon} keyValue="ascend1" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperDataSlide weapon={weapon} keyValue="ascend2" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperDataSlide weapon={weapon} keyValue="ascend3" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperDataSlide weapon={weapon} keyValue="ascend4" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperDataSlide weapon={weapon} keyValue="ascend5" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperDataSlide weapon={weapon} keyValue="ascend6" />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>

            <ImageInput changeHandler={(e) => imageHandler(e, setFilename, setPreviewLink)} fileName={fileName} setFileName={setFilename} previewLink={previewLink} setPreviewLink={setPreviewLink} />
          </>
        ) : (
          <p className="font-bold text-white font-poppins">No Data Selected</p>
        )}

        <Button className={ButtonStyle.submit} id="weapon-button-submit">
          {isLoading ? "Submitting" : "Submit"}
        </Button>
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
