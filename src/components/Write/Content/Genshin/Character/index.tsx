import React from "react";
import { apiURL, submitFormHandler } from "../genshinUtils";
import Button, {
  VariantClass as ButtonStyle,
} from "@/components/general/Button";
import { Input, VariantClass } from "@/components/general/Input";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import ImageInput, { changeHandler } from "@/components/general/ImageInput";
import Image from "next/image";
import { FetchApi } from "../genshinComponents";
import SwiperSlideData from "./SwiperSlideData";

export default function CharacterForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [character, setCharacter] =
    React.useState<GenshinImpact.ApiResponseCharacter>(
      {} as GenshinImpact.ApiResponseCharacter
    );
  const [fileName, setFileName] = React.useState<string>("");
  const [previewLink, setPreviewLink] = React.useState<string>("");

  const characterExists =
    Object.keys(character).length !== 0 && character.costs;

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
      <FetchApi
        elementId="character-name"
        msgNoInput="Belum ada input data"
        msgNoData="Tidak ada karakter yang dimaksud"
        refElement="character-name"
        setData={setCharacter}
        query="characters"
      />

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
          {characterExists ? (
            <Swiper
              slidesPerView={1}
              modules={[Pagination]}
              pagination={{ clickable: true }}
            >
              <SwiperSlide>
                <SwiperSlideData character={character} keyValue="ascend1" />
              </SwiperSlide>

              <SwiperSlide>
                <SwiperSlideData character={character} keyValue="ascend2" />
              </SwiperSlide>

              <SwiperSlide>
                <SwiperSlideData character={character} keyValue="ascend3" />
              </SwiperSlide>

              <SwiperSlide>
                <SwiperSlideData character={character} keyValue="ascend4" />
              </SwiperSlide>

              <SwiperSlide>
                <SwiperSlideData character={character} keyValue="ascend5" />
              </SwiperSlide>

              <SwiperSlide>
                <SwiperSlideData character={character} keyValue="ascend6" />
              </SwiperSlide>
            </Swiper>
          ) : (
            <p className="text-white font-semibold font-poppins text-center">
              Belum pilih data
            </p>
          )}
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
