import Link from "next/link";
import { LINKSTYLE } from ".";

export default function EvertaleLink({ field, subfield }: { field: string; subfield: string }) {
  return (
    <details className="px-2" open={field === "evertale"}>
      <summary className="text-white font-mclaren font-semibold text-lg">Evertale</summary>
      <ul className="px-4">
        <li>
          <Link href={`/admin/data?field=evertale&subfield=chars`} className={field === "evertale" && subfield === "chars" ? LINKSTYLE.ACTIVE_LINK : LINKSTYLE.NONACTIVE_LINK}>
            Characters
          </Link>
        </li>
        <li>
          <Link href={`/admin/data?field=evertale&subfield=leaderskills`} className={field === "evertale" && subfield === "leaderskills" ? LINKSTYLE.ACTIVE_LINK : LINKSTYLE.NONACTIVE_LINK}>
            Leader Skill
          </Link>
        </li>
        <li>
          <Link href={`/admin/data?field=evertale&subfield=passives`} className={field === "evertale" && subfield === "passives" ? LINKSTYLE.ACTIVE_LINK : LINKSTYLE.NONACTIVE_LINK}>
            Passive Skill
          </Link>
        </li>
        <li>
          <Link href={`/admin/data?field=evertale&subfield=typeskills`} className={field === "evertale" && subfield === "typeskills" ? LINKSTYLE.ACTIVE_LINK : LINKSTYLE.NONACTIVE_LINK}>
            Type Skills
          </Link>
        </li>
        <li>
          <Link href={`/admin/data?field=evertale&subfield=weapons`} className={field === "evertale" && subfield === "weapons" ? LINKSTYLE.ACTIVE_LINK : LINKSTYLE.NONACTIVE_LINK}>
            Weapons
          </Link>
        </li>
      </ul>
    </details>
  );
}
