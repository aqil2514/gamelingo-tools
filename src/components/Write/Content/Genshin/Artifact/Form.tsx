import React from "react";
import { SubmitConfig_GI, submitFormHandler } from "../genshinUtils";
import { Input, VariantClass } from "@/components/general/Input";
import Button, { VariantClass as ButtonClass } from "@/components/general/Button";
import { FetchApi } from "../genshinComponents";
import Textarea, { TextareaStyle } from "@/components/general/Textarea";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import SwiperSlideData from "./SwiperSlideData";
import { useArtifactContext } from "@/components/Providers/Game/GenshinImpact/ArtifactProvider";
import Loading from "@/components/general/Loading";

interface ArtifactContentFormProps {
  template: "Write" | "Edit";
  data?: GenshinImpact.Artifact;
  isDisabled?: boolean;
  submitHandler?: React.FormEventHandler<HTMLFormElement>;
}

export default function ArtifactContentForm({ template, data, isDisabled }: ArtifactContentFormProps) {
  if (template === "Write") return <WriteContent />;
  else if (template === "Edit") return <EditContent data={data} isDisabled={isDisabled} />;
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

function EditContent({ data, isDisabled, submitHandler }: Omit<ArtifactContentFormProps, "template">) {
  if (!data || !submitHandler || Object.keys(data).length === 0) return <Loading loading={1} textOn text="Mengambil data Artifact..." />;

  return (
    <form onSubmit={submitHandler}>
      <input type="hidden" value={data._id} name="uid" />

      <Input forId="name" value={data._id} disabled variant={VariantClass.dashboard} label="UID" />

      <Input forId="name" value={data.name} disabled={isDisabled} required name="name" variant={VariantClass.dashboard} label="Artifact Name" />

      <Textarea forId="effect2Pc" value={data.effect2pc} className={TextareaStyle.variant_1} name="effect2Pc" label="2 Set Effect" />

      <Textarea forId="effect4Pc" value={data.effect4pc} className={TextareaStyle.variant_1} name="effect4Pc" label="4 Set Effect" />

      {data.effectOther && <Textarea forId="effect-other" value={data.effectOther} className={TextareaStyle.variant_1} name="effect-other" label="Other Effect" />}

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
    </form>
  );
}