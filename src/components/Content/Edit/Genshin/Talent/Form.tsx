import TextField from "@/components/Input/TextField";
import ErrorFeching from "../Component/Error";
import React, { SetStateAction, useState } from "react";

// <<<<< Swiper JS >>>>>
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import TableMapping from "@/components/Content/Write/Genshin/Talent/Table";
import PassiveTalent from "@/components/Content/Write/Genshin/Talent/Passive";
import SwiperSlideData from "@/components/Content/Write/Genshin/Components/SwiperSlideData";
import Button, { VariantClass } from "@/components/Input/Button";
import axios, { isAxiosError } from "axios";
import { Route } from "next";
import { alertMessage, notif } from "@/utils/fe";

const formNameMapping: Record<string, keyof FormUtils.Genshin.FormDataTalent> =
  {
    charName: "character-name",
    "combat1-name": "combat1-name",
    "combat1-description": "combat1-description",
    "combat1-icon": "talent-combat1-icon",
  };

export default function Form({
  data,
  lang,
  cancelData,
}: {
  data: GenshinImpact.Talent;
  lang: General.PostDocument["lang"];
  cancelData: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!data) return <ErrorFeching template="Characer" />;

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const _id = formData.get("id") as string;
    const lang = formData.get("result-lang") as string;

    try {
      setIsLoading(true);
      const res = await axios.putForm(
        "/api/gamelingo/genshin-impact" as Route,
        formData,
        {
          headers: {
            "Data-Category": "Talent",
            "Old-Id": _id,
            "Content-Lang": lang,
          },
        }
      );

      // notif(res.data.msg, {
      //   color: "green",
      //   refElement: "buttons",
      //   location: "before",
      // });
      alertMessage(res.data.msg, { color: "green" });
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

  return (
    <form onSubmit={submitHandler}>
      <h3 className="font-bold text-white text-xl font-poppins text-center underline">
        Edit {data.charName} Talent
      </h3>

      <input type="hidden" name="id" value={data._id} readOnly />

      <input type="hidden" name="result-lang" value={lang} readOnly />

      <TextField
        variant="default-variant-1"
        defaultValue={data.charName}
        label="Character Name"
        forId="charName"
        disabled={isLoading}
        name={formNameMapping.charName}
      />

      <TableMapping
        isLoading={isLoading}
        template="Edit"
        index="combat1"
        edit={data}
      />

      <TableMapping
        isLoading={isLoading}
        template="Edit"
        index="combat2"
        edit={data}
      />

      <TableMapping
        isLoading={isLoading}
        template="Edit"
        index="combat3"
        edit={data}
      />

      {data.combats.combatsp && (
        <TableMapping
          isLoading={isLoading}
          template="Edit"
          index="combatsp"
          edit={data}
        />
      )}

      <PassiveTalent
        isLoading={isLoading}
        template="Edit"
        edit={data}
        index="passive1"
      />

      <PassiveTalent
        isLoading={isLoading}
        template="Edit"
        edit={data}
        index="passive2"
      />

      <PassiveTalent
        isLoading={isLoading}
        template="Edit"
        edit={data}
        index="passive3"
      />

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

      {/* Sending Button */}
      <div className="flex gap-4" id="buttons">
        <Button className={VariantClass.submit} disabled={isLoading}>
          {isLoading ? "Mengubah Data..." : "Ubah Data"}
        </Button>
        <Button
          className={VariantClass.danger}
          type="button"
          disabled={isLoading}
          onClick={() => cancelData(false)}
        >
          Batal
        </Button>
      </div>
    </form>
  );
}
