import TextField from "@/components/Input/TextField";
import Textarea, { TextareaStyle } from "@/components/Input/Textarea";
import { Route } from "next";

// <<<<< Swiperjs Library >>>>>
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import SwiperSlideData from "@/components/Content/Write/Genshin/Components/SwiperSlideData";
import ImageInput from "@/components/general/ImageInput";
import { useState } from "react";
import axios, { isAxiosError } from "axios";
import { notif } from "@/utils/fe";
import Button, { VariantClass } from "@/components/Input/Button";
import ErrorFeching from "../Component/Error";

interface FormProps {
  data: GenshinImpact.Character;
}
export default function Form({ data }: FormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const _id = formData.get("id") as string;
    const lang = formData.get("lang") as string;

    try {
      setIsLoading(true);
      const res = await axios.putForm(
        "/api/gamelingo/genshin-impact" as Route,
        formData,
        {
          headers: {
            "Data-Category": "Character",
            "Old-Id": _id,
            "Content-Lang": lang,
          },
        }
      );

      notif(res.data.msg, {
        color: "green",
        refElement: "buttons",
        location: "before",
      });
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

  if (!data) return <ErrorFeching template="Characer" />

  return (
    <form onSubmit={submitHandler} className="my-4">
      <h3 className="font-bold text-white text-xl font-poppins text-center underline">
        Edit {data.name} data
      </h3>

      <input type="hidden" name="id" value={data._id} />

      <input type="hidden" name="lang" value={data.lang} />

      <TextField
        variant="default-variant-1"
        defaultValue={data.name}
        label="Character Name"
        forId="charName"
        disabled={isLoading}
        name="name"
      />

      <TextField
        variant="default-variant-1"
        defaultValue={data.lang + " (Can't edit this data)"}
        label="Language"
        forId="lang"
        disabled
        name="lang"
      />

      <div className="grid grid-cols-2 gap-4 my-4">
        <div className="p-4 border-2 border-white rounded-xl">
          <h4 className="font-bold text-white font-merriweather text-center underline">
            Cover Image
          </h4>
          <div className=" text-white font-poppins">
            <p className="font-bold underline mb-2">Aturan :</p>
            <ul className="px-2">
              <li className="list-disc text-sm">
                Pastikan nama file memiliki format &ldquo;Nama Karakter -
                Cover.png&rdquo;
              </li>
              <li className="list-disc text-sm">
                Contoh: &ldquo;Kamisato Ayaka - Cover.png&rdquo;
              </li>
              <li className="list-disc text-sm">
                Hanya format png dan webp saja yang diizinkan
              </li>
            </ul>
          </div>
          <ImageInput
            template="Character"
            id="image-cover"
            dataImage={data.image.cover}
            imageName={`${data.name} - Cover.png`}
          />
        </div>

        <div className="p-4 border-2 border-white rounded-xl">
          <h4 className="font-bold text-white font-merriweather text-center underline">
            Portrait Image
          </h4>
          <div className=" text-white font-poppins">
            <p className="font-bold underline mb-2">Aturan :</p>
            <ul className="px-2">
              <li className="list-disc text-sm">
                Pastikan nama file memiliki format &ldquo;Nama Karakter -
                Portrait.png&rdquo;
              </li>
              <li className="list-disc text-sm">
                Contoh: &ldquo;Kamisato Ayaka - Portrait.png&rdquo;
              </li>
              <li className="list-disc text-sm">
                Hanya format png dan webp saja yang diizinkan
              </li>
            </ul>
          </div>
          <ImageInput
            template="Character"
            id="image-portrait"
            dataImage={data.image.portrait}
            imageName={`${data.name} - Portrait.png`}
          />
        </div>
      </div>

      <Textarea
        className={TextareaStyle.variant_1}
        defaultValue={data.description}
        label="Character Description"
        name="description"
        forId="char-description"
        disabled={isLoading}
      />

      <TextField
        variant="default-variant-1"
        defaultValue={data.ascendStatus}
        label="Character Ascend Status"
        forId="character-ascend-status"
        disabled={isLoading}
        name="ascendStatus"
      />

      <div className="border-2 border-white rounded-lg p-4 my-4">
        <h1 className="text-white font-semibold font-poppins text-center">
          Material Ascend
        </h1>

        <div className="my-2">
          <Swiper
            slidesPerView={1}
            modules={[Pagination]}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <SwiperSlideData
                category="Character"
                template="Edit"
                passData={data}
                keyValue="ascend1"
              />
            </SwiperSlide>

            <SwiperSlide>
              <SwiperSlideData
                category="Character"
                template="Edit"
                passData={data}
                keyValue="ascend2"
              />
            </SwiperSlide>

            <SwiperSlide>
              <SwiperSlideData
                category="Character"
                template="Edit"
                passData={data}
                keyValue="ascend3"
              />
            </SwiperSlide>

            <SwiperSlide>
              <SwiperSlideData
                category="Character"
                template="Edit"
                passData={data}
                keyValue="ascend4"
              />
            </SwiperSlide>

            <SwiperSlide>
              <SwiperSlideData
                category="Character"
                template="Edit"
                passData={data}
                keyValue="ascend5"
              />
            </SwiperSlide>

            <SwiperSlide>
              <SwiperSlideData
                category="Character"
                template="Edit"
                passData={data}
                keyValue="ascend6"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="border-2 border-white rounded-lg p-4 my-4">
        <h1 className="text-white font-semibold font-poppins text-center">
          Character Voice
        </h1>
        <TextField
          forId="character-voice-chinese"
          disabled={isLoading}
          name="character-voice-chinese"
          defaultValue={data.cv.chinese}
          variant="default-variant-1"
          label="Chinese"
        />

        <TextField
          forId="character-voice-english"
          disabled={isLoading}
          name="character-voice-english"
          defaultValue={data.cv.english}
          variant="default-variant-1"
          label="English"
        />

        <TextField
          forId="character-voice-japanese"
          disabled={isLoading}
          defaultValue={data.cv.japanese}
          name="character-voice-japanese"
          variant="default-variant-1"
          label="Japanese"
        />

        <TextField
          forId="character-voice-korean"
          disabled={isLoading}
          defaultValue={data.cv.korean}
          name="character-voice-korean"
          variant="default-variant-1"
          label="Korean"
        />
      </div>

      <TextField
        forId="character-rarity"
        disabled={isLoading}
        name="rarity"
        defaultValue={data.rarity}
        variant="default-variant-1"
        label="Character Rarity"
      />

      <TextField
        forId="character-element"
        disabled={isLoading}
        name="element"
        defaultValue={data.element}
        variant="default-variant-1"
        label="Character Element"
      />

      <TextField
        forId="character-character-type"
        disabled={isLoading}
        name="weapon"
        defaultValue={data.weapon}
        variant="default-variant-1"
        label="Character Weapon"
      />

      <TextField
        forId="character-gender"
        disabled={isLoading}
        name="gender"
        value={data.gender}
        variant="default-variant-1"
        label="Character Gender"
      />

      <TextField
        forId="character-region"
        disabled={isLoading}
        name="region"
        defaultValue={data.region}
        variant="default-variant-1"
        label="Character Region"
      />

      <div id="buttons">
        <Button className={VariantClass.submit} disabled={isLoading}>
          {isLoading ? "Mengubah data..." : "Ubah Data"}
        </Button>
      </div>
    </form>
  );
}
