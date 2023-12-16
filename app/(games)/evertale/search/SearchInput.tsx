import { Search as Cari } from "react-bootstrap-icons";

export default function SearchInput() {
  return (
    <form className="my-auto mx-auto w-1/3">
      <div className="relative">
        <input type="text" name="s" id="s" placeholder="Cari..." className="w-full font-poppins font-bold px-4 rounded-xl" />
        <div className="absolute right-2 top-1">
          <button type="submit">
            <Cari />
          </button>
        </div>
      </div>
    </form>
  );
}
