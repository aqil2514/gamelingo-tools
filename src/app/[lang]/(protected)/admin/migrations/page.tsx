import MigrationComponent from "@/components/Admin/Migrations";
import { getUser } from "@/utils/Api/api";

export default async function Migrations() {
  const user = await getUser();

  if (user?.role !== "General Admin")
    return (
      <div className="py-20">
        <h1 className="font-nova-square text-white font-bold text-center text-5xl capitalize">
          No Access
        </h1>
      </div>
    );
  return (
    <div className="py-20 px-4">
      <h1 className="font-nova-square text-white font-bold text-center text-5xl capitalize">
        Migration Center
      </h1>
      <MigrationComponent />
    </div>
  );
}
