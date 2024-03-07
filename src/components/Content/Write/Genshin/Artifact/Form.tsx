import React, { useEffect, useState } from "react";
import { SubmitConfig_GI, submitFormHandler } from "../genshinUtils";
import { Input, VariantClass } from "@/components/general/Input";
import Button, { VariantClass as ButtonClass } from "@/components/Input/Button";
import { FetchApi } from "../genshinComponents";
import Textarea, { TextareaStyle } from "@/components/general/Textarea";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import SwiperSlideData from "./SwiperSlideData";

import { useArtifactContext } from "@/components/Providers/Game/GenshinImpact/ArtifactProvider";
import Loading from "@/components/general/Loading";
import { EditContextButton } from "@/components/Admin/ContextMenu/EditMenu";
import axios, { isAxiosError } from "axios";
import { Route } from "next";
import { notif } from "@/utils/fe";
import { useMenuContextData } from "@/components/Providers/Admin/ContextProvider";

interface ArtifactContentFormProps {
  template: "Write" | "Edit";
}

export default function GIArtifactContentForm({ template }: ArtifactContentFormProps) {
  if (template === "Write") return <WriteContent />;
  else if (template === "Edit") return <EditContent />;
}

function WriteContent() {
  const { isLoading, setIsLoading, moveLocation, setMoveLocation, artifact, setArtifact } = useArtifactContext();

  const dataExist = artifact.rarityList;

  const submitConfig: SubmitConfig_GI = {
    url: "/api/post",
    setIsLoading: setIsLoading,
    game: "Genshin Impact",
    category: "Artifact",
    ref: "artifact-button-submit",
    callbackUrl: "/admin/data?field=genshin-impact&subfield=Artifact&lang=English",
    moveLocation,
  };

  return (
    <form onSubmit={(e) => submitFormHandler(e, submitConfig)} className="my-4">
      <FetchApi elementId="name" msgNoInput="Artifact belum diinput" msgNoData="Data Artifact tidak ada" refElement="name" query="artifacts" setData={setArtifact} />
      <Input forId="name" value={artifact?.name} onChange={(e) => setArtifact({ ...artifact, name: e.target.value })} required name="name" variant={VariantClass.dashboard} label="Artifact Name" />

      {dataExist ? (
        <>
          <Input
            forId="rarityList"
            value={(artifact.rarityList as string[]).join(", ")}
            onChange={(e) => setArtifact({ ...artifact, rarityList: e.target.value })}
            required
            name="rarityList"
            variant={VariantClass.dashboard}
            label="Rarity List"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Textarea forId="effect2Pc" value={artifact.effect2Pc} className={TextareaStyle.variant_1} onChange={(e) => setArtifact({ ...artifact, effect2Pc: e.target.value })} name="effect2Pc" label="2 Set Effect" />
            </div>

            <div>
              <Textarea forId="effect4Pc" value={artifact.effect4Pc} className={TextareaStyle.variant_1} onChange={(e) => setArtifact({ ...artifact, effect4Pc: e.target.value })} name="effect4Pc" label="4 Set Effect" />
            </div>
          </div>

          <div className="border-2 border-white rounded-lg px-4 py-12 my-4">
            <div className="my-4">
              <Swiper slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
                <SwiperSlide>
                  <SwiperSlideData template="Write" keyValue="flower" />
                </SwiperSlide>
                <SwiperSlide>
                  <SwiperSlideData template="Write" keyValue="plume" />
                </SwiperSlide>
                <SwiperSlide>
                  <SwiperSlideData template="Write" keyValue="sands" />
                </SwiperSlide>
                <SwiperSlide>
                  <SwiperSlideData template="Write" keyValue="goblet" />
                </SwiperSlide>
                <SwiperSlide>
                  <SwiperSlideData template="Write" keyValue="circlet" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <p className="text-white font-bold font-poppins">Pastikan nama Filenya menyesuaikan set artefaknya, misal flower, plume, dsb.</p>
        </>
      ) : (
        <p className="text-white font-bold font-poppins">No Data Selected</p>
      )}

      <div className="flex gap-4" id="artifact-button-submit">
        <Button className={ButtonClass.submit}>{isLoading ? "Submitting..." : "Submit"}</Button>
        <label htmlFor="move-location" className="text-white font-bold font-poppins my-auto">
          <input type="checkbox" id="move-location" className="mx-2" checked={moveLocation} onChange={() => setMoveLocation(!moveLocation)} />
          Lihat Data setelah selesai ditambah
        </label>
      </div>
    </form>
  );
}

function EditContent() {
  const [data, setData] = useState<GenshinImpact.Artifact>({} as GenshinImpact.Artifact);
  const { contextMenu, isLoading } = useMenuContextData();
  const lang = contextMenu.target?.getAttribute("data-lang");
  const id = contextMenu.target?.getAttribute("data-id");

  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/gamelingo/genshin-impact?_id=${id}&category=Artifact&lang=${lang}`;
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
      const res = await axios.putForm("/api/gamelingo/genshin-impact" as Route, formData, {
        headers: {
          "Data-Category": "Artifact",
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

  const isDisabled = isLoading;

  return (
    <div className="w-1/2 max-h-[450px] overflow-y-scroll scrollbar-style absolute top-36 left-[35%] bg-zinc-700 rounded-xl border-2 border-white p-4">
      <h1 id="test" className="text-white text-center font-bold font-poppins">
        Edit Artifact
      </h1>
      <form onSubmit={(e) => submitHandler(e)} method="post">
        {!data || Object.keys(data).length === 0 ? (
          <Loading loading={1} textOn text="Mengambil data Artifact..." />
        ) : (
          <>
            <input type="hidden" defaultValue={data._id} name="id" />

            <Input forId="UID" defaultValue={data._id} disabled variant={VariantClass.dashboard} label="UID" />

            <Input forId="name" defaultValue={data.name} disabled={isDisabled} required name="name" variant={VariantClass.dashboard} label="Artifact Name" />

            <Input forId="rarityList" defaultValue={data.rarityList.join(", ")} variant={VariantClass.dashboard} name="rarityList" label="Rarity List" />

            <Textarea forId="effect2Pc" defaultValue={data.effect2pc} className={TextareaStyle.variant_1} name="effect2Pc" label="2 Set Effect" />

            <Textarea forId="effect4Pc" defaultValue={data.effect4pc} className={TextareaStyle.variant_1} name="effect4Pc" label="4 Set Effect" />

            {data.effectOther && <Textarea forId="effect-other" defaultValue={data.effectOther} className={TextareaStyle.variant_1} name="effect-other" label="Other Effect" />}

            <div className="border-2 border-white rounded-lg px-4 py-12 my-4">
              <div className="my-4">
                <Swiper slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
                  <SwiperSlide>
                    <SwiperSlideData template="Edit" data={data} keyValue="flower" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperSlideData template="Edit" data={data} keyValue="plume" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperSlideData template="Edit" data={data} keyValue="sands" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperSlideData template="Edit" data={data} keyValue="goblet" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperSlideData template="Edit" data={data} keyValue="circlet" />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            <EditContextButton />
          </>
        )}
      </form>
    </div>
  );
}
