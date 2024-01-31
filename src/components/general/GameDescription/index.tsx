interface GameDescriptionState {
  game: "Evertale" | "GenshinImpact" | "MobileLegends";
}

interface DataGameTypes {
  gameName: string;
  gameSub: string;
}

const dataGame: DataGameTypes[] = [
  {
    gameName: "Evertale",
    gameSub: "Explore sprawling landscapes, bustling cities, and mythical dungeons in this expansive open-world RPG!",
  },
];

export default function GameDescription({ game }: GameDescriptionState) {
  const data = dataGame.find((g) => g.gameName === game);
  if (!data) throw new Error("Data tidak ada");
  if (game === "Evertale") return <EvertaleDescription data={data} />;
}

function EvertaleDescription({ data }: { data: DataGameTypes }) {
  return (
    <>
      <h1 className="text-center text-white font-bold text-2xl md:text-5xl font-merienda mb-2">{data?.gameName}</h1>
      <p className="text-center text-white font-bold text-xs md:text-lg font-mclaren mb-2">{data?.gameSub}</p>
    </>
  );
}
