import Character from "@/components/Game/GenshinImpact/List";

export default function GenshinImpactCharacter() {
    return (
      <div className={"main-wrapper py-20"}>
        <div className="lg:px-20 md:px-10 px-4 py-10">
        <div className="bg-slate-800 min-h-[100px] w-full">
        <Character template="character page" />
        </div>  
        </div>
      </div>
    );
  }