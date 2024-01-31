import { DIV_MAIN_STYLE } from "@/components/Styles";
import { Metadata } from "next";
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

export default async function WeaponType({ params }: Props) {
  const { weapType } = params;
  const firsLetter = weapType.charAt(0).toUpperCase();
  const resLetter = weapType.slice(1);

  let query;
  if (!query) throw new Error("Queri tidak ada");

  if (weapType === "greatsword") query = "GreatSword";
  else if (weapType === "greataxe") query = "GreatAxe";
  else if (weapType !== "greatsword" && weapType !== "greateaxe") query = firsLetter + resLetter;

  return (
    <div className={"main-wrapper py-20 px-8"}>
      <List listBy="type" subListBy={query} type="weapons" key={`weapon-${query}`} loadingAnimation textOn text="Loading..." isGrid />
    </div>
  );
}
