// <<<<< React Import >>>>>
import React, { useEffect, useState } from "react";

// <<<<< Next Import >>>>>
import { Route } from "next";

// <<<<< Local Utils Import >>>>>
import { SubmitConfig_GI, submitFormHandler } from "../genshinUtils";

// <<<<< Local Component Import >>>>>
import { FetchApi } from "../genshinComponents";
import TableMapping from "./Table";
import PassiveTalent from "./Passive";
import UpgradeCost from "./Cost";

// <<<<< Axios Import >>>>>
import axios, { isAxiosError } from "axios";

// <<<<< General Component Import >>>>>
import { Input, VariantClass } from "@/components/general/Input";
import Button, { VariantClass as ButtonStyle } from "@/components/Input/Button";
import { PreviewLinksState } from "@/components/Providers/Game/GenshinImpact/ConstellationsProvider";
import { useMenuContextData } from "@/components/Providers/Admin/ContextProvider";
import { getDate } from "@/components/Admin/ContextMenu/utils";
import { notif } from "@/utils/fe";
import Loading from "@/components/general/Loading";
import { EditContextButton } from "@/components/Admin/ContextMenu/EditMenu";
import { useTalentContext } from "@/components/Providers/Game/GenshinImpact/TalentProvider";

// <<<<< Swiper JS >>>>>
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

//TODO: Edit this

export default function GITalentContentForm({ template }: { template: General.ContentTemplate }) {
  if (template === "Write") return <WriteContent />;
  else if (template === "Edit") return <EditContent />;
}

