import { DIV_MAIN_STYLE } from "@/components/Styles";
import Post from "@/components/Evertale/Post";
import axios from "axios";
import { Metadata } from "next";

type props = {
  params: { UID: string };
};

export async function generateMetadata({ params }: props): Promise<Metadata> {
  try {
    const { UID } = params;
    const isLocal = process.env.NODE_ENV === "development";
    const baseURL = isLocal ? "http://localhost:3000" : "https://gamelingo-tools.vercel.app";
    const ApiURL = `${baseURL}/api/post?UID=${UID}`;

    const response = await axios.get(ApiURL);
    const data = response.data.post.content;

    return {
      title: data.charStatus.charName,
      metadataBase: new URL(baseURL),
      openGraph: {
        title: data.charStatus.charName,
        description: `Information about ${data.charStatus.charName}`,
        siteName: "GameLingo Tools",
        images: [
          {
            url: data.charImage.f1Img,
            width: 800,
            height: 600,
          },
        ],
        type: "website",
      },
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
