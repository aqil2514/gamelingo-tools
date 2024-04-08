import { charElement, charRank, charWeapon } from "@/lib/evertale/data";
import { Link } from "@/navigation";
import Image from "next/image";
import useSWR from "swr";

const Icon = ({ charStatus }: { charStatus: Evertale.Character.Status }) => {
  const rank = charRank.find((char) => char.rank === charStatus.charRank);
  const element = charElement.find((char) => char.element === charStatus.charElement);
  const weapon1 = charWeapon.find((char) => char.name === charStatus.charWeapon1);
  const weapon2 = charWeapon.find((char) => char.name === charStatus.charWeapon2);
  return (
    <div className="flex flex-row w-full gap-4 mb-2 justify-center">
      <Image src={rank?.image as string} width={32} height={32} title={`Rank ${rank?.rank}`} alt={rank?.rank as string} />
      <Link href={`/evertale/chars/element/${element?.element.toLowerCase()}`}>
        <Image src={element?.image as string} width={32} height={32} title={`Element ${element?.element}`} alt={element?.element as string} />
      </Link>
      <Link href={`/evertale/chars/weapon/${weapon1?.name.toLowerCase()}`}>
        <Image src={weapon1?.image as string} width={32} height={32} title={`Weapon 1 ${weapon1?.name}`} alt={weapon1?.name as string} />
      </Link>
      {charStatus.charWeapon2 && (
        <Link href={`/evertale/chars/weapon/${weapon2?.name.toLowerCase()}`}>
          <Image src={weapon2?.image as string} width={32} height={32} title={`Weapon 2 ${weapon2?.name}`} alt={weapon2?.name as string} />
        </Link>
      )}
    </div>
  );
};

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function CharStatus({ charStatus }: { charStatus: Evertale.Character.Status }) {
  const encodedLeaderSkill = encodeURIComponent(charStatus.charLeaderSkill as string);
  const URL = `/api/gamelingo/evertale?category=leaderSkill&name=${encodedLeaderSkill}`;

  const { data, isLoading } = useSWR(URL, fetcher);

  return (
    <div className="block my-8 mx-auto w-full md:w-1/2 bg-slate-800 px-4 md:px-8 py-4 rounded-xl">
      <Icon charStatus={charStatus} />
      <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">{charStatus.charName}</h3>
      <article className="text-center">
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

        {charStatus.charConjure && <Conjure charStatus={charStatus} />}

        <div>
          {charStatus.charTeam.map((team: String, i: number) => {
            const linkTeam = team.toLocaleLowerCase().replace(/ /g, "-");
            const separator = i === charStatus.charTeam.length - 1 ? "" : ", ";

            return (
              <span key={i++}>
                <Link href={`/evertale/chars/team/${linkTeam}`} title={`See more char from ${team}`} className="bg-white !text-slate-800 mx-1 my-1 first:ml-0 rounded-xl px-2 font-bold">
                  {team}
                </Link>
                {separator}
              </span>
            );
          })}
        </div>
      </article>
    </div>
  );
}

const Conjure = ({ charStatus }: any) => {
  const URL = `/api/gamelingo/evertale/chars?conjureName=${charStatus.charConjure}`;
  const { data, isLoading } = useSWR(URL, fetcher);
  if (!data || isLoading) return <p className="font-poppins text-base text-white">Memuat Data...</p>;

  const conjure = data.conjure;
  return (
    <>
      <strong className="font-poppins text-base text-white">Conjures : </strong>
      <figure className="w-[64px] h-[64px] block mx-auto mb-4">
        <Link href={`/evertale/chars/${conjure.id}`}>
          <Image src={conjure.image} width={64} height={64} alt={conjure.charName} className="rounded-xl max-h-[64px] object-cover" />
        </Link>
      </figure>
    </>
  );
};
