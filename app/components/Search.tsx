import { usePathname } from "next/navigation";
import { Search as Cari } from "react-bootstrap-icons";

export default function Search() {
  const pathName = usePathname();

  let splitPathName = pathName.split("/");
  splitPathName.splice(2, 1, "search");
  const actionPath = splitPathName.join("/");

  return (
    <form action={actionPath} className="my-auto w-1/3">
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
