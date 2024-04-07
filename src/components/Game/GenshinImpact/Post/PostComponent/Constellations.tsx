"use client";
import { fetcher } from "@/lib/Data";
import { Route } from "next";
import Image from "next/image";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function Constellations() {
  const category: General.AdminQueryGameGenshin["subfield"] = "Constellations";
  const lang: General.PostDocument["lang"] = "English";
  const { id } = useParams();
  const url: Route = `/api/gamelingo/genshin-impact/character?category=${category}&lang=${lang}&id=${id}`;
  const { data, isLoading, error } = useSWR(url, fetcher);

  if (!data || isLoading) return <Skeleton />;

  return <Default data={data.data.constellation} />;
}

function Skeleton() {
  return (
    <div className="w-3/4 bg-slate-900 min-h-100px  rounded-xl p-4 mx-auto my-2">
      <h3 className="text-white font-nova-square font-bold text-xl">
        Constellations
      </h3>
      {[...Array(6)].map((_, i: number) => (
        <div
          key={`test${i}`}
          className="text-zinc-800 rounded-xl p-4 my-2 flex gap-4"
        >
          <div className="w-[128px] h-[64px] bg-zinc-800 rounded-xl animate-pulse"></div>
          <p className="bg-zinc-800 animate-pulse rounded-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
            nesciunt libero ipsa facere voluptas laudantium odit quibusdam fugit
            itaque exercitationem.
          </p>
        </div>
      ))}
    </div>
  );
}

type CombatKey = keyof GenshinImpact.Constellation["constellation"];

const constName: CombatKey[] = ["c1", "c2", "c3", "c4", "c5", "c6"];

function Default({ data }: { data: GenshinImpact.Constellation }) {
  return (
    <div className="w-[95%] md:w-3/4 bg-slate-900 min-h-100px  rounded-xl p-4 mx-auto my-2">
      <h3 className="text-white font-merriweather underline font-bold text-xl">
        Constellationss
      </h3>
      {constName.map((c) => {
        const dataConst = data.constellation[c];
        if (dataConst?.description && dataConst.name)
          return (
            <div
              key={c}
              className="text-zinc-800 rounded-xl my-2 md:grid md:grid-cols-[100px_auto] md:gap-4"
            >
              <div className="relative w-[64px] h-[64px] block m-auto">
                <Image
                  src={"https://placehold.jp/64x64.png"}
                  alt={c}
                  fill
                  sizes="auto"
                  className="block mx-auto my-2"
                />
              </div>

              <div className="mt-4">
                <p className="text-white font-nova-square font-bold underline text-sm md:text-xl lg:text-2xl">
                  {dataConst.name}
                </p>
                <p className="text-white font-poppins text-xs md:text-lg lg:text-xl">
                  {dataConst.description}
                </p>
              </div>
            </div>
          );
      })}
    </div>
  );
}
