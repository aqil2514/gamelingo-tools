import EvertaleResult from "./EvertaleResult";

interface ResultState {
  category: string;
  data: General.Post[];
  path: string;
}

const SearchResult = ({ category, data, path }: ResultState) => {
  return <EvertaleResult data={data} path={path} category={category} />;
};

export default SearchResult;
