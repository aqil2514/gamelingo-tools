"use client";
import { subfield_GIL } from "@/components/general/Data";
import { LINKSTYLE } from ".";
import { useRouter } from "next/navigation";

export default function GenshinImpactLink({ field, subfield }: { field: string; subfield: string }) {
  const router = useRouter();
  return (
    <details className="px-2" open={field === "genshin-impact"}>
      <summary className="text-white font-mclaren font-semibold text-lg">Genshin Impact</summary>
      <ul className="px-4">
        {subfield_GIL.map((sub) => (
          <li key={sub.subfield}>
            <p onClick={() => router.replace(`/admin/data?field=genshin-impact&subfield=${sub.subfield}&lang=English`)} className={field === "genshin-impact" && subfield === sub.subfield ? LINKSTYLE.ACTIVE_LINK : LINKSTYLE.NONACTIVE_LINK}>
              {sub.label}
            </p>
          </li>
        ))}{" "}
      </ul>
    </details>
  );
}
