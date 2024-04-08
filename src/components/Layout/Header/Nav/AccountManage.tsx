import { Link } from "@/navigation";
import { usePathname } from "next/navigation";

export default function AccountManage() {
  const pathName = usePathname();

  return (
    <>
      {pathName !== "/login" && pathName !== "/register" && !pathName.includes("/verification") && (
        <div className="mx-2 sm:mx-6 my-auto">
          <Link href="/login" className="cursor-pointer">
            <button className="bg-yellow-400 font-poppins font-bold text-yellow-950 text-xs sm:text-lg py-1 px-2 mx-1 rounded-lg">Login</button>
          </Link>
          <Link href="/register" className="cursor-pointer">
            <button className="bg-yellow-400 font-poppins font-bold text-yellow-950 text-xs sm:text-lg py-1 px-2 mx-1 rounded-lg">Register</button>
          </Link>
        </div>
      )}
    </>
  );
}
