import AccountData from "./Account";
import EvertaleData from "./Evertale";
import GenshinImpactData from "./Genshin-Impact";

export default function AdminData({ field, subfield, user }: { field: string; subfield: string; user: Account.User }) {
  if (field === "account") {
    if (user.role !== "General Admin") return <p className="text-white mx-4 font-poppins font-bold">Maaf, data sensitif. Aksi dibatasi</p>;

    return <AccountData field={field} subfield={subfield} />;
  }

  if (field === "evertale") {
    if (user.role !== "Admin of Evertale" && user.role !== "General Admin") return <p className="text-white mx-4 font-poppins font-bold">Maaf, anda belum mendapat izin untuk melihat data game ini</p>;

    return <EvertaleData field={field} subfield={subfield} />;
  }

  if (field === "genshin-impact") {
    if (user.role !== "Admin of Genshin Impact" && user.role !== "General Admin") return <p className="text-white mx-4 font-poppins font-bold">Maaf, anda belum mendapat izin untuk melihat data game ini</p>;

    return <GenshinImpactData field={field} subfield={subfield as General.GameGenshinImpact["category"]} />;
  }

  return (
    <h1 className="text-white font-bold font-poppins text-center">Nanti di sini dibuat shortcut ajah</h1>
  )
}
