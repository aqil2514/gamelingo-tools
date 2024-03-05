import { useCharacterContext } from "@/components/Providers/Game/GenshinImpact/CharacterProvider";
import { FetchApi } from "../genshinComponents";
import { SubmitConfig_GI, submitFormHandler } from "../genshinUtils";
import { Input, VariantClass } from "@/components/general/Input";

// <<<<< Swiperjs Library >>>>>
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import SwiperSlideData from "../Components/SwiperSlideData";
import Image from "next/image";
import ImageInput, { changeHandler } from "@/components/general/ImageInput";
import Button, { VariantClass as ButtonClass } from "@/components/general/Button";

interface CharacterContentFormProps {
  template: "Write" | "Edit";
}

export default function GICharacterContentForm({ template }: CharacterContentFormProps) {
  if (template === "Write") return <WriteContent />;
  //TODO:Fix thix later
  else if (template === "Edit") return <WriteContent />;
}

function WriteContent() {
  const { character, setCharacter, isLoading, setIsLoading, fileName, setFileName, previewLink, setPreviewLink, moveLocation, setMoveLocation } = useCharacterContext();
  const characterExists = Object.keys(character).length !== 0 && character.costs;

  const submitConfig: SubmitConfig_GI = {
    url: "/api/post",
    setIsLoading: setIsLoading,
    game: "Genshin Impact",
    category: "Character",
    ref: "artifact-button-submit",
    callbackUrl: "/admin/data?field=genshin-impact&subfield=Character",
    moveLocation,
  };

  return (
    <form onSubmit={(e) => submitFormHandler(e, submitConfig)} className="my-4">
      <FetchApi elementId="character-name" msgNoInput="Belum ada input data" msgNoData="Tidak ada karakter yang dimaksud" refElement="character-name" setData={setCharacter} query="characters" />

      <Input forId="character-name" name="name" value={character.name} onChange={(e) => setCharacter({ ...character, name: e.target.value })} variant={VariantClass.dashboard} disabled={isLoading} label="Character Name" />

      <Input
        forId="character-description"
        name="description"
        value={character.description}
        onChange={(e) => setCharacter({ ...character, description: e.target.value })}
        variant={VariantClass.dashboard}
        disabled={isLoading}
        label="Character Description"
      />

      <Input
        forId="character-ascend-status"
        name="ascendStatus"
        value={character.substatText}
        onChange={(e) => setCharacter({ ...character, substatText: e.target.value })}
        variant={VariantClass.dashboard}
        disabled={isLoading}
        label="Character Ascend Status"
      />

      <div className="border-2 border-white rounded-lg p-4 my-4">
        <h1 className="text-white font-semibold font-poppins text-center">Material Ascend</h1>

        <div className="my-2">
          {characterExists ? (
            <Swiper slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
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
            <p className="text-white font-semibold font-poppins text-center">Belum pilih data</p>
          )}
        </div>
      </div>

      <div className="border-2 border-white rounded-lg p-4 my-4">
        <h1 className="text-white font-semibold font-poppins text-center">Character Voice</h1>
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
        onChange={(e) => setCharacter({ ...character, rarity: Number(e.target.value) })}
        variant={VariantClass.dashboard}
        disabled={isLoading}
        label="Character Rarity"
      />

      <Input
        forId="character-element"
        name="element"
        type="text"
        value={character.elementText}
        onChange={(e) => setCharacter({ ...character, elementText: e.target.value })}
        variant={VariantClass.dashboard}
        disabled={isLoading}
        label="Character Element"
      />

      <Input
        forId="character-weapon-type"
        name="weapon"
        type="text"
        value={character.weaponText}
        onChange={(e) => setCharacter({ ...character, weaponText: e.target.value })}
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
          <Image src={character.images.cover1} alt={character.images.filenameIcon} width={500} height={500} className="w-auto h-auto block mx-auto" />

          <p className="font-poppins font-semibold text-white my-2">Jika ingin menggunakan gambar dari API, download dulu gambarnya lalu upload kembali di bawah.</p>
        </div>
      )}

      <ImageInput changeHandler={(e) => changeHandler(e, setFileName, setPreviewLink)} setFileName={setFileName} setPreviewLink={setPreviewLink} fileName={fileName} previewLink={previewLink} />

      <div className="flex gap-4" id="character-button-submit">
        <Button className={ButtonClass.submit}>{isLoading ? "Submitting..." : "Submit"}</Button>
        <label htmlFor="move-location" className="text-white font-bold font-poppins my-auto">
          <input type="checkbox" id="move-location" className="mx-2" checked={moveLocation} onChange={() => setMoveLocation(!moveLocation)} />
          Lihat Data setelah selesai ditambah
        </label>
      </div>
    </form>
  );
}
