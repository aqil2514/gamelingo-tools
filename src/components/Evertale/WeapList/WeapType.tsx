import { imageLoader } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import "./scrollbar.css";
import { ChevronDoubleRight } from "react-bootstrap-icons";

type WeapState = {
  id: string;
  name: string;
  image: string;
};

const SCROLL_STYLE = "flex flex-row justify-start overflow-x-scroll flex-nowrap w-full scrollbar-style";
const GRID_STYLE = "grid grid-cols-1 mx-auto md:grid-cols-3 lg:grid-cols-4";

const WeapType = ({ weapons, weaponName, isGrid }: any) => {
  return (
    <div className="px-0">
      <h1 className="text-base lg:text-2xl text-start font-bold font-merienda text-white mt-4">
        <Link href={`/evertale/weapons/weapon-type/${weaponName.toLowerCase()}`}>
          <span className="capitalize">{weaponName}</span>
        </Link>
      </h1>
      <div className={isGrid ? GRID_STYLE : SCROLL_STYLE}>
        {weapons.map((weapon: WeapState) => (
          <figure key={weapon?.id} className="mx-4 my-4 flex flex-col justify-between content-between bg-slate-800 min-w-[240px] max-w-[240px] min-h-[350px] px-4 py-4 rounded-xl">
            <Image loader={imageLoader} src={weapon?.image} width={240} height={240} alt={weapon?.name} className="rounded-xl h-[312px] object-cover" />
            <figcaption className="text-white font-poppins text-center text-sm mt-4">{weapon?.name}</figcaption>
            <Link href={`/evertale/weapons/${weapon?.id}`} className="my-4">
              <button className="block mx-auto px-2 py-2 bg-lime-700 rounded-xl text-white font-poppins text-sm">Lihat Weapon</button>
            </Link>
          </figure>
        ))}
        {!isGrid && weapons.length > 8 && (
          <div className="min-h-[350px] flex flex-col flex-wrap justify-center content-center text-white font-merienda font-bold pr-2 text-base md:text-lg">
            <Link href={`/evertale/weapons/weapon-type/${weaponName.toLowerCase()}`}>
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

export default WeapType;
