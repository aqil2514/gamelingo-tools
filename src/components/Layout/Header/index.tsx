import Navbar from "./Nav";

export default async function Headers() {
  const user = {} as Account.User;

  return <Navbar data={user} />;
}
