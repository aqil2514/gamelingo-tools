import Button, { VariantClass } from "@/components/Input/Button";
import Image from "next/image";
import Link from "next/link";

const rightAlignNameChar = ["Raiden Shogun"];
/* TODO : FIX INI. GANTI JADI POTRAIT AJAH FOTONYA */

export default function CharacterList({
  d,
}: {
  d: GenshinImpact.CharacterInfo;
}) {
  return (
    <div className="relative flex flex-col justify-center items-center my-4 bg-slate-900 rounded-lg p-4">
      <div className="absolute -top-7 left-0 w-full flex justify-center gap-1 z-10">
        <Image
          src={`/Genshin-Impact/assets/Element_${d.element}.svg`}
          height={48}
          width={48}
          alt={`character-${d.element}`}
          className="bg-slate-900 rounded-full p-2"
        />
      </div>
      <div
        className={`relative w-[115px] h-[100px] max-w-[115px] max-h-[130px] rounded-lg overflow-hidden`}
        style={{
          background: `${
            d.rarity === "4"
              ? "url('/Genshin-Impact/assets/bg-4-star.png')"
              : "url('/Genshin-Impact/assets/bg-5-star.png')"
          }`,
        }}
      >
        <Image
          src={d.image}
          fill
          sizes="auto"
          alt={d.name}
          title={d.name}
          className={`w-auto h-auto object-cover object-bottom hover:scale-125 transition-all duration-200 ${
            rightAlignNameChar.includes(d.name) ? "ml-auto" : "mx-auto"
          }`}
        />
      </div>
      <Link href={`/genshin-impact/character/${d.id}`}>
        <Button className={VariantClass.submit}>Lihat</Button>
      </Link>
    </div>
  );
}
