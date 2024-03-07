"use client";
import { subField_AL } from "@/lib/Data";
import { LINKSTYLE } from ".";
import { useRouter } from "next/navigation";

export default function AccountLink({ field, subfield }: { field: string; subfield: string }) {
  const router = useRouter();
  return (
    <details className="px-2" open={field === "account"}>
      <summary className="text-white font-mclaren font-semibold text-lg">Account</summary>
      <ul className="px-4">
        {subField_AL.map((sub) => (
          <li key={sub.subfield}>
            <p onClick={() => router.replace(`/admin/data?field=account&subfield=${sub.subfield}`)} className={field === "account" && subfield === sub.subfield ? LINKSTYLE.ACTIVE_LINK : LINKSTYLE.NONACTIVE_LINK}>
              {sub.label}
            </p>
          </li>
        ))}
      </ul>
    </details>
  );
}
