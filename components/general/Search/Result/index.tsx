import CharResult from "./CharResult";

interface ResultState {
  game: "evertale" | "mlbb" | "gi";
  category: "character" | "weapon";
  data: any;
}

const SearchResult = ({ game, category, data }: ResultState) => {
  if (game === "evertale") {
    if (category === "character") return <CharResult data={data} />;
  }
};

export default SearchResult;
