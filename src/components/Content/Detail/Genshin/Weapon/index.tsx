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

export default function GIWeaponDetail() {
  const [data, setData] = useState<GenshinImpact.Weapon>({} as GenshinImpact.Weapon);
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

          <div className="grid grid-cols-2 border-4 border-double border-white rounded-lg my-4 px-4 gap-4">
            <div className="relative w-full p-4">
              {data.image ? <Image height={160} width={320} src={data.image} alt={data.name + " Image"} /> : <div className="border border-dashed border-white rounded-lg font-bold text-center">No Image</div>}
            </div>

            <div className="my-auto">
              <p className="font-poppins text-white">
                <strong className="font-bold">Base Atk : </strong>
                {data.baseAtk}
              </p>

              <p className="font-poppins text-white">
                <strong className="font-bold">Sub Status : </strong>
                {data.subStatus}
              </p>

              <p className="font-poppins text-white">
                <strong className="font-bold">Base Status : </strong>
                {data.baseStat}
              </p>
            </div>
          </div>

          <p className="font-poppins text-white">
            <strong className="font-bold">Rarity : </strong>
            {data.rarity}
          </p>

          <p className="font-poppins text-white">
            <strong className="font-bold">Type : </strong>
            {data.type}
          </p>

          <p className="font-poppins text-white">
            <strong className="font-bold">Description : </strong>
            <br />
            {data.lore}
          </p>

          

          <div className="border border-white rounded-xl p-4 my-4">
            <h3 className="text-center font-bold font-poppins text-white">Passive Weapon</h3>

            <p className="font-poppins text-white">
              <strong className="font-bold">Passive Name : </strong>
              {data.passive.passiveName}
            </p>

            <div className="flex gap-4 my-4 flex-wrap">
              {refinementData.map((ref) => (
                <>
                  <input type="radio" name="ref-data" checked={ref === refPrev} onChange={(e) => setRefPrev(e.target.value as RefinementType)} value={ref} id={`${ref}-text`} />
                  <label htmlFor={`${ref}-text`} className=" font-poppins text-white capitalize">{ref} Status</label>
                </>
              ))}

              <p className="font-poppins text-white">
                <strong className="font-bold capitalize">{refPrev} Description : </strong>
                <br />
                {data.passive[refPrev]}
              </p>
            </div>
          </div>

          <div className="p-8 border border-white rounded-lg">
            <Swiper slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
              <SwiperSlide>
                <SwiperSlideData category="Weapon" template="Detail" passData={data} keyValue="ascend1" />
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideData category="Weapon" template="Detail" passData={data} keyValue="ascend2" />
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideData category="Weapon" template="Detail" passData={data} keyValue="ascend3" />
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideData category="Weapon" template="Detail" passData={data} keyValue="ascend4" />
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideData category="Weapon" template="Detail" passData={data} keyValue="ascend5" />
              </SwiperSlide>
              <SwiperSlide>
                <SwiperSlideData category="Weapon" template="Detail" passData={data} keyValue="ascend6" />
              </SwiperSlide>
            </Swiper>
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
