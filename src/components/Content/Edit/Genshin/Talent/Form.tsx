import TextField from "@/components/Input/TextField";
import ErrorFeching from "../Component/Error";
import { useState } from "react";

// <<<<< Swiper JS >>>>>
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import TableMapping from "@/components/Content/Write/Genshin/Talent/Table";
import PassiveTalent from "@/components/Content/Write/Genshin/Talent/Passive";
import SwiperSlideData from "@/components/Content/Write/Genshin/Components/SwiperSlideData";

const formNameMapping: Record<string, keyof FormUtils.Genshin.FormDataTalent> =
  {
    charName: "character-name",
    "combat1-name": "combat1-name",
    "combat1-description": "combat1-description",
    "combat1-icon": "talent-combat1-icon",
  };

export default function Form({ data, lang }: { data: GenshinImpact.Talent, lang:General.PostDocument["lang"] }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!data) return <ErrorFeching template="Characer" />;

  return (
    <form>
      <h3 className="font-bold text-white text-xl font-poppins text-center underline">
        Edit {data.charName} Talent
      </h3>

      <input type="hidden" name="id" value={data._id} />

      <TextField
        variant="default-variant-1"
        defaultValue={data.charName}
        label="Character Name"
        forId="charName"
        disabled={isLoading}
        name={formNameMapping.charName}
      />

      <TableMapping template="Edit" index="combat1" edit={data} />

      <TableMapping template="Edit" index="combat2" edit={data} />

      <TableMapping template="Edit" index="combat3" edit={data} />

      {data.combats.combatsp && (
        <TableMapping template="Edit" index="combatsp" edit={data} />
      )}

      <PassiveTalent template="Edit" edit={data} index="passive1" />

      <PassiveTalent template="Edit" edit={data} index="passive2" />

      <PassiveTalent template="Edit" edit={data} index="passive3" />

      <div className="border-2 border-white rounded-lg p-4 my-4">
        <h2 className="text-white font-semibold font-poppins text-center">
          Upgrade Cost
        </h2>
        <Swiper
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <SwiperSlideData
              category="Talent"
              passData={data}
              template="Edit"
              keyValue="lvl2"
            />
          </SwiperSlide>

          <SwiperSlide>
            <SwiperSlideData
              category="Talent"
              passData={data}
              template="Edit"
              keyValue="lvl3"
            />
          </SwiperSlide>

          <SwiperSlide>
            <SwiperSlideData
              category="Talent"
              passData={data}
              template="Edit"
              keyValue="lvl4"
            />
          </SwiperSlide>

          <SwiperSlide>
            <SwiperSlideData
              category="Talent"
              passData={data}
              template="Edit"
              keyValue="lvl5"
            />
          </SwiperSlide>

          <SwiperSlide>
            <SwiperSlideData
              category="Talent"
              passData={data}
              template="Edit"
              keyValue="lvl6"
            />
          </SwiperSlide>

          <SwiperSlide>
            <SwiperSlideData
              category="Talent"
              passData={data}
              template="Edit"
              keyValue="lvl7"
            />
          </SwiperSlide>

          <SwiperSlide>
            <SwiperSlideData
              category="Talent"
              passData={data}
              template="Edit"
              keyValue="lvl8"
            />
          </SwiperSlide>

          <SwiperSlide>
            <SwiperSlideData
              category="Talent"
              passData={data}
              template="Edit"
              keyValue="lvl9"
            />
          </SwiperSlide>

          <SwiperSlide>
            <SwiperSlideData
              category="Talent"
              passData={data}
              template="Edit"
              keyValue="lvl10"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </form>
  );
}
