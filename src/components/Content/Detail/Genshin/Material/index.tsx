import { dateOptions } from "@/components/Admin/ContextMenu/config";
import DisplayImage from "@/components/DataDisplay/Image";
import { useMenuContextData } from "@/components/Providers/Admin/ContextProvider";
import Button, { VariantClass } from "@/components/Input/Button";
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
          <DisplayImage template="variant1" src={data.image} alt={data.name} />
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

          <Button template="detail-menu" withTemplate />
        </>
      )}
    </div>
  );
}
