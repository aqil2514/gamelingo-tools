import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import Post from "@/components/Evertale/Post";
import axios from "axios";
import { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Info Character",
// };

type props = {
  params: { UID: string };
};

export async function generateMetadata({ params }: props): Promise<Metadata> {
  try {
    const { UID } = params;
    const URL = `http://localhost:3000/api/gamelingo/evertale/chars?UID=${UID}` || `https://gamelingo-tools.vercel.app/api/gamelingo/evertale/chars?UID=${UID}`;

    const response = await axios.get(URL);
    const data = response.data;

    return {
      title: data.character.charStatus.charName,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      title: "Char Info",
    };
  }
}

export default function Character({ params }: any) {
  const { UID } = params;

  return (
    <div className={DIV_MAIN_STYLE + " py-20"}>
      <Post type="chars" UID={UID} />
    </div>
  );
}
