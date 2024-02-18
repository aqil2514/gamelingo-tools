import React from "react";
import { submitFormHandler } from "../genshinUtils";
import { Input, VariantClass } from "@/components/general/Input";
import Button, { VariantClass as ButtonClass } from "@/components/general/Button";
import ImageInput, { changeHandler } from "@/components/general/ImageInput";
import { FetchApi } from "../genshinComponents";
import Textarea, { TextareaStyle } from "@/components/general/Textarea";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import SwiperSlideData from "./SwiperSlideData";

export default function ArtifactForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [fileName, setFileName] = React.useState<string>("");
  const [previewLink, setPreviewLink] = React.useState<string>("");
  const [artifact, setArtifact] = React.useState<GenshinImpact.ApiResponseArtifacts>({} as GenshinImpact.ApiResponseArtifacts);

  const dataExist = artifact.rarityList;
  return (
    <>
      <form onSubmit={(e) => submitFormHandler(e, "/api/post", setIsLoading, "Genshin Impact", "Artifact", "artifact-button-submit")} className="my-4">
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

            <div className="border-2 border-white rounded-lg p-4 my-4">
              <div className="my-4">
                <Swiper slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
                  <SwiperSlide>
                    <SwiperSlideData data={artifact} setData={setArtifact} keyValue="flower" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperSlideData data={artifact} setData={setArtifact} keyValue="plume" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperSlideData data={artifact} setData={setArtifact} keyValue="sands" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperSlideData data={artifact} setData={setArtifact} keyValue="goblet" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SwiperSlideData data={artifact} setData={setArtifact} keyValue="circlet" />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </>
        ) : (
          <p className="text-white font-bold font-poppins">No Data Selected</p>
        )}

        <ImageInput changeHandler={(e) => changeHandler(e, setFileName, setPreviewLink)} fileName={fileName} previewLink={previewLink} />

        <Button className={ButtonClass.submit} id="artifact-button-submit">
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>

      <datalist id="artifact-type-list">
        <option value="Flower of Life" />
        <option value="Plume of Death" />
        <option value="Sands of Eon" />
        <option value="Goblet of Eonothem" />
        <option value="Circlet of Logos" />
      </datalist>
    </>
  );
}
