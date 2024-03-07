// <<<<< React Import >>>>>
import { useEffect, useState } from "react";

// <<<<< Next Import >>>>>
import { Route } from "next";

// <<<<< Axios Import >>>>>
import axios from "axios";

// <<<<< Components Import >>>>>
import { dateOptions } from "@/components/Admin/ContextMenu/config";
import { useMenuContextData } from "@/components/Providers/Admin/ContextProvider";
import Button, { VariantClass } from "@/components/Input/Button";
import Loading from "@/components/general/Loading";
import DisplayImage from "@/components/DataDisplay/Image";

export default function GIConstellationsDetail() {
  const [data, setData] = useState<GenshinImpact.Constellation>({} as GenshinImpact.Constellation);
  const { contextMenu, setDetailMenu } = useMenuContextData();

  const id = contextMenu.target?.getAttribute("data-id");
  const lang = contextMenu.target?.getAttribute("data-lang");

  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/gamelingo/genshin-impact?_id=${id}&category=Constellations&lang=${lang}`;
      axios(url).then((res) => setData(res.data.data));
    }
  }, [contextMenu, id, lang]);

  return (
    <div className="w-1/2 max-h-[450px] overflow-y-scroll scrollbar-style absolute top-36 left-[35%] bg-zinc-700 rounded-xl border-2 border-white p-4">
      {Object.keys(data).length === 0 ? (
        <Loading loading={1} textOn text="Mengambil data Constellations..." />
      ) : (
        <>
          <div>
            <h1 className="font-mclaren text-white text-center font-bold ">{data.charName}</h1>
            <p className="font-mclaren text-white text-sm text-center font-bold mb-4">{typeof data.createdAt === "string" ? new Date(data.createdAt).toLocaleDateString("id-ID", dateOptions) : ""}</p>
          </div>
          {Object.keys(data.constellation)
            .filter((key) => key.startsWith("c"))
            .map((el) => {
              const obj = data.constellation[el as keyof GenshinImpact.Constellation["constellation"]];

              return (
                <div key={`el-${obj.name}`} className="my-4">
                  <DisplayImage template={"variant1"} src={obj.icon} alt={obj.name} />

                  <p className="font-poppins text-white my-2">
                    <strong className="font-bold">Constellation Name : </strong>
                    {obj.name}
                  </p>
                  <p className="fon t-poppins text-white my-2">
                    <strong className="font-bold">Constellation Description : </strong>
                    {obj.description}
                  </p>
                </div>
              );
            })}
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
