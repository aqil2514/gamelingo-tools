import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import CharList from "@/components/Evertale/CharList";
import { Metadata } from "next";

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
  };
}

export default async function CharWeapon({ params }: any) {
  const { charWeapon } = params;
  const firsLetter = charWeapon.charAt(0).toUpperCase();
  const resLetter = charWeapon.slice(1);

  const query = firsLetter + resLetter;

  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-8"}>
      <CharList listBy="weapon" subListBy={query} loadingAnimation={true} textOn={true} isGrid={true} text="Mengambil Data..." />
    </div>
  );
}
