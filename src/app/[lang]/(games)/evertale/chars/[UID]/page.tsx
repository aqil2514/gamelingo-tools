import { DIV_MAIN_STYLE } from "@/components/Styles";
import Post from "@/components/Game/Evertale/Post";
import axios from "axios";
import { Metadata } from "next";
import SuggestedPost from "@/components/Game/Evertale/Post/SuggestedPost";
import PostList from "@/components/Game/Evertale/Post/SuggestedPost/PostList";
import { baseUrl } from "@/lib/Data";

type props = {
  params: { UID: string };
};

export async function generateMetadata({ params }: props): Promise<Metadata> {
  try {
    const { UID } = params;
    const ApiURL = `${baseUrl}/api/post?UID=${UID}`;

    const response = await axios.get(ApiURL);
    const data = response.data.post.content;

    return {
      title: data.charStatus.charName,
      metadataBase: new URL(baseUrl),
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

interface ParamsType {
  params: { UID: string };
}

export default function Character({ params }: ParamsType) {
  const { UID } = params;

  return (
    <div className={"main-wrapper py-20"}>
      <Post type="chars" UID={UID} />
      <SuggestedPost grid={3}>
        <PostList UID={UID} category="chars" sort="team" />
        <PostList UID={UID} category="chars" sort="element" />
        <PostList UID={UID} category="chars" sort="newest" />
      </SuggestedPost>
    </div>
  );
}
