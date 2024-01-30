import { imageLoader } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type DataState = {
  id: string;
  name: string;
  image: string;
};

const EvertaleResult = ({ data, path, category }: { data: Record<string, any>; path: string; category: string }) => {
  if (category === "chars") category = "Character";
  else if (category === "weapons") category = "Weapon";

  if (data.length === 0) return <p className="font-poppins font-semibold text-base lg:text-2xl text-white text-center mt-4">Tidak ada data {category} yang dimaksud</p>;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-center">
      {data.map((d: DataState) => (
        <figure key={d?.id} className="flex flex-col justify-between items-center relative content-between bg-slate-800 w-full h-[450px] px-4 py-4 rounded-xl">
          <div className="relative w-full h-4/5">
            <Image loader={imageLoader} src={d?.image} fill sizes="auto" alt={d?.name} className="rounded-xl object-cover" />
          </div>
          <figcaption className="text-white font-poppins text-center text-sm mt-4">{d?.name}</figcaption>
          <Link href={`/evertale/${path}/${d?.id}`} className="my-4">
            <button className="block mx-auto px-2 py-2 bg-lime-700 rounded-xl text-white font-poppins text-sm">Lihat {category}</button>
          </Link>
        </figure>
      ))}
    </div>
  );
};

export default EvertaleResult;
