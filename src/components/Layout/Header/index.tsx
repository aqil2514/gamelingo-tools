import { getUser } from "@/utils/Api/api";
import Navbar from "./Nav";

export default async function Headers() {
  const user = await getUser();

  return <Navbar data={user} />;
}
