interface GameDescriptionState {
  game: "Evertale" | "GenshinImpact" | "MobileLegends";
}

const dataGame = [
  {
    gameName: "Evertale",
    gameSub: "Explore sprawling landscapes, bustling cities, and mythical dungeons in this expansive open-world RPG!",
  },
];

const GameDescription = ({ game }: GameDescriptionState) => {
  const data = dataGame.find((g: any) => g.gameName === game);
  return (
    <>
      <h1 className="text-center text-white font-bold text-2xl md:text-5xl font-merienda mb-2">{data?.gameName}</h1>
      <p className="text-center text-white font-bold text-xs md:text-lg font-mclaren mb-2">{data?.gameSub}</p>
    </>
  );
};

export default GameDescription;
