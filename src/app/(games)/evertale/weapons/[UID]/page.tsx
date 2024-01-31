import Post from "@/components/Evertale/Post";
import axios from "axios";
import { Metadata } from "next";
import SuggestedPost from "@/components/Evertale/Post/SuggestedPost";
import PostList from "@/components/Evertale/Post/SuggestedPost/PostList";

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
      title: data.weapName,
      metadataBase: new URL(baseURL),
      openGraph: {
        title: data.weapName,
        description: `Information about ${data.weapName}`,
        siteName: "GameLingo Tools",
        images: [
          {
            url: data.weapImage.webp,
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
      title: "Weapon Info",
    };
  }
}

export default function Weapon({ params }: props) {
  const { UID } = params;

  return (
    <div className={"main-wrapper py-20"}>
      <Post type="weapon" UID={UID} />
      <SuggestedPost grid={2}>
        <PostList category="weapons" sort="weapon-type" UID={UID} />
        <PostList category="weapons" sort="newest" UID={UID} />
      </SuggestedPost>
    </div>
  );
}
