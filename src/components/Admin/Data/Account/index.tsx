import UserData from "./UserData";
import VerificationCode from "./VerificationCode";
import PasswordPurify from "./PasswordPurify";

export default function AccountData({ subfield, data }: { subfield: string; data: any }) {
  if (subfield === "userslogin") return <UserData data={data as Account.AdminUserOutput[]} />;
  if (subfield === "password_purify") return <PasswordPurify data={data as Account.PasswordPurify[]} />;
  if (subfield === "verificationcode") return <VerificationCode data={data as Account.VerifCode[]} />;
}
