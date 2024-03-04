import { dateOptions } from "@/components/Admin/ContextMenu/config";
import { useMenuContextData } from "@/components/Providers/Admin/ContextProvider";
import Button, { VariantClass } from "@/components/general/Button";
import Loading from "@/components/general/Loading";
import axios from "axios";
import { Route } from "next";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import SubArtifact from "./SubArtifact";

import { useEffect, useState } from "react";

export default function GIArtifactDetail() {
  const [data, setData] = useState<GenshinImpact.Artifact>({} as GenshinImpact.Artifact);
  const { contextMenu, setDetailMenu } = useMenuContextData();

  const id = contextMenu.target?.getAttribute("data-id");
  const lang = contextMenu.target?.getAttribute("data-lang");

  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/gamelingo/genshin-impact?_id=${id}&category=Artifact&lang=${lang}`;
      axios(url).then((res) => setData(res.data.data));
    }
  }, [contextMenu, id, lang]);

  return (
    <div className="w-1/2 max-h-[450px] overflow-y-scroll scrollbar-style absolute top-36 left-[35%] bg-zinc-700 rounded-xl border-2 border-white p-4">
      {Object.keys(data).length === 0 ? (
        <Loading loading={1} textOn text="Mengambil data Artifact..." />
      ) : (
        <>
          <div>
            <h1 className="font-mclaren text-white text-center font-bold ">{data.name}</h1>
            <p className="font-mclaren text-white text-sm text-center font-bold mb-4">{typeof data.createdAt === "string" ? new Date(data.createdAt).toLocaleDateString("id-ID", dateOptions) : ""}</p>
          </div>

          <p className="font-poppins text-white">
            <strong className="font-bold">Artifact Name : </strong>
            {data.name}
          </p>
          <p className="font-poppins text-white">
            <strong className="font-bold">Artifact Rarity : </strong>
            {data.rarityList}
          </p>

          {/* Efek 2 Pcs, Efek 4 Pcs, Efek lain  */}
          <div className="grid grid-cols-3 p-4">
            <div>
              <p className="font-poppins text-white">
                <strong className="font-bold">Efek 2 Pcs : </strong>
                {data.effect2pc}
              </p>
            </div>
            <div>
              <p className="font-poppins text-white">
                <strong className="font-bold">Efek 4 Pcs : </strong>
                {data.effect4pc}
              </p>
            </div>
            {data.effectOther && (
              <div>
                <p className="font-poppins text-white">
                  <strong className="font-bold">Efek lain : </strong>
                  {data.effectOther}
                </p>
              </div>
            )}
          </div>

          <Swiper slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
            <SwiperSlide>
              <SubArtifact data={data} keyValue="flower" />
            </SwiperSlide>
            <SwiperSlide>
              <SubArtifact data={data} keyValue="plume" />
            </SwiperSlide>
            <SwiperSlide>
              <SubArtifact data={data} keyValue="sands" />
            </SwiperSlide>
            <SwiperSlide>
              <SubArtifact data={data} keyValue="goblet" />
            </SwiperSlide>
            <SwiperSlide>
              <SubArtifact data={data} keyValue="circlet" />
            </SwiperSlide>
          </Swiper>

          <div id="buttons" className="flex justify-center gap-4">
            <Button type="button" className={VariantClass.danger} onClick={() => setDetailMenu(false)}>
              Kembali
            </Button>
            <Button type="button" className={VariantClass.fetch} onClick={() => alert("Belum tersedia")}>
              Lihat Konten
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
