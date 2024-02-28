"use client";
import { subfield_EL } from "@/components/general/Data";
import { LINKSTYLE } from ".";
import { useRouter } from "next/navigation";

export default function EvertaleLink({ field, subfield }: { field: string; subfield: string }) {
  const router = useRouter();
  return (
    <details className="px-2" open={field === "evertale"}>
      <summary className="text-white font-mclaren font-semibold text-lg">Evertale</summary>
      <ul className="px-4">
        {subfield_EL.map((sub) => (
          <li key={sub.subfield}>
            <p onClick={() => router.replace(`/admin/data?field=evertale&subfield=${sub.subfield}`)} className={field === "evertale" && subfield === sub.subfield ? LINKSTYLE.ACTIVE_LINK : LINKSTYLE.NONACTIVE_LINK}>
              {sub.label}
            </p>
          </li>
        ))}{" "}
      </ul>
    </details>
  );
}
