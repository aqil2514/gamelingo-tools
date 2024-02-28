import UserData from "./UserData";
import VerificationCode from "./VerificationCode";
import PasswordPurify from "./PasswordPurify";
import { getClientUser } from "@/utils/fe";

export default function AccountData({ subfield, data }: { subfield: string; data: any }) {
  const user = getClientUser();

  if (user.role !== "General Admin") return <p className="text-white mx-4 font-poppins font-bold">Maaf, data sensitif. Aksi dibatasi</p>;

  if (subfield === "userslogin") return <UserData data={data as Account.AdminUserOutput[]} />;
  else if (subfield === "password_purify") return <PasswordPurify data={data as Account.PasswordPurify[]} />;
  else if (subfield === "verificationcode") return <VerificationCode data={data as Account.VerifCode[]} />;
}
