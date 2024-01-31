import { imageLoader } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface GridState {
  data: General.Post[];
  title: string;
  path: string;
  sort: string;
}

const GridList = ({ data, title, path, sort }: GridState) => {
  let category: string = "";
  if (path === "chars") {
    category = "Character";
  } else if (path === "weapons") {
    category = "Weapon";
  }
  return (
    <div className="px-0">
      <h1 className="text-base lg:text-2xl text-start font-bold font-merienda text-white mt-4">
        <Link href={`/evertale/${path}/${sort}/${title}`}>
          <span className="capitalize">{title}</span> {category}
        </Link>
      </h1>
      <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 gap-2 content-center"}>
        {data.map((d) => (
          <figure key={d?.id} className="flex flex-col justify-between items-center relative content-between bg-slate-800 w-full h-96 px-4 py-4 rounded-xl">
            <div className="relative w-full h-3/5 md:h-4/5">
              <Image loader={imageLoader} src={d?.image} fill sizes="auto" alt={d?.name} className="rounded-xl aspect-square object-cover" />
            </div>
            <figcaption className="text-white font-poppins text-center text-sm mt-4 line-clamp-2">{d?.name}</figcaption>
            <Link href={`/evertale/${path}/${d?.id}`} className="my-4">
              <button className="block mx-auto px-2 py-2 bg-lime-700 rounded-xl text-white font-poppins text-xs md:text-base">Lihat {category}</button>
            </Link>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default GridList;
