import { charElement, charRank, charWeapon } from "@/lib/evertale/data";
import { CharacterStatus } from "@/models/Evertale/Characters";
import Image from "next/image";
import useSWR from "swr";

const Icon = ({ charStatus }: { charStatus: CharacterStatus }) => {
  const rank = charRank.find((char: any) => char.rank === charStatus.charRank);
  const element = charElement.find((char: any) => char.element === charStatus.charElement);
  const weapon1 = charWeapon.find((char: any) => char.name === charStatus.charWeapon1);
  const weapon2 = charWeapon.find((char: any) => char.name === charStatus.charWeapon2);
  return (
    <div className="flex flex-row w-full gap-4 mb-2 justify-center">
      <Image src={rank?.image as string} width={32} height={32} title={`Rank ${rank?.rank}`} alt={rank?.rank as string} />
      <Image src={element?.image as string} width={32} height={32} title={`Element ${element?.element}`} alt={element?.element as string} />
      <Image src={weapon1?.image as string} width={32} height={32} title={`Weapon 1 ${weapon1?.name}`} alt={weapon1?.name as string} />
      {charStatus.charWeapon2 && <Image src={weapon2?.image as string} width={32} height={32} title={`Weapon 2 ${weapon2?.name}`} alt={weapon2?.name as string} />}
    </div>
  );
};

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function CharStatus({ charStatus }: { charStatus: CharacterStatus }) {
  const encodedLeaderSkill = encodeURIComponent(charStatus.charLeaderSkill as string);
  const URL = `/api/gamelingo/evertale?category=leaderSkill&name=${encodedLeaderSkill}`;

  const { data, isLoading } = useSWR(URL, fetcher);

  return (
    <div className="block my-8 mx-auto w-full md:w-1/2 bg-slate-800 px-4 md:px-8 py-4 rounded-xl">
      <Icon charStatus={charStatus} />
      <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">{charStatus.charName}</h3>
      <article>
        {charStatus.charLeaderSkill && (
          <fieldset className="border-2 px-4 py-2 mb-4 rounded-xl">
            <legend className="font-poppins text-center text-base text-white">
              <strong>{charStatus.charLeaderSkill}</strong>
            </legend>
            {charStatus.charLeaderSkill && <p className="font-poppins text-center text-base mb-2 text-white">{isLoading || !data ? "Mengambil Data..." : data.leaderskills.descEn}</p>}
            <div className="bg-white w-full h-[2px]"></div>
            {charStatus.charLeaderSkill && <p className="font-poppins text-center text-base mt-2 text-white">{isLoading || !data ? "Mengambil Data..." : data.leaderskills.descId}</p>}
          </fieldset>
        )}
        <p className="font-poppins text-base text-white">
          <strong>Character Team : </strong>
          {charStatus.charTeam.join(", ")}
        </p>
        {charStatus.charConjure && (
          <p className="font-poppins text-base text-white">
            <strong>Conjures : </strong>
            {charStatus.charConjure}
          </p>
        )}
      </article>
    </div>
  );
}
