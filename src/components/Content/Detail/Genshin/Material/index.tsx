import { dateOptions } from "@/components/Admin/ContextMenu/config";
import { useMenuContextData } from "@/components/Providers/Admin/ContextProvider";
import Button, { VariantClass } from "@/components/general/Button";
import Loading from "@/components/general/Loading";
import axios from "axios";
import { Route } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GIMaterialDetail() {
  const [data, setData] = useState<GenshinImpact.Material>({} as GenshinImpact.Material);
  const { contextMenu, setDetailMenu } = useMenuContextData();

  const id = contextMenu.target?.getAttribute("data-id");
  const lang = contextMenu.target?.getAttribute("data-lang");

  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/gamelingo/genshin-impact?_id=${id}&category=Material&lang=${lang}`;
      axios(url).then((res) => setData(res.data.data));
    }
  }, [contextMenu, id, lang]);

  return (
    <div className="w-1/2 max-h-[450px] overflow-y-scroll scrollbar-style absolute top-36 left-[35%] bg-zinc-700 rounded-xl border-2 border-white p-4">
      {Object.keys(data).length === 0 ? (
        <Loading loading={1} textOn text="Mengambil data material..." />
      ) : (
        <>
          <div>
            <h1 className="font-mclaren text-white text-center font-bold ">{data.name}</h1>
            <p className="font-mclaren text-white text-sm text-center font-bold mb-4">{typeof data.createdAt === "string" ? new Date(data.createdAt).toLocaleDateString("id-ID", dateOptions) : ""}</p>
          </div>
          <div className="relative m-auto border border-dashed group border-white rounded-md min-h-[128px] min-w-[128px] max-h-[210px] max-w-[210px] flex justify-center items-center transition duration-200 cursor-pointer hover:border-zinc-500 overflow-hidden">
            {data.image ? (
              <Image src={data.image} fill sizes="auto" alt={data.name + " Image"} className="w-auto group-hover:scale-125 transition duration-500" />
            ) : (
              <span className="transition duration-200 group-hover:text-zinc-500 text-white font-bold"> No Image</span>
            )}
          </div>
          <p className="font-poppins text-white">
            <strong className="font-bold">Material Name : </strong>
            {data.name}
          </p>
          <p className="font-poppins text-white">
            <strong className="font-bold">Material Type : </strong>
            {data.typeMaterial}
          </p>
          <p className="font-poppins text-white">
            <strong className="font-bold">Rarity : </strong>
            {data.rarity ? data.rarity : "1"}
          </p>
          <div>
            <strong className="font-bold text-white font-poppins">Lore : </strong>
            <p className="font-poppins text-white">{data.lore}</p>
          </div>
          <p className="font-poppins text-white">
            <strong className="font-bold">Gained From : </strong>
            {typeof data.gainedFrom === "object" ? data.gainedFrom.join(", ") : data.gainedFrom}
          </p>
          <div id="buttons" className="flex justify-center gap-4">
            <Button type="button" className={VariantClass.danger} onClick={() => setDetailMenu(false)}>
              Kembali
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
