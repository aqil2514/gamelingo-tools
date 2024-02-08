import PasswordPurifyData from "./PasswordPurifyData"
import UserData from "./UserData"
import VerificationCodeData from "./VerificationCodeData"

export default function AccountData({subfield, data}:{subfield:string, data:Account.AdminUserOutput[] | Account.PasswordPurify[]|Account.VerifCode[]}){
    if(subfield === "userslogin") return <UserData data={data as Account.AdminUserOutput[]} />
    if(subfield === "password_purify") return <PasswordPurifyData data={data as Account.PasswordPurify[]} />
    if(subfield === "verificationcode") return <VerificationCodeData data={data as Account.VerifCode[]} />
}