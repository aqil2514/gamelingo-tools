import { dateOptions } from "@/components/Admin/ContextMenu/config";
import DisplayImage from "@/components/DataDisplay/Image";
import { useMenuContextData } from "@/components/Providers/Admin/ContextProvider";
import Button from "@/components/Input/Button";
import Loading from "@/components/general/Loading";
import axios from "axios";
import { Route } from "next";
import { useEffect, useState } from "react";

// <<<<< Swiper JS >>>>>
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import TableMapping from "@/components/Content/Write/Genshin/Talent/Table";
import SwiperSlideData from "@/components/Content/Write/Genshin/Components/SwiperSlideData";

export default function GITalentDetail() {
  const [data, setData] = useState<GenshinImpact.Talent>({} as GenshinImpact.Talent);
  const { contextMenu } = useMenuContextData();

  const id = contextMenu.target?.getAttribute("data-id");
  const lang = contextMenu.target?.getAttribute("data-lang");

  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/gamelingo/genshin-impact?_id=${id}&category=Talent&lang=${lang}`;
      axios(url).then((res) => setData(res.data.data));
    }
  }, [contextMenu, id, lang]);

  return (
    <div className="w-1/2 max-h-[450px] overflow-y-scroll scrollbar-style absolute top-36 left-[35%] bg-zinc-700 rounded-xl border-2 border-white p-4">
      {Object.keys(data).length === 0 ? (
        <Loading loading={1} textOn text="Mengambil data talent..." />
      ) : (
        <>
          <div>
            <h1 className="font-mclaren text-white text-center font-bold ">{data.charName}</h1>
            <p className="font-mclaren text-white text-sm text-center font-bold mb-4">{typeof data.createdAt === "string" ? new Date(data.createdAt).toLocaleDateString("id-ID", dateOptions) : ""}</p>
          </div>

          <Swiper slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
            <SwiperSlide>
              <TableMapping edit={data} template="Detail" index="combat1" />
            </SwiperSlide>
            <SwiperSlide>
              <TableMapping edit={data} template="Detail" index="combat2" />
            </SwiperSlide>
            <SwiperSlide>
              <TableMapping edit={data} template="Detail" index="combat3" />
            </SwiperSlide>
            {data.combats.combatsp && (
              <SwiperSlide>
                <TableMapping edit={data} template="Detail" index="combatsp" />
              </SwiperSlide>
            )}
          </Swiper>

          <div className="p-8 border border-white rounded-lg">
            <Swiper slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
              <SwiperSlide>
                <SwiperSlideData category="Talent" template="Detail" passData={data} keyValue="lvl2" />
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideData category="Talent" template="Detail" passData={data} keyValue="lvl3" />
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideData category="Talent" template="Detail" passData={data} keyValue="lvl4" />
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideData category="Talent" template="Detail" passData={data} keyValue="lvl5" />
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideData category="Talent" template="Detail" passData={data} keyValue="lvl6" />
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideData category="Talent" template="Detail" passData={data} keyValue="lvl7" />
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideData category="Talent" template="Detail" passData={data} keyValue="lvl8" />
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideData category="Talent" template="Detail" passData={data} keyValue="lvl9" />
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideData category="Talent" template="Detail" passData={data} keyValue="lvl10" />
              </SwiperSlide>
            </Swiper>
          </div>

          <Button template="detail-menu" withTemplate />
        </>
      )}
    </div>
  );
}
