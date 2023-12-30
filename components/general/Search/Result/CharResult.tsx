import { imageLoader } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type CharState = {
  id: string;
  name: string;
  image: string;
};

const CharResult = ({ data }: any) => {
  if (data.length === 0) return <p className="font-poppins font-semibold text-base lg:text-2xl text-white text-center mt-4">Tidak ada data tentang yang dimaksud</p>;
  return (
    <div className="flex flex-col md:flex-row flex-wrap justify-center my-4 items-center">
      {data.map((char: CharState) => (
        <figure key={char?.id} className="flex flex-col m-4 justify-between items-center content-between bg-slate-800 w-[300px] h-[450px] px-4 py-4 rounded-xl">
          <Image loader={imageLoader} src={char?.image} width={240} height={240} alt={char?.name} className="rounded-xl h-[300px] object-cover" />
          <figcaption className="text-white font-poppins text-center text-sm mt-4">{char?.name}</figcaption>
          <Link href={`/evertale/chars/${char?.id}`} className="my-4">
            <button className="block mx-auto px-2 py-2 bg-lime-700 rounded-xl text-white font-poppins text-sm">Lihat Character</button>
          </Link>
        </figure>
      ))}
    </div>
  );
};

export default CharResult;
