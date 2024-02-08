import Link from "next/link";
import { LINKSTYLE } from ".";

export default function AccountLink({ field, subfield }: { field: string; subfield: string }) {
  return (
    <details className="px-2" open={field === "account"}>
      <summary className="text-white font-mclaren font-semibold text-lg">Account</summary>
      <ul className="px-4">
        <li>
          <Link href={`/admin/data?field=account&subfield=userslogin`} className={field === "account" && subfield === "userslogin" ? LINKSTYLE.ACTIVE_LINK : LINKSTYLE.NONACTIVE_LINK}>
            User
          </Link>
        </li>
        <li>
          <Link href={`/admin/data?field=account&subfield=password_purify`} className={field === "account" && subfield === "password_purify" ? LINKSTYLE.ACTIVE_LINK : LINKSTYLE.NONACTIVE_LINK}>
            Password Purify
          </Link>
        </li>
        <li>
          <Link href={`/admin/data?field=account&subfield=verificationcode`} className={field === "account" && subfield === "verificationcode" ? LINKSTYLE.ACTIVE_LINK : LINKSTYLE.NONACTIVE_LINK}>
            Verification Code
          </Link>
        </li>
      </ul>
    </details>
  );
}
