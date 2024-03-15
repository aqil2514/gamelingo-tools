import { DIV_MAIN_STYLE } from "@/components/Styles";
import { Metadata } from "next";
import List, { ListState } from "@/components/Game/Evertale/List";

type Props = {
  params: { charWeapon: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { charWeapon } = params;

  const firsLetter = charWeapon.charAt(0).toUpperCase();
  const resLetter = charWeapon.slice(1);
  const title = firsLetter + resLetter + " Character Weapons";
  return {
    title,
    description: `Evertale ${title}`,
    metadataBase: new URL("https://gamelingo-tools.vercel.app"),
  };
}

export default async function CharWeapon({ params }: Props) {
  const { charWeapon } = params;
  const firsLetter = charWeapon.charAt(0).toUpperCase();
  const resLetter = charWeapon.slice(1);

  let query;
  if (!query) throw new Error("Queri tidak ada");

  if (charWeapon === "greatsword") query = "GreatSword";
  else if (charWeapon === "greataxe") query = "GreatAxe";
  else if (charWeapon !== "greatsword" && charWeapon !== "greateaxe") query = firsLetter + resLetter;

  return (
    <div className={"main-wrapper py-20 px-8"}>
      <List listBy="weapon" subListBy={query as ListState["subListBy"]} type="chars" key={`element-character-${query}`} loadingAnimation textOn text="Loading..." isGrid />
    </div>
  );
}
