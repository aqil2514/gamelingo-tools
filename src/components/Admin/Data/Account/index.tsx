import UserData from "./UserData";
import PasswordPurifyData from "./PasswordPurifyData";
import VerificationCode from "./VerificationCode";

export default function AccountData({ subfield, data }: { subfield: string; data: any }) {
  if (subfield === "userslogin") return <UserData data={data as Account.AdminUserOutput[]} />;
  if (subfield === "password_purify") return <PasswordPurifyData data={data as Account.PasswordPurify[]} />;
  if (subfield === "verificationcode") return <VerificationCode data={data as Account.VerifCode[]} />;
}
