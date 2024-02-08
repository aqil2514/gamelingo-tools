import { imageLoader } from "@/lib/utils";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronDoubleRight } from "react-bootstrap-icons";

interface ScrollState {
  data: General.Post[];
  title: string;
  path: string;
  sort: string;
}

const ScrollList = ({ data, title, path, sort }: ScrollState) => {
  let category: string;
  if (path === "chars") {
    category = "Character";
  } else if (path === "weapons") {
    category = "Weapon";
  }
  if (sort === "type") {
    sort = "weapon-type";
  }
  return (
    <div className="px-0">
      <h1 className="text-base lg:text-2xl text-start font-bold font-merienda text-white mt-4">
        <Link href={`/evertale/${path}/${sort}/${title.toLowerCase().replaceAll(" ", "-")}`as Route}>
          <span className="capitalize">{title}</span>
        </Link>
      </h1>
      <div className="flex flex-row justify-start overflow-x-scroll flex-nowrap w-full scrollbar-style">
        {data.map((d) => (
          <figure key={d?.id} className="mx-4 my-4 flex flex-col justify-between content-between bg-slate-800 min-w-[240px] max-w-[240px] min-h-[350px] px-4 py-4 rounded-xl">
            <Image loader={imageLoader} src={d?.image} width={240} height={240} alt={d?.name} className="rounded-xl aspect-square object-cover" />
            <figcaption className="text-white font-poppins text-center text-sm mt-4">{d?.name}</figcaption>
            <Link href={`/evertale/${path}/${d?.id}`as Route} className="my-4">
              <button className="block mx-auto px-2 py-2 bg-lime-700 rounded-xl text-white font-poppins text-sm">Lihat {category}</button>
            </Link>
          </figure>
        ))}
        {data.length > 8 && (
          <div className="min-h-[350px] flex flex-col flex-wrap justify-center content-center text-white font-merienda font-bold pr-2 text-base md:text-lg">
            <Link href={`/evertale/${path}/${sort}/${title.toLowerCase().replaceAll(" ", "-")}` as Route}>
              <div>
                <ChevronDoubleRight className="block mx-auto" />
                <span>More</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollList;
