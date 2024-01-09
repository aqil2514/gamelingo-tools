import { DIV_MAIN_STYLE } from "@/components/Styles";
import { Metadata } from "next";
import List from "@/components/Evertale/List";

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

export default async function CharWeapon({ params }: any) {
  const { charWeapon } = params;
  const firsLetter = charWeapon.charAt(0).toUpperCase();
  const resLetter = charWeapon.slice(1);

  let query;
  if (charWeapon === "greatsword") {
    query = "GreatSword";
  } else if (charWeapon === "greataxe") {
    query = "GreatAxe";
  } else if (charWeapon !== "greatsword" && charWeapon !== "greateaxe") {
    query = firsLetter + resLetter;
  }

  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-8"}>
      <List listBy="weapon" subListBy={query} type="chars" key={`element-character-${query}`} loadingAnimation textOn text="Loading..." isGrid />
    </div>
  );
}
