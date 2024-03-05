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

import { useEffect, useState } from "react";
import Image from "next/image";
import { RefinementType, refinementData } from "@/components/Content/Write/Genshin/Weapon/Form";
import SwiperSlideData from "@/components/Content/Write/Genshin/Components/SwiperSlideData";

export default function GICharacterDetail() {
  const [data, setData] = useState<GenshinImpact.Character>({} as GenshinImpact.Character);
  const [refPrev, setRefPrev] = useState<RefinementType>("r1");
  const { contextMenu, setDetailMenu } = useMenuContextData();

  const id = contextMenu.target?.getAttribute("data-id");
  const lang = contextMenu.target?.getAttribute("data-lang");

  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/gamelingo/genshin-impact?_id=${id}&category=Weapon&lang=${lang}`;
      axios(url).then((res) => setData(res.data.data));
    }
  }, [contextMenu, id, lang]);

  return (
    <div className="w-1/2 max-h-[450px] overflow-y-scroll scrollbar-style absolute top-36 left-[35%] bg-zinc-700 rounded-xl border-2 border-white p-4">
      {Object.keys(data).length === 0 ? (
        <Loading loading={1} textOn text="Mengambil data Weapon..." />
      ) : (
        <>
          <div>
            <h1 className="font-mclaren text-white text-center font-bold ">{data.name}</h1>
            <p className="font-mclaren text-white text-sm text-center font-bold mb-4">{typeof data.createdAt === "string" ? new Date(data.createdAt).toLocaleDateString("id-ID", dateOptions) : ""}</p>
          </div>

          <p className="font-poppins text-white">
            <strong className="font-bold">Name : </strong>
            {data.name}
          </p>

          <p className="font-poppins text-white">
            <strong className="font-bold">Description : </strong>
            {data.description}
          </p>

          <p className="font-poppins text-white">
            <strong className="font-bold">Ascend Status : </strong>
            {data.ascendStatus}
          </p>

          <div className="p-8 border border-white rounded-lg">
            <Swiper slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
              <SwiperSlide>
                <SwiperSlideData template="Detail" passData={data} keyValue="ascend1" />
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideData template="Detail" passData={data} keyValue="ascend2" />
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideData template="Detail" passData={data} keyValue="ascend3" />
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideData template="Detail" passData={data} keyValue="ascend4" />
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideData template="Detail" passData={data} keyValue="ascend5" />
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideData template="Detail" passData={data} keyValue="ascend6" />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="border-2 border-white rounded-lg p-4 my-4">
            <h3 className="text-white font-semibold font-poppins text-center">Character Voice</h3>
            <p className="font-poppins text-white">
              <strong className="font-bold">Chinese : </strong>
              {data.cv.chinese}
            </p>

            <p className="font-poppins text-white">
              <strong className="font-bold">English : </strong>
              {data.cv.english}
            </p>

            <p className="font-poppins text-white">
              <strong className="font-bold">Japanese : </strong>
              {data.cv.japanese}
            </p>

            <p className="font-poppins text-white">
              <strong className="font-bold">Korean : </strong>
              {data.cv.korean}
            </p>
          </div>

          <p className="font-poppins text-white">
            <strong className="font-bold">Rarity : </strong>
            {data.rarity}
          </p>

          <p className="font-poppins text-white">
            <br />
            <strong className="font-bold">Element : </strong>
            {data.element}
          </p>

          <p className="font-poppins text-white">
            <br />
            <strong className="font-bold">Weapon Type : </strong>
            {data.weapon}
          </p>

          <p className="font-poppins text-white">
            <br />
            <strong className="font-bold">Gender : </strong>
            {data.gender}
          </p>

          <p className="font-poppins text-white">
            <br />
            <strong className="font-bold">Region : </strong>
            {data.region}
          </p>

          <div className="grid grid-cols-2 border-4 border-double border-white rounded-lg my-4 px-4 gap-4">
            <div className="relative w-full p-4">
              {data.image ? <Image fill sizes="auto" src={data.image} alt={data.name + " Image"} /> : <div className="border border-dashed border-white rounded-lg font-bold text-center">No Image</div>}
            </div>
          </div>

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
