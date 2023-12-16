import { Search } from "react-bootstrap-icons";

export default function SearchInput() {
  return (
    <form action="/evertale/search" className="my-auto mx-auto w-full md:w-1/3">
      <div className="relative">
        <input type="text" name="s" id="s" placeholder="Cari..." className="w-full font-poppins font-bold px-4 rounded-xl" />
        <div className="absolute right-2 top-1">
          <button type="submit">
            <Search />
          </button>
        </div>
      </div>
    </form>
  );
}
