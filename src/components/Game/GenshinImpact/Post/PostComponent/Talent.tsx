"use client";
import Image from "next/image";

export function TalentSkeleton() {
  return (
    <div className="w-3/4 bg-slate-900 min-h-100px  rounded-xl p-4 mx-auto my-2">
      <h3 className="text-white font-nova-square font-bold text-xl">Talent</h3>
      {[...Array(6)].map((_, i: number) => (
        <div
          key={`test${i}`}
          className="text-zinc-800 rounded-xl p-4 my-2 flex gap-4"
        >
          <div className="w-[128px] h-[64px] bg-zinc-800 rounded-xl animate-pulse"></div>
          <p className="bg-zinc-800 animate-pulse rounded-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
            nesciunt libero ipsa facere voluptas laudantium odit quibusdam fugit
            itaque exercitationem.
          </p>
        </div>
      ))}
    </div>
  );
}

type CombatKey = keyof GenshinImpact.TalentSubLang["combats"];
type PassiveKey = keyof GenshinImpact.TalentSubLang["passives"];
type TalentTypes = ServerGameLingo.GenshinPage.CharacterPage["talent"];

const combatNames: CombatKey[] = ["combat1", "combat2", "combat3", "combatsp"];
const passiveNames: PassiveKey[] = ["passive1", "passive2", "passive3"];

export function TalentDefault({ data }: { data: TalentTypes }) {
  console.log(data);
  return (
    <div className="w-[95%] md:w-3/4 bg-slate-900 min-h-100px rounded-xl mx-auto my-2 p-4">
      <h3 className="text-white font-merriweather underline font-bold text-xl">
        Talents
      </h3>
      {combatNames.map((c) => {
        const dataCombat = data.data.combats[c];
        const icon: Record<CombatKey, string> = {
          combat1: data.icon.combat1Icon,
          combat2: data.icon.combat2Icon,
          combat3: data.icon.combat3Icon,
          combatsp: data.icon.combatspIcon ? data.icon.combatspIcon : "null",
        };
        if (dataCombat?.description && dataCombat.name)
          return (
            <div
              key={c}
              className="text-zinc-800 rounded-xl px-4 my-2 md:grid md:grid-cols-[100px_auto] gap-4"
            >
              <div className="relative w-[64px] h-[64px] block m-auto">
                <Image
                  src={
                    icon[c] !== "null" ? icon[c] : "https://placehold.jp/64x64.png"
                  }
                  alt={c}
                  fill
                  sizes="auto"
                  className="block mx-auto my-4 md:my-2"
                />
              </div>

              <div className="my-6">
                <p className="text-white font-nova-square font-bold underline text-sm md:text-xl lg:text-2xl">
                  {dataCombat.name}
                </p>
                <p className="text-white font-poppins text-xs md:text-lg lg:text-xl">
                  {dataCombat.description}
                </p>
              </div>
            </div>
          );
      })}

      <h3 className="text-white font-merriweather underline font-bold text-xl">
        Passives
      </h3>
      {passiveNames.map((c) => {
        const dataCombat = data.data.passives[c];
        const icon:Record<PassiveKey, string> = {
          "passive1" : data.icon.passive1Icon,
          "passive2" : data.icon.passive2Icon,
          "passive3" : data.icon.passive3Icon,
        }

        if (dataCombat?.description && dataCombat.name)
          return (
            <div
              key={c}
              className="text-zinc-800 rounded-xl my-2 md:grid md:grid-cols-[100px_auto] md:gap-4"
            >
              <div className="relative w-[64px] h-[64px] block m-auto">
                <Image
                  src={
                    icon[c] !=="null"
                      ? icon[c]
                      : "https://placehold.jp/64x64.png"
                  }
                  alt={c}
                  fill
                  sizes="auto"
                  className="block mx-auto my-2"
                />
              </div>

              <div>
                <p className="text-white font-nova-square font-bold underline my-2 text-sm md:text-xl lg:text-2xl">
                  {dataCombat.name}
                </p>
                <p className="text-white font-poppins text-xs md:text-lg lg:text-xl">
                  {dataCombat.description}
                </p>
              </div>
            </div>
          );
      })}
    </div>
  );
}
