import NavMenu from "@/components/Layout/Admin/NavMenu";
import { getUser } from "@/utils/api";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  if (!user) redirect("/");

  if (user.role !== "Admin" && user.role !== "General Admin") redirect("/");
  return (
    <div className="bg-zinc-900 min-h-screen w-full grid grid-cols-[300px_auto]">
      <NavMenu user={user} />
      {children}
    </div>
  );
}
