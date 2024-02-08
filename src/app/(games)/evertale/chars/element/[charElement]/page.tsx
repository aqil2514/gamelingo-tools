import { DIV_MAIN_STYLE } from "@/components/Styles";
import CharList from "@/components/Evertale/CharList";
import { Metadata } from "next";
import List, { ListState } from "@/components/Evertale/List";

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
    metadataBase: new URL("https://gamelingo-tools.vercel.app"),
  };
}

export default async function charElement({ params }: Props) {
  const { charElement } = params;

  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-8"}>
      <List listBy="element" subListBy={charElement as ListState["subListBy"]} type="chars" key={`element-character-${charElement}`} loadingAnimation textOn text="Loading..." isGrid />
    </div>
  );
}
