import { DIV_MAIN_STYLE } from "@/components/Styles";
import CharList from "@/components/Evertale/CharList";
import { Metadata } from "next";

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
      <CharList listBy="team" subListBy={query} loadingAnimation={true} textOn={true} isGrid={true} text="Mengambil Data..." />
    </div>
  );
}
