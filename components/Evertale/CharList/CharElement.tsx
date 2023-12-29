import { imageLoader } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import "./scrollbar.css";

type CharState = {
  id: string;
  charName: string;
  image: string;
};

const CharElement = ({ elementData, elementTitle }: any) => {
  return (
    <div className="px-0">
      <h1 className="text-base lg:text-2xl text-start font-bold font-merienda text-white mt-4">
        <span className="capitalize">{elementTitle}</span> Element
      </h1>
      <div className="flex flex-row justify-start overflow-x-scroll flex-nowrap w-full scrollbar-style">
        {elementData.map((char: CharState) => (
          <figure key={char?.id} className="mx-4 my-4 flex flex-col justify-between content-between bg-slate-800 min-w-[240px] max-w-[240px] min-h-[350px] px-4 py-4 rounded-xl">
            <Image loader={imageLoader} src={char?.image} width={240} height={240} alt={char?.charName} className="rounded-xl h-[312px] object-cover" />
            <figcaption className="text-white font-poppins text-center text-sm mt-4">{char?.charName}</figcaption>
            <Link href={`/evertale/chars/${char?.id}`} className="my-4">
              <button className="block mx-auto px-2 py-2 bg-lime-700 rounded-xl text-white font-poppins text-sm">Lihat Character</button>
            </Link>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default CharElement;