function WriteContent() {
  const { isLoading, setIsLoading, talent, setTalent, moveLocation, setMoveLocation } = useTalentContext();

  const dataExist = Object.keys(talent).length !== 0 && talent.combat1;
  const submitConfig: SubmitConfig_GI = {
    url: "/api/post",
    setIsLoading: setIsLoading,
    game: "Genshin Impact",
    category: "Talent",
    ref: "artifact-button-submit",
    callbackUrl: "/admin/data?field=genshin-impact&subfield=Talent&lang=English",
  };

  return (
    <form onSubmit={(e) => submitFormHandler(e, submitConfig)} className="my-4">
      <FetchApi elementId="character-name" msgNoData="Tidak ada karakter yang dimaksud" msgNoInput="Nama karakter belum diisi" refElement="character-name" query="talents" setData={setTalent} />

      <Input forId="character-name" name="character-name" label="Character Name" variant={VariantClass.dashboard} value={talent?.name} onChange={(e) => setTalent({ ...talent, name: e.target.value })} />

      <div className="border-2 border-white rounded-lg p-4 my-4">
        {dataExist ? (
          <>
            <h1 className="text-white font-semibold font-poppins text-center">Talent</h1>
            <Swiper slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
              <SwiperSlide>
                <TableMapping template="Write" data={talent} setData={setTalent} index="combat1" />
              </SwiperSlide>

              <SwiperSlide>
                <TableMapping template="Write" data={talent} setData={setTalent} index="combat2" />
              </SwiperSlide>

              <SwiperSlide>
                <TableMapping template="Write" data={talent} setData={setTalent} index="combat3" />
              </SwiperSlide>

              {talent?.combatsp && (
                <SwiperSlide>
                  <TableMapping template="Write" data={talent} setData={setTalent} index="combatsp" />
                </SwiperSlide>
              )}

              <SwiperSlide>
                <PassiveTalent template="Write" talent={talent} setTalent={setTalent} index="passive1" />
              </SwiperSlide>

              <SwiperSlide>
                <PassiveTalent template="Write" talent={talent} setTalent={setTalent} index="passive2" />
              </SwiperSlide>

              <SwiperSlide>
                <PassiveTalent template="Write" talent={talent} setTalent={setTalent} index="passive3" />
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

      <div className="flex gap-4" id="talent-button-submit">
        <Button className={ButtonStyle.submit}>{isLoading ? "Submitting..." : "Submit"}</Button>
        <label htmlFor="move-location" className="text-white font-bold font-poppins my-auto">
          <input type="checkbox" id="move-location" className="mx-2" checked={moveLocation} onChange={() => setMoveLocation(!moveLocation)} />
          Lihat Data setelah selesai ditambah
        </label>
      </div>
    </form>
  );
}

function EditContent() {
  const [data, setData] = useState<GenshinImpact.Talent>({} as GenshinImpact.Talent);
  const [date, setDate] = useState<string>("");
  const { contextMenu, setIsLoading, setEditMenu, isLoading, searchParams } = useMenuContextData();
  const langParams = searchParams.get("lang");
  const lang = contextMenu.target?.getAttribute("data-lang");
  const id = contextMenu.target?.getAttribute("data-id");
  const [previewLinks, setPreviewLinks] = React.useState<PreviewLinksState>({} as PreviewLinksState);
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/gamelingo/genshin-impact?_id=${id}&category=Talent&lang=${lang}`;
      axios(url).then((res) => setData(res.data.data));
    }

    if (Object.keys(data).length !== 0) {
      const { year, month, day, hour, minutes } = getDate(data.createdAt as string);

      setDate(`${year}-${month}-${day}T${hour}:${minutes}`);
    }
  }, [contextMenu, data, id, lang]);

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const _id = formData.get("id") as string;

    try {
      setIsLoading(true);
      const res = await axios.putForm("/api/gamelingo/genshin-impact" as Route, formData, {
        headers: {
          "Data-Category": "Material",
          "Old-Id": _id,
          "Content-Lang": langParams,
        },
      });

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

  function deleteHandler(e: React.MouseEvent<HTMLParagraphElement>) {
    const target = e.target as HTMLParagraphElement;
    const previewLink = target.getAttribute("data-previewLink") as keyof PreviewLinksState;
    const input = target.nextSibling?.nextSibling as HTMLInputElement;

    if (input.files?.length !== 0) {
      input.value = "";
      setPreviewLinks({ ...previewLinks, [previewLink]: "" });
    }
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    const previewLink = target.getAttribute("data-previewLink");

    if (!previewLink) throw new Error("Data Preview link belum disematkan pada atribut html element");

    if (!target.files || (target.files && target.files.length === 0)) {
      target.value = "";
      setFileName("");
      setPreviewLinks({ ...previewLinks, [previewLink]: "" });

      return;
    }

    const image = target.files[0];
    const urlSrc = URL.createObjectURL(image);

    setFileName(image.name);
    setPreviewLinks({ ...previewLinks, [previewLink]: urlSrc });
  }

  const isDisabled = isLoading;
  return (
    <div className="w-1/2 max-h-[450px] overflow-y-scroll scrollbar-style absolute top-36 left-[35%] bg-zinc-700 rounded-xl border-2 border-white p-4">
      <h1 id="test" className="text-white text-center font-bold font-poppins">
        Edit Material
      </h1>
      {Object.keys(data).length === 0 ? (
        <Loading loading={1} textOn text="Mengambil data material..." />
      ) : (
        <form onSubmit={submitHandler} className="my-4">
          <Input forId="charName" name="charName" defaultValue={data.charName} label="Character Name" variant={VariantClass.dashboard} />

          <div className="border-2 border-white rounded-lg p-4 my-4">
            <h1 className="text-white font-semibold font-poppins text-center">Talent</h1>
            <Swiper slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
              <SwiperSlide>
                <TableMapping template="Edit" edit={data} index="combat1" />
              </SwiperSlide>

              <SwiperSlide>
                <TableMapping template="Edit" edit={data} index="combat2" />
              </SwiperSlide>

              <SwiperSlide>
                <TableMapping template="Edit" edit={data} index="combat3" />
              </SwiperSlide>

              {data.combats.combatsp && (
                <SwiperSlide>
                  <TableMapping template="Edit" edit={data} index="combatsp" />
                </SwiperSlide>
              )}

              <SwiperSlide>
                <PassiveTalent template="Edit" edit={data} index="passive1" />
              </SwiperSlide>

              <SwiperSlide>
                <PassiveTalent template="Edit" edit={data} index="passive2" />
              </SwiperSlide>

              <SwiperSlide>
                <PassiveTalent template="Edit" edit={data} index="passive3" />
              </SwiperSlide>
            </Swiper>
          </div>
          <EditContextButton />
        </form>
      )}
    </div>
  );
}
