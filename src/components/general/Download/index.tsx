import Image from "next/image";
import { Link } from "@/navigation";

interface DownloadButtonState {
  game: "Evertale" | "GenshinImpact" | "MobileLegends";
  downloadFrom: "Playstore" | "AppStore" | "PS4" | "Epic Games";
}

const LINK_STYLES = "mx-4 mt-4";

export default function DownloadButton({
  game,
  downloadFrom,
}: DownloadButtonState) {
  if (game === "Evertale" && downloadFrom === "Playstore")
    return <PSEvertale />;
  else if (game === "Evertale" && downloadFrom === "AppStore")
    return <AppEvertale />;
}

// Evertale
function PSEvertale() {
  return (
    <Link
      className={LINK_STYLES}
      href={
        "https://play.google.com/store/apps/details?id=com.zigzagame.evertale"
      }
    >
      <Image
        width={200}
        height={100}
        alt="Download in Playstore"
        src="/btn_gp_en.webp"
      />
    </Link>
  );
}

function AppEvertale() {
  return (
    <Link
      className={LINK_STYLES}
      href={"https://apps.apple.com/app/evertale/id1263365153"}
    >
      <Image
        width={200}
        height={100}
        alt="Download in AppStore"
        src={"/btn_ap_en.webp"}
      />
    </Link>
  );
}
