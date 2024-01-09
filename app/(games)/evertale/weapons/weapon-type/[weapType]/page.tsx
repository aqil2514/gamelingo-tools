import { DIV_MAIN_STYLE } from "@/components/Styles";
import CharList from "@/components/Evertale/CharList";
import { Metadata } from "next";
import WeapList from "@/components/Evertale/WeapList";
import List from "@/components/Evertale/List";

type Props = {
  params: { weapType: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { weapType } = params;

  console.log(weapType);

  const firsLetter = weapType.charAt(0).toUpperCase();
  const resLetter = weapType.slice(1);
  const title = firsLetter + resLetter + " Weapons";
  return {
    title,
    description: `Evertale ${title}`,
    metadataBase: new URL("https://gamelingo-tools.vercel.app"),
  };
}

export default async function WeaponType({ params }: any) {
  const { weapType } = params;
  const firsLetter = weapType.charAt(0).toUpperCase();
  const resLetter = weapType.slice(1);

  let query;
  if (weapType === "greatsword") {
    query = "GreatSword";
  } else if (weapType === "greataxe") {
    query = "GreatAxe";
  } else if (weapType !== "greatsword" && weapType !== "greateaxe") {
    query = firsLetter + resLetter;
  }

  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-8"}>
      <List listBy="type" subListBy={query} type="weapons" key={`weapon-${query}`} loadingAnimation textOn text="Loading..." isGrid />
    </div>
  );
}
