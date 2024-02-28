"use client";
import Link from "next/link";
import { LINKSTYLE } from ".";
import { useRouter } from "next/navigation";

export default function AccountLink({ field, subfield }: { field: string; subfield: string }) {
  const router = useRouter();
  return (
    <details className="px-2" open={field === "account"}>
      <summary className="text-white font-mclaren font-semibold text-lg">Account</summary>
      <ul className="px-4">
        <li>
          <p onClick={() => router.replace(`/admin/data?field=account&subfield=userslogin`)} className={field === "account" && subfield === "userslogin" ? LINKSTYLE.ACTIVE_LINK : LINKSTYLE.NONACTIVE_LINK}>
            User
          </p>
        </li>
        <li>
          <p onClick={() => router.replace(`/admin/data?field=account&subfield=password_purify`)} className={field === "account" && subfield === "password_purify" ? LINKSTYLE.ACTIVE_LINK : LINKSTYLE.NONACTIVE_LINK}>
            Password Purify
          </p>
        </li>
        <li>
          <p onClick={() => router.replace(`/admin/data?field=account&subfield=verificationcode`)} className={field === "account" && subfield === "verificationcode" ? LINKSTYLE.ACTIVE_LINK : LINKSTYLE.NONACTIVE_LINK}>
            Verification Code
          </p>
        </li>
      </ul>
    </details>
  );
}
