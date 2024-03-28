import PostGenshinImpact from "@/components/Game/GenshinImpact/Post";
import { baseUrl } from "@/lib/Data";
import { Post } from "@/models/General/Post";
import { CharacterID } from "@/models/GenshinImpact/Character";
import { Metadata } from "next";

interface ParamsProps {
  params: { id: string };
}

async function getPost(param: string): Promise<General.PostDocument> {
  const data = (await Post.findOne({ content: param }).populate(
    "content"
  )) as General.PostDocument;

  return data;
}

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const post = await getPost(params.id);

  const character: GenshinImpact.CharacterInfo = {
    name: post.content.name,
    desc: post.content.description,
    element: post.content.element,
    rarity: post.content.rarity,
    weapon: post.content.weapon,
    id: post.content._id,
    image: post.content.image.cover,
  };

  return {
    title: character.name + " - Genshin Impact",
    openGraph: {
      title: character.name,
      description: character.desc,
      siteName: "GameLingo Tools",
      images: [
        {
          url: character.image,
          width: 800,
          height: 600,
        },
      ],
      type: "website",
    },
    robots: { index: true },
    authors: { name: post.author, url: baseUrl },
    keywords: [
      character.name,
      character.element,
      character.weapon,
      `${character.rarity} stars`,
      "Genshin Impact",
    ],
  };
}

export default async function DetailCharacter({ params }: ParamsProps) {
  const data = await getPost(params.id);
  console.log(data)

  return <PostGenshinImpact data={data.content} category="Character" />;
}
