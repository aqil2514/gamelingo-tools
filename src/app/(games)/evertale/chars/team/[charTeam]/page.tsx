import { DIV_MAIN_STYLE } from "@/components/Styles";
import CharList from "@/components/Evertale/CharList";
import { Metadata } from "next";
import List from "@/components/Evertale/List";

type Props = {
  params: { charTeam: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { charTeam } = params;

  const title = charTeam
    .split("-")
    .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return {
    title,
    description: `Evertale ${title}`,
    metadataBase: new URL("https://gamelingo-tools.vercel.app"),
  };
}

export default async function CharTeam({ params }: any) {
  const { charTeam } = params;

  const query = charTeam
    .split("-")
    .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-8"}>
      <List listBy="team" subListBy={query} type="chars" key={`element-character-${query}`} loadingAnimation textOn text="Loading..." isGrid />
    </div>
  );
}
