import React from "react";
import { submitFormHandler } from "../genshinUtils";
import Button, {
  VariantClass as ButtonStyle,
} from "@/components/general/Button";
import { Input, VariantClass } from "@/components/general/Input";
import { FetchApi } from "../genshinComponents";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import TableMapping from "./Table";

export interface CombatStatus {
  statsName: string;
  paramName: string[];
  additionalRule: string;
  suffix: string;
  codeStatus: string;
}

export default function TalentForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [talent, setTalent] = React.useState<GenshinImpact.ApiResponseTalent>(
    {} as GenshinImpact.ApiResponseTalent
  );

  const talentExist = Object.keys(talent).length !== 0 && talent.combat1;
  return (
    <form
      onSubmit={(e) =>
        submitFormHandler(
          e,
          "/api/post",
          setIsLoading,
          "Genshin Impact",
          "Talent",
          "talent-button-submit"
        )
      }
    >
      <FetchApi
        elementId="character-name"
        msgNoData="Tidak ada karakter yang dimaksud"
        msgNoInput="Nama karakter belum diisi"
        refElement="character-name"
        query="talents"
        setData={setTalent}
      />

      <Input
        forId="character-name"
        label="Character Name"
        variant={VariantClass.dashboard}
        onChange={(e) => setTalent({ ...talent, name: e.target.value })}
        value={talent?.name}
      />

      <div className="border-2 border-white rounded-lg p-4 my-4">
        {talentExist ? (
          <>
            <h1 className="text-white font-semibold font-poppins text-center">
              Talent
            </h1>
            <Swiper
              slidesPerView={1}
              modules={[Pagination]}
              pagination={{ clickable: true }}
            >
              <SwiperSlide>
                <TableMapping
                  talent={talent}
                  setTalent={setTalent}
                  index="combat1"
                />
              </SwiperSlide>

              <SwiperSlide>
                <TableMapping
                  talent={talent}
                  setTalent={setTalent}
                  index="combat2"
                />
              </SwiperSlide>

              <SwiperSlide>
                <TableMapping
                  talent={talent}
                  setTalent={setTalent}
                  index="combat3"
                />
              </SwiperSlide>

              {talent?.combatsp && (
                <SwiperSlide>
                  <TableMapping
                    talent={talent}
                    setTalent={setTalent}
                    index="combatsp"
                  />
                </SwiperSlide>
              )}
            </Swiper>
          </>
        ) : (
          <h1 className="text-white font-semibold font-poppins text-center">
            Belum pilih data character
          </h1>
        )}
      </div>

      <Button className={ButtonStyle.submit} id="talent-button-submit">
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
