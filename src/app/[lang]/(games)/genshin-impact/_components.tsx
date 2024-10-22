/** HEADER SECTION */

import { decsription_GenshinImpact } from "@/lib/Data/gi";
import { downloadLink } from "./_data";
import { Link } from "@/navigation";
import Image from "next/image";
import { BodyProps } from "./_interface";

/** Header Section */

export function Header() {
  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('/Genshin-Impact/hero-section.webp')",
      }}
      className="mt-14 px-4 w-full h-[50vh] bg-no-repeat bg-cover bg-fixed bg-bottom sm:bg-top flex flex-col content-center justify-center"
    >
      <GameDescription />
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 p-4">
        <DownloadButton />
      </div>
    </div>
  );
}

const GameDescription = () => {
  const gameName = decsription_GenshinImpact.gameName;
  const gameSub = decsription_GenshinImpact.gameSub;
  return (
    <>
      <h1 className="text-center text-white font-bold text-2xl md:text-5xl font-merienda mb-2">
        {gameName}
      </h1>
      <p className="text-center text-white font-bold text-xs md:text-lg font-mclaren mb-2">
        {gameSub}
      </p>
    </>
  );
};

const DownloadButton = () => {
  const providers = Object.keys(downloadLink) as General.DownloadProvider[];
  return (
    <>
      {providers.map((provider) => {
        const information = downloadLink[provider];
        return (
          <Link key={information.imageAlt} href={information.link}>
            <Image
              width={200}
              height={100}
              alt={information.imageAlt}
              src={information.imageSrc}
            />
          </Link>
        );
      })}
    </>
  );
};

/** Body Section */
export function Body({ characters }: BodyProps) {
  return (
    <div className="lg:px-20 md:px-10 px-4 py-10">
      <Characters characters={characters} />
    </div>
  );
}

const Characters = ({ characters }: Pick<BodyProps, "characters">) => {
  const data = characters.slice(0, 14);

  return (
    <div>
      <h3 className="text-white font-nova-square font-bold underline text-2xl mb-4 text-center">Karakter</h3>
      <div className="flex flex-col content-center flex-wrap justify-center bg-slate-800">
        <div className="min-h-[100px] w-full grid grid-cols-7 p-4 gap-4">
          {data.map((d) => (
            <Characters_List key={d.characterName} character={d} />
          ))}
        </div>
        <div className="block text-center my-4 border-t-4 border-double border-t-white pt-4">
          <Link
            href={"/genshin-impact/character"}
            className="font-semibold font-nova-square text-white"
          >
            Lebih Banyak &gt;&gt;
          </Link>
        </div>
      </div>
    </div>
  );
};

export const Characters_List = ({
  character,
}: {
  character: GenshinImpact.CharacterTable;
}) => {
  const slug = character.slug;
  return (
    <Link
      href={`/genshin-impact/character/${slug}`}
      className="relative flex flex-col justify-center items-center my-4 bg-slate-900 rounded-lg p-4 group"
    >
      <div className="absolute -top-7 left-0 w-full flex justify-center gap-1 z-10">
        <Image
          src={`/Genshin-Impact/assets/Element_${character.element}.svg`}
          height={48}
          width={48}
          alt={`character-${character.element}`}
          className="bg-slate-900 rounded-full p-2"
        />
      </div>
      <div
        className={`relative md:w-[115px] w-[80px] h-[100px] rounded-lg overflow-hidden`}
        style={{
          background: `url('/Genshin-Impact/assets/bg-${character.rarity}-star.png')`,
        }}
      >
        <Image
          src={character.image.portrait}
          fill
          sizes="auto"
          alt={character.characterName}
          title={character.characterName}
          className={`w-auto h-auto object-cover object-bottom group-hover:scale-125 transition-all duration-200`}
        />
      </div>
      <p className="font-bold text-center text-sm font-poppins mt-2 text-white line-clamp-1">
        {character.characterName}
      </p>
    </Link>
  );
};
