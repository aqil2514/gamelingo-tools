import Image from "next/image";
import Link from "next/link";

interface DownloadButtonState {
  game: "Evertale" | "GenshinImpact" | "MobileLegends";
  downloadFrom: "Playstore" | "AppStore" | "PS4" | "Epic Games";
}

const LINK_STYLES = "mx-4 mt-4";

export default function DownloadButton({ game, downloadFrom }: DownloadButtonState) {
  if (game === "Evertale" && downloadFrom === "Playstore") return <PSEvertale />;
  else if (game === "Evertale" && downloadFrom === "AppStore") return <AppEvertale />;
  else if (game === "GenshinImpact" && downloadFrom === "Playstore") return <PSGenshin />;
  else if (game === "GenshinImpact" && downloadFrom === "AppStore") return <AppGenshin />;
  else if (game === "GenshinImpact" && downloadFrom === "PS4") return <PS4Genshin />;
  else if (game === "GenshinImpact" && downloadFrom === "Epic Games") return <EpicGamesGenshin />;
}

// Evertale
function PSEvertale() {
  return (
    <Link className={LINK_STYLES} href={"https://play.google.com/store/apps/details?id=com.zigzagame.evertale"}>
      <Image width={200} height={100} alt="Download in Playstore" src="/btn_gp_en.webp" />
    </Link>
  );
}

function AppEvertale() {
  return (
    <Link className={LINK_STYLES} href={"https://apps.apple.com/app/evertale/id1263365153"}>
      <Image width={200} height={100} alt="Download in AppStore" src={"/btn_ap_en.webp"} />
    </Link>
  );
}

//Genshin Impact
function PSGenshin() {
  return (
    <Link className={LINK_STYLES} href={"https://play.google.com/store/apps/details?id=com.miHoYo.GenshinImpact&pli=1"}>
      <Image width={200} height={100} alt="Download in Playstore" src="/btn_gp_en.webp" />
    </Link>
  );
}

function AppGenshin() {
  return (
    <Link className={LINK_STYLES} href={"https://apps.apple.com/us/app/genshin-impact-lantern-rite/id1517783697"}>
      <Image width={200} height={100} alt="Download in AppStore" src={"/btn_ap_en.webp"} />
    </Link>
  );
}

function PS4Genshin() {
  return (
    <Link className={LINK_STYLES} href={"https://www.playstation.com/en-id/games/genshin-impact/"}>
      <Image width={200} height={100} alt="Download in Playstation" src={"/btn_ps4_en.png"} />
    </Link>
  );
}

function EpicGamesGenshin() {
  return (
    <Link className={LINK_STYLES} href={"https://store.epicgames.com/en-US/p/genshin-impact"}>
      <Image width={200} height={100} alt="Download in Playstation" src={"/btn_epicstore_en.png"} />
    </Link>
  );
}
