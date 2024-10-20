/** HEADER SECTION */

import { decsription_GenshinImpact } from "@/lib/Data/gi";
import { downloadLink } from "./_data";
import { Link } from "@/navigation";
import Image from "next/image";

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

function GameDescription() {
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
}

function DownloadButton() {
  const providers = Object.keys(downloadLink) as General.DownloadProvider[];
  return (
    <>
      {providers.map((provider) => {
        const information = downloadLink[provider];
        return (
          <Link
            key={information.imageAlt}
            href={information.link}
          >
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
}
