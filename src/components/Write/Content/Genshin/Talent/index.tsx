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
import Textarea, { TextareaStyle } from "@/components/general/Textarea";
import Combat1 from "./Combat1";

export default function TalentForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [talent, setTalent] = React.useState<GenshinImpact.ApiResponseTalent>(
    {} as GenshinImpact.ApiResponseTalent
  );
  const combat1Label = React.useMemo(() => {
    const labels = talent?.combat1?.attributes?.labels;
    const mapLabels = labels?.map((label) => label.split("|"));

    return mapLabels;
  }, [talent]);

  console.log(combat1Label[1])

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
        <h1 className="text-white font-semibold font-poppins text-center">
          Talent
        </h1>

        <Swiper
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <h2 className="text-white font-semibold font-poppins">Combat 1</h2>

            <Input
              forId="talent-combat-1-name"
              label="Talent Name"
              variant={VariantClass.dashboard}
              onChange={(e) =>
                setTalent({
                  ...talent,
                  combat1: { ...talent.combat1, name: e.target.value },
                })
              }
              value={talent?.combat1?.name}
            />

            <Textarea
              forId="talent-combat-1-info"
              label="Talent Info"
              className={TextareaStyle.variant_1}
              onChange={(e) =>
                setTalent({
                  ...talent,
                  combat1: { ...talent.combat1, description: e.target.value },
                })
              }
              value={talent?.combat1?.description}
            />

            {combat1Label && combat1Label?.length !== 0 && (
              <Combat1 talent={talent} combat1Label={combat1Label} />
            )}
          </SwiperSlide>
        </Swiper>
      </div>

      <Button className={ButtonStyle.submit} id="talent-button-submit">
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
