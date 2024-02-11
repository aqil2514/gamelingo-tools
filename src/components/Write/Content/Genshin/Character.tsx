import React from "react";
import { apiURL, submitFormHandler } from "./formState";
import Button, {
  VariantClass as ButtonStyle,
} from "@/components/general/Button";
import { Input, VariantClass } from "@/components/general/Input";
import axios from "axios";
import { notif } from "@/utils/fe";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import ImageInput, { changeHandler } from "@/components/general/ImageInput";
import Image from "next/image";

export default function CharacterForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [character, setCharacter] =
    React.useState<GenshinImpact.ApiResponseCharacter>(
      {} as GenshinImpact.ApiResponseCharacter
    );
  const [fileName, setFileName] = React.useState<string>("");
  const [previewLink, setPreviewLink] = React.useState<string>("");

  async function fetchHandler() {
    const element = document.getElementById(
      "character-name"
    ) as HTMLInputElement;
    const charName = element.value;

    if (!charName)
      return notif(
        "Nama karakter belum dipilih",
        "red",
        "character-name",
        "before"
      );
    try {
      setIsLoading(true);

      const res = await axios.get(`${apiURL}/characters`, {
        params: {
          query: charName,
          resultLanguage: "Indonesian",
        },
      });

      if (!res.data) {
        return notif(
          "Karakter tidak ada. Pastikan yang benar",
          "red",
          "character-name",
          "before"
        );
      }

      setCharacter(res.data);
      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={(e) =>
        submitFormHandler(
          e,
          "/api/post",
          setIsLoading,
          "Genshin Impact",
          "Character",
          "character-button-submit"
        )
      }
      className="my-4"
    >
      <Button
        id="fetct-data"
        onClick={fetchHandler}
        className={ButtonStyle.fetch}
        disabled={isLoading}
        type="button"
      >
        {isLoading ? "Fetching Data..." : "Fetch Data"}
      </Button>
      <Input
        forId="character-name"
        name="name"
        value={character.name}
        onChange={(e) => setCharacter({ ...character, name: e.target.value })}
        variant={VariantClass.dashboard}
        disabled={isLoading}
        label="Character Name"
      />

      <Input
        forId="character-description"
        name="description"
        value={character.description}
        onChange={(e) =>
          setCharacter({ ...character, description: e.target.value })
        }
        variant={VariantClass.dashboard}
        disabled={isLoading}
        label="Character Description"
      />

      <Input
        forId="character-ascend-status"
        name="ascendStatus"
        value={character.substatText}
        onChange={(e) =>
          setCharacter({ ...character, substatText: e.target.value })
        }
        variant={VariantClass.dashboard}
        disabled={isLoading}
        label="Character Ascend Status"
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
              <h2 className="text-white font-semibold font-poppins">
                Ascend 1
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  forId="ascend-1-material-1"
                  name="ascend-1-material-1"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend1[0]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-1-count-1"
                  name="ascend-1-count-1"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend1[0]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-1-material-2"
                  name="ascend-1-material-2"
                  labelMarginY="0"
                  defaultValue={character?.costs?.ascend1[1]?.name}
                  label="Material"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-1-count-2"
                  name="ascend-1-count-2"
                  labelMarginY="0"
                  defaultValue={character?.costs?.ascend1[1]?.count}
                  label="Count"
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-1-material-3"
                  name="ascend-1-material-3"
                  labelMarginY="0"
                  defaultValue={character?.costs?.ascend1[2]?.name}
                  label="Material"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-1-count-3"
                  name="ascend-1-count-3"
                  labelMarginY="0"
                  defaultValue={character?.costs?.ascend1[2]?.count}
                  label="Count"
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-1-material-4"
                  name="ascend-1-material-4"
                  labelMarginY="0"
                  defaultValue={character?.costs?.ascend1[3]?.name}
                  label="Material"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-1-count-4"
                  name="ascend-1-count-4"
                  labelMarginY="0"
                  defaultValue={character?.costs?.ascend1[3]?.count}
                  label="Count"
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <h2 className="text-white font-semibold font-poppins">
                Ascend 2
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  forId="ascend-2-material-1"
                  name="ascend-2-material-1"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend2[0]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-2-count-1"
                  name="ascend-2-count-1"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend2[0]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-2-material-2"
                  name="ascend-2-material-2"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend2[1]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-2-count-2"
                  name="ascend-2-count-2"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend2[1]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-2-material-3"
                  name="ascend-2-material-3"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend2[2]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-2-count-3"
                  name="ascend-2-count-3"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend2[2]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-2-material-4"
                  name="ascend-2-material-4"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend2[3]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-2-count-4"
                  name="ascend-2-count-4"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend2[3]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-2-material-5"
                  name="ascend-2-material-5"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend2[4]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-2-count-5"
                  name="ascend-2-count-5"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend2[4]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <h2 className="text-white font-semibold font-poppins">
                Ascend 3
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  forId="ascend-3-material-1"
                  name="ascend-3-material-1"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend3[0]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-3-count-1"
                  name="ascend-3-count-1"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend3[0]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-3-material-2"
                  name="ascend-3-material-2"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend3[1]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-3-count-2"
                  name="ascend-3-count-2"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend3[1]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-3-material-3"
                  name="ascend-3-material-3"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend3[2]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-3-count-3"
                  name="ascend-3-count-3"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend3[2]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-3-material-4"
                  name="ascend-3-material-4"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend3[3]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-3-count-4"
                  name="ascend-3-count-4"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend3[3]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-3-material-5"
                  name="ascend-3-material-5"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend3[4]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-3-count-5"
                  name="ascend-3-count-5"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend3[4]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <h2 className="text-white font-semibold font-poppins">
                Ascend 4
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  forId="ascend-4-material-1"
                  name="ascend-4-material-1"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend4[0]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-4-count-1"
                  name="ascend-4-count-1"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend4[0]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-4-material-2"
                  name="ascend-4-material-2"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend4[1]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-4-count-2"
                  name="ascend-4-count-2"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend4[1]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-4-material-3"
                  name="ascend-4-material-3"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend4[2]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-4-count-3"
                  name="ascend-4-count-3"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend4[2]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-4-material-4"
                  name="ascend-4-material-4"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend4[3]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-4-count-4"
                  name="ascend-4-count-4"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend4[3]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-4-material-5"
                  name="ascend-4-material-5"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend4[4]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-4-count-5"
                  name="ascend-4-count-5"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend4[4]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <h2 className="text-white font-semibold font-poppins">
                Ascend 5
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  forId="ascend-5-material-1"
                  name="ascend-5-material-1"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend5[0]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-5-count-1"
                  name="ascend-5-count-1"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend5[0]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-5-material-2"
                  name="ascend-5-material-2"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend5[1]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-5-count-2"
                  name="ascend-5-count-2"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend5[1]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-5-material-3"
                  name="ascend-5-material-3"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend5[2]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-5-count-3"
                  name="ascend-5-count-3"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend5[2]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-5-material-4"
                  name="ascend-5-material-4"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend5[3]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-5-count-4"
                  name="ascend-5-count-4"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend5[3]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-5-material-5"
                  name="ascend-5-material-5"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend5[4]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-5-count-5"
                  name="ascend-5-count-5"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend5[4]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <h2 className="text-white font-semibold font-poppins">
                Ascend 6
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  forId="ascend-6-material-1"
                  name="ascend-6-material-1"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend6[0]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-6-count-1"
                  name="ascend-6-count-1"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend6[0]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-6-material-2"
                  name="ascend-6-material-2"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend6[1]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-6-count-2"
                  name="ascend-6-count-2"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend6[1]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-6-material-3"
                  name="ascend-6-material-3"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend6[2]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-6-count-3"
                  name="ascend-6-count-3"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend6[2]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-6-material-4"
                  name="ascend-6-material-4"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend6[3]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-6-count-4"
                  name="ascend-6-count-4"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend6[3]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-6-material-5"
                  name="ascend-6-material-5"
                  labelMarginY="0"
                  label="Material"
                  defaultValue={character?.costs?.ascend6[4]?.name}
                  variant={VariantClass.dashboard}
                ></Input>
                <Input
                  forId="ascend-6-count-5"
                  name="ascend-6-count-5"
                  labelMarginY="0"
                  label="Count"
                  defaultValue={character?.costs?.ascend6[4]?.count}
                  type="number"
                  variant={VariantClass.dashboard}
                ></Input>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="border-2 border-white rounded-lg p-4 my-4">
        <h1 className="text-white font-semibold font-poppins text-center">
          Character Voice
        </h1>
        <Input
          forId="character-voice-chinese"
          name="character-voice-chinese"
          value={character?.cv?.chinese}
          onChange={(e) =>
            setCharacter({
              ...character,
              cv: { ...character?.cv, chinese: e.target.value },
            })
          }
          variant={VariantClass.dashboard}
          disabled={isLoading}
          label="Chinese"
        />

        <Input
          forId="character-voice-english"
          name="character-voice-english"
          value={character?.cv?.english}
          onChange={(e) =>
            setCharacter({
              ...character,
              cv: { ...character?.cv, english: e.target.value },
            })
          }
          variant={VariantClass.dashboard}
          disabled={isLoading}
          label="English"
        />

        <Input
          forId="character-voice-japanese"
          name="character-voice-japanese"
          value={character?.cv?.japanese}
          onChange={(e) =>
            setCharacter({
              ...character,
              cv: { ...character?.cv, japanese: e.target.value },
            })
          }
          variant={VariantClass.dashboard}
          disabled={isLoading}
          label="Japanese"
        />

        <Input
          forId="character-voice-korean"
          name="character-voice-korean"
          value={character?.cv?.korean}
          onChange={(e) =>
            setCharacter({
              ...character,
              cv: { ...character?.cv, korean: e.target.value },
            })
          }
          variant={VariantClass.dashboard}
          disabled={isLoading}
          label="Korean"
        />
      </div>

      <Input
        forId="character-rarity"
        name="rarity"
        type="number"
        value={character.rarity}
        onChange={(e) =>
          setCharacter({ ...character, rarity: Number(e.target.value) })
        }
        variant={VariantClass.dashboard}
        disabled={isLoading}
        label="Character Rarity"
      />

      <Input
        forId="character-element"
        name="element"
        type="text"
        value={character.elementText}
        onChange={(e) =>
          setCharacter({ ...character, elementText: e.target.value })
        }
        variant={VariantClass.dashboard}
        disabled={isLoading}
        label="Character Element"
      />

      <Input
        forId="character-weapon-type"
        name="weapon"
        type="text"
        value={character.weaponText}
        onChange={(e) =>
          setCharacter({ ...character, weaponText: e.target.value })
        }
        variant={VariantClass.dashboard}
        disabled={isLoading}
        label="Character Weapon"
      />

      <Input
        forId="character-gender"
        name="gender"
        type="text"
        value={character.gender}
        onChange={(e) => setCharacter({ ...character, gender: e.target.value })}
        variant={VariantClass.dashboard}
        disabled={isLoading}
        label="Character Gender"
      />

      <Input
        forId="character-region"
        name="region"
        type="text"
        value={character.region}
        onChange={(e) => setCharacter({ ...character, region: e.target.value })}
        variant={VariantClass.dashboard}
        disabled={isLoading}
        label="Character Region"
      />

      {character?.images?.cover1 && (
        <div className="relative">
          <p className="font-bold text-white font-poppins">Image from API</p>
          <Image
            src={character.images.cover1}
            alt={character.images.filenameIcon}
            width={500}
            height={500}
            className="w-auto h-auto block mx-auto"
          />

          <p className="font-poppins font-semibold text-white my-2">
            Jika ingin menggunakan gambar dari API, download dulu gambarnya lalu
            upload kembali di bawah.
          </p>
        </div>
      )}

      <ImageInput
        changeHandler={(e) => changeHandler(e, setFileName, setPreviewLink)}
        fileName={fileName}
        previewLink={previewLink}
      />

      <Button id="character-button-submit" className={ButtonStyle.submit}>
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
