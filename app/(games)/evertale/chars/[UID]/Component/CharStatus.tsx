import { CharacterStatus } from "@/models/Evertale/Characters";
import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function CharStatus({ charStatus }: { charStatus: CharacterStatus }) {
  const encodedLeaderSkill = encodeURIComponent(charStatus.charLeaderSkill as string);
  const URL = `/api/gamelingo/evertale?category=leaderSkill&name=${encodedLeaderSkill}`;

  const { data, isLoading } = useSWR(URL, fetcher);

  return (
    <div className="block my-8 mx-auto w-full md:w-1/2 bg-slate-800 px-4 md:px-8 py-4 rounded-xl">
      <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Character Status</h3>
      <article>
        <p className="font-poppins text-base text-white">
          <strong>Character Name : </strong>
          {charStatus.charName}
        </p>
        <p className="font-poppins text-base text-white">
          <strong>Character Rank : </strong>
          {charStatus.charRank}
        </p>
        <p className="font-poppins text-base text-white">
          <strong>Character Team : </strong>
          {charStatus.charTeam.join(", ")}
        </p>
        <p className="font-poppins text-base text-white">
          <strong>Element : </strong>
          {charStatus.charLeaderSkill}
        </p>
        <p className="font-poppins text-base text-white">
          <strong>First Weapon : </strong>
          {charStatus.charWeapon1}
        </p>
        {charStatus.charWeapon2 && (
          <p className="font-poppins text-base text-white">
            <strong>Full Awakening Weapon : </strong>
            {charStatus.charWeapon2}
          </p>
        )}
        {charStatus.charConjure && (
          <p className="font-poppins text-base text-white">
            <strong>Conjures : </strong>
            {charStatus.charConjure}
          </p>
        )}
        {charStatus.charLeaderSkill && (
          <p className="font-poppins text-base text-white">
            <strong>Leader Skill Name : </strong>
            {charStatus.charLeaderSkill}
          </p>
        )}
        {charStatus.charLeaderSkill && (
          <p className="font-poppins text-base text-white">
            <strong>Engish Description : </strong>
            {isLoading || !data ? "Mengambil Data..." : data.leaderskills.descEn}
          </p>
        )}
        {charStatus.charLeaderSkill && (
          <p className="font-poppins text-base text-white">
            <strong>Deskripsi Indonesia : </strong>
            {isLoading || !data ? "Mengambil Data..." : data.leaderskills.descId}
          </p>
        )}
      </article>
    </div>
  );
}
