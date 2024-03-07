import React from "react";
import { SubmitConfig_GI, submitFormHandler } from "../genshinUtils";
import Button, { VariantClass as ButtonStyle } from "@/components/Input/Button";
import { Input, VariantClass } from "@/components/general/Input";
import { FetchApi } from "../genshinComponents";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import TableMapping from "./Table";
import PassiveTalent from "./Passive";
import UpgradeCost from "./Cost";

export interface CombatStatus {
  statsName: string;
  paramName: string[];
  additionalRule: string;
  suffix: string;
  codeStatus: string;
}

export default function TalentForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [talent, setTalent] = React.useState<GenshinImpact.ApiResponseTalent>({} as GenshinImpact.ApiResponseTalent);

  const dataExist = Object.keys(talent).length !== 0 && talent.combat1;
  const submitConfig: SubmitConfig_GI = {
    url: "/api/post",
    setIsLoading: setIsLoading,
    game: "Genshin Impact",
    category: "Talent",
    ref: "artifact-button-submit",
    callbackUrl: "/admin/data?field=genshin-impact&subfield=Talent",
  };
  return (
    <form onSubmit={(e) => submitFormHandler(e, submitConfig)} className="my-4">
      <FetchApi elementId="character-name" msgNoData="Tidak ada karakter yang dimaksud" msgNoInput="Nama karakter belum diisi" refElement="character-name" query="talents" setData={setTalent} />

      <Input forId="character-name" name="character-name" label="Character Name" variant={VariantClass.dashboard} onChange={(e) => setTalent({ ...talent, name: e.target.value })} value={talent?.name} />

      <div className="border-2 border-white rounded-lg p-4 my-4">
        {dataExist ? (
          <>
            <h1 className="text-white font-semibold font-poppins text-center">Talent</h1>
            <Swiper slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
              <SwiperSlide>
                <TableMapping talent={talent} setTalent={setTalent} index="combat1" />
              </SwiperSlide>

              <SwiperSlide>
                <TableMapping talent={talent} setTalent={setTalent} index="combat2" />
              </SwiperSlide>

              <SwiperSlide>
                <TableMapping talent={talent} setTalent={setTalent} index="combat3" />
              </SwiperSlide>

              {talent?.combatsp && (
                <SwiperSlide>
                  <TableMapping talent={talent} setTalent={setTalent} index="combatsp" />
                </SwiperSlide>
              )}

              <SwiperSlide>
                <PassiveTalent talent={talent} setTalent={setTalent} index="passive1" />
              </SwiperSlide>

              <SwiperSlide>
                <PassiveTalent talent={talent} setTalent={setTalent} index="passive2" />
              </SwiperSlide>

              <SwiperSlide>
                <PassiveTalent talent={talent} setTalent={setTalent} index="passive3" />
              </SwiperSlide>
            </Swiper>
          </>
        ) : (
          <h1 className="text-white font-semibold font-poppins text-center">Belum pilih data character</h1>
        )}
      </div>

      {dataExist && (
        <div className="border-2 border-white rounded-lg p-4 my-4">
          <h2 className="text-white font-semibold font-poppins text-center">Upgrade Cost</h2>
          <Swiper slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
            <SwiperSlide>
              <UpgradeCost talent={talent} setTalent={setTalent} keyValue="lvl2" />
            </SwiperSlide>

            <SwiperSlide>
              <UpgradeCost talent={talent} setTalent={setTalent} keyValue="lvl3" />
            </SwiperSlide>

            <SwiperSlide>
              <UpgradeCost talent={talent} setTalent={setTalent} keyValue="lvl4" />
            </SwiperSlide>

            <SwiperSlide>
              <UpgradeCost talent={talent} setTalent={setTalent} keyValue="lvl5" />
            </SwiperSlide>

            <SwiperSlide>
              <UpgradeCost talent={talent} setTalent={setTalent} keyValue="lvl6" />
            </SwiperSlide>

            <SwiperSlide>
              <UpgradeCost talent={talent} setTalent={setTalent} keyValue="lvl7" />
            </SwiperSlide>

            <SwiperSlide>
              <UpgradeCost talent={talent} setTalent={setTalent} keyValue="lvl8" />
            </SwiperSlide>

            <SwiperSlide>
              <UpgradeCost talent={talent} setTalent={setTalent} keyValue="lvl9" />
            </SwiperSlide>

            <SwiperSlide>
              <UpgradeCost talent={talent} setTalent={setTalent} keyValue="lvl10" />
            </SwiperSlide>
          </Swiper>
        </div>
      )}

      <Button className={ButtonStyle.submit} id="talent-button-submit">
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
