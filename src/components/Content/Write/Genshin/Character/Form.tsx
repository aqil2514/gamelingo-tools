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
// import ImageInput, { changeHandler as imageHandler } from "@/components/general/ImageInput";
import Button, { VariantClass as ButtonClass } from "@/components/Input/Button";
import { useEffect, useState } from "react";
import { useMenuContextData } from "@/components/Providers/Admin/ContextProvider";
import { Route } from "next";
import axios, { isAxiosError } from "axios";
import { notif } from "@/utils/fe";
import Loading from "@/components/general/Loading";
import Textarea, { TextareaStyle } from "@/components/Input/Textarea";
import { EditContextButton } from "@/components/Admin/ContextMenu/EditMenu";
import ImageInput from "@/components/general/ImageInput";

interface CharacterContentFormProps {
  template: "Write" | "Edit";
}

export default function GICharacterContentForm({
  template,
}: CharacterContentFormProps) {
  if (template === "Write") return <WriteContent />;
  else if (template === "Edit") return <EditContent />;
}

function WriteContent() {
  const {
    character,
    setCharacter,
    isLoading,
    setIsLoading,
    moveLocation,
    setMoveLocation,
  } = useCharacterContext();
  const characterExists =
    Object.keys(character).length !== 0 && character.costs;

  const submitConfig: SubmitConfig_GI = {
    url: "/api/post",
    setIsLoading: setIsLoading,
    game: "Genshin Impact",
    category: "Character",
    ref: "character-button-submit",
    callbackUrl:
      "/admin/data?field=genshin-impact&subfield=Character&lang=English",
    moveLocation,
  };

  function resetHandler() {
    const characterName = document.getElementById(
      "character-name"
    ) as HTMLInputElement;

    characterName.focus();
    setCharacter({} as GenshinImpact.ApiResponseCharacter);
  }

  return (
    <form onSubmit={(e) => submitFormHandler(e, submitConfig)} className="my-4">
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

      <Textarea
        forId="character-description"
        name="description"
        value={character.description}
        onChange={(e) =>
          setCharacter({ ...character, description: e.target.value })
        }
        disabled={isLoading}
        label="Character Description"
        className={TextareaStyle.variant_1}
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
                <SwiperSlideData
                  category="Character"
                  template="Write"
                  passData={character}
                  keyValue="ascend1"
                />
              </SwiperSlide>

              <SwiperSlide>
                <SwiperSlideData
                  category="Character"
                  template="Write"
                  passData={character}
                  keyValue="ascend2"
                />
              </SwiperSlide>

              <SwiperSlide>
                <SwiperSlideData
                  category="Character"
                  template="Write"
                  passData={character}
                  keyValue="ascend3"
                />
              </SwiperSlide>

              <SwiperSlide>
                <SwiperSlideData
                  category="Character"
                  template="Write"
                  passData={character}
                  keyValue="ascend4"
                />
              </SwiperSlide>

              <SwiperSlide>
                <SwiperSlideData
                  category="Character"
                  template="Write"
                  passData={character}
                  keyValue="ascend5"
                />
              </SwiperSlide>

              <SwiperSlide>
                <SwiperSlideData
                  category="Character"
                  template="Write"
                  passData={character}
                  keyValue="ascend6"
                />
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
        forId="character-character-type"
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
                Cover&rdquo;
              </li>
              <li className="list-disc text-sm">
                Contoh: &ldquo;Kamisato Ayaka - Cover&rdquo;
              </li>
              <li className="list-disc text-sm">
                Hanya format png dan webp saja yang diizinkan
              </li>
            </ul>
          </div>
          <ImageInput template="Character" />
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
                Portrait&rdquo;
              </li>
              <li className="list-disc text-sm">
                Contoh: &ldquo;Kamisato Ayaka - Portrait&rdquo;
              </li>
              <li className="list-disc text-sm">
                Hanya format png dan webp saja yang diizinkan
              </li>
            </ul>
          </div>
          <ImageInput template="Character" />
        </div>
      </div>

      <div className="flex gap-4" id="character-button-submit">
        <Button className={ButtonClass.submit} disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
        <Button
          className={ButtonClass.fetch}
          disabled={isLoading}
          type="button"
          onClick={resetHandler}
        >
          Tambah lagi
        </Button>
        <label
          htmlFor="move-location"
          className="text-white font-bold font-poppins my-auto"
        >
          <input
            type="checkbox"
            id="move-location"
            className="mx-2"
            checked={moveLocation}
            onChange={() => setMoveLocation(!moveLocation)}
          />
          Lihat Data setelah selesai ditambah
        </label>
      </div>
    </form>
  );
}

