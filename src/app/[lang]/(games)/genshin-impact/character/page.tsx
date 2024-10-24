import { Metadata } from "next";
import { Characters } from "./_components";
import { getCharacterTable } from "../_utils";

export const metadata: Metadata = {
  title: "Character - Genshin Impact",
};

export default async function GenshinImpactCharacter({
  params,
}: {
  params: General.ParamsBasic;
}) {
  const characters = await getCharacterTable();

  // TODO : ADA BUG DI BENNET.SELALU NAMBAH SENDIRI

  return (
    <div className={"main-wrapper py-20"}>
      <div className="lg:px-20 md:px-10 px-4 py-10">
        <div className="bg-slate-800 min-h-[100px] w-full">
          <Characters characters={characters} />
        </div>
      </div>
    </div>
  );
}
