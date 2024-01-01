import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import CharList from "@/components/Evertale/CharList";
import { Metadata } from "next";

type Props = {
  params: { charElement: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { charElement } = params;

  const firsLetter = charElement.charAt(0).toUpperCase();
  const resLetter = charElement.slice(1);
  const title = firsLetter + resLetter;

  return {
    title,
    description: `Evertale ${title}`,
  };
}

export default async function charElement({ params }: any) {
  const { charElement } = params;

  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-8"}>
      <CharList listBy="element" subListBy={charElement} loadingAnimation={true} textOn={true} isGrid={true} text="Mengambil Data..." />
    </div>
  );
}
