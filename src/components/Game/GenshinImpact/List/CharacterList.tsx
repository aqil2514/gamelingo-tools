import Button, { VariantClass } from "@/components/Input/Button";
import { Link } from "@/navigation";
import { useMessages } from "next-intl";
import Image from "next/image";

const rightAlignNameChar = ["Raiden Shogun"];

export default function CharacterList({
  d,
}: {
  d: GenshinImpact.CharacterInfo;
}) {
  const messages = useMessages();
  const message = messages.GenshinCharacterPage as unknown as Internationalization.GenshinCharacterPage;  

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
        className={`relative md:w-[115px] w-[80px] h-[100px] rounded-lg overflow-hidden`}
        style={{
          background: `url('/Genshin-Impact/assets/bg-${d.rarity}-star.png')`,
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
      <p className="font-bold text-center text-sm font-poppins mt-2 text-white line-clamp-1">{d.name}</p>
      <Link href={`/genshin-impact/character/${d.id}`}>
        <Button className={VariantClass.submit}>{message.seeText}</Button>
      </Link>
    </div>
  );
}