function EditContent() {
  const [data, setData] = useState<GenshinImpact.Character>(
    {} as GenshinImpact.Character
  );

  const { contextMenu, isLoading } = useMenuContextData();
  const lang = contextMenu.target?.getAttribute("data-lang");
  const id = contextMenu.target?.getAttribute("data-id");
  const [previewLink, setPreviewLink] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/gamelingo/genshin-impact?_id=${id}&category=Character&lang=${lang}`;
      axios(url).then((res) => {
        setData(res.data.data);
      });
    }
  }, [contextMenu, data, id, lang]);
  const { setIsLoading, setEditMenu, searchParams } = useMenuContextData();
  const langParams = searchParams.get("lang");

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const _id = formData.get("id") as string;

    try {
      setIsLoading(true);
      const res = await axios.putForm(
        "/api/gamelingo/genshin-impact" as Route,
        formData,
        {
          headers: {
            "Data-Category": "Character",
            "Old-Id": _id,
            "Content-Lang": langParams,
          },
        }
      );

      notif(res.data.msg, {
        color: "green",
        refElement: "buttons",
        location: "before",
      });

      setTimeout(() => {
        setEditMenu(false);
        window.location.reload();
      }, 3000);
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

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;

    if (!target.files || (target.files && target.files.length === 0)) {
      target.value = "";
      setFileName("");
      setPreviewLink("");

      return;
    }

    const image = target.files[0];
    const urlSrc = URL.createObjectURL(image);

    setFileName(image.name);
    setPreviewLink(urlSrc);
  }

  const isDisabled = isLoading;

  return (
    <div className="w-1/2 max-h-[450px] overflow-y-scroll scrollbar-style absolute top-36 left-[35%] bg-zinc-700 rounded-xl border-2 border-white p-4">
      <h1 id="test" className="text-white text-center font-bold font-poppins">
        Edit Character
      </h1>
      <form onSubmit={(e) => submitHandler(e)} method="post">
        {!data || Object.keys(data).length === 0 ? (
          <Loading loading={1} textOn text="Mengambil data Character..." />
        ) : (
          <>
            <input type="hidden" defaultValue={data._id} name="id" />

            <Input
              forId="UID"
              defaultValue={data._id}
              disabled
              variant={VariantClass.dashboard}
              label="UID"
            />

            <Input
              forId="name"
              defaultValue={data.name}
              disabled={isDisabled}
              required
              name="name"
              variant={VariantClass.dashboard}
              label="Character Name"
            />

            <div>
              <label
                className="relative m-auto border border-dashed group border-white rounded-md min-h-[128px] min-w-[128px] max-h-[210px] max-w-[210px] flex justify-center items-center transition duration-200 cursor-pointer hover:border-zinc-500 overflow-hidden"
                htmlFor="input-image"
              >
                <input
                  type="file"
                  name="image"
                  id="input-image"
                  className="hidden"
                  onChange={changeHandler}
                />
                {data.image ? (
                  <Image
                    src={data.image.cover}
                    fill
                    sizes="auto"
                    alt={data.name + " Image"}
                    className="w-auto group-hover:scale-125 transition duration-500"
                  />
                ) : fileName && previewLink ? (
                  <Image
                    src={previewLink}
                    width={64}
                    height={64}
                    alt={fileName + " Image"}
                    className="w-auto group-hover:scale-125 transition duration-500"
                  />
                ) : (
                  <span className="transition duration-200 group-hover:text-zinc-500 text-white font-bold">
                    {" "}
                    No Image
                  </span>
                )}
              </label>
            </div>

            <Textarea
              disabled={isLoading}
              forId="character-description"
              name="description"
              label="Description"
              defaultValue={data.description}
              className={TextareaStyle.variant_1}
            />

            <Input
              disabled={isLoading}
              forId="character-ascend-status"
              name="ascendStatus"
              label="Ascend Status"
              defaultValue={data.ascendStatus}
              variant={VariantClass.dashboard}
            />

            <div className="border-2 border-white rounded-lg p-4 my-4">
              <h1 className="text-white font-semibold font-poppins text-center">
                Material Ascend
              </h1>
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

            <div className="border-2 border-white rounded-lg p-4 my-4">
              <h1 className="text-white font-semibold font-poppins text-center">
                Character Voice
              </h1>
              <Input
                forId="character-voice-chinese"
                name="character-voice-chinese"
                defaultValue={data.cv.chinese}
                variant={VariantClass.dashboard}
                disabled={isLoading}
                label="Chinese"
              />

              <Input
                forId="character-voice-english"
                name="character-voice-english"
                defaultValue={data.cv.english}
                variant={VariantClass.dashboard}
                disabled={isLoading}
                label="English"
              />

              <Input
                forId="character-voice-japanese"
                name="character-voice-japanese"
                defaultValue={data.cv.japanese}
                variant={VariantClass.dashboard}
                disabled={isLoading}
                label="Japanese"
              />

              <Input
                forId="character-voice-korean"
                name="character-voice-korean"
                defaultValue={data.cv.korean}
                variant={VariantClass.dashboard}
                disabled={isLoading}
                label="Korean"
              />
            </div>

            <Input
              forId="character-rarity"
              name="rarity"
              type="number"
              defaultValue={data.rarity}
              variant={VariantClass.dashboard}
              disabled={isLoading}
              label="Character Rarity"
            />

            <Input
              forId="character-element"
              name="element"
              type="text"
              defaultValue={data.element}
              variant={VariantClass.dashboard}
              disabled={isLoading}
              label="Character Element"
            />

            <Input
              forId="character-character-type"
              name="weapon"
              type="text"
              defaultValue={data.weapon}
              variant={VariantClass.dashboard}
              disabled={isLoading}
              label="Character Weapon"
            />

            <Input
              forId="character-gender"
              name="gender"
              type="text"
              value={data.gender}
              variant={VariantClass.dashboard}
              disabled={isLoading}
              label="Character Gender"
            />

            <Input
              forId="character-region"
              name="region"
              type="text"
              value={data.region}
              variant={VariantClass.dashboard}
              disabled={isLoading}
              label="Character Region"
            />

            {data.image ? <></> : <ImageInput template="Character" />}
            <EditContextButton />
          </>
        )}
      </form>
    </div>
  );
}
