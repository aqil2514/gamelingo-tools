import PostGenshinImpact from "@/components/Game/GenshinImpact/Post";
import { baseUrl } from "@/lib/Data";
import { Post } from "@/models/General/Post";
import { redirect } from "@/navigation";
import { sanityClient } from "@/sanity/client";
import { characterPostQuery } from "@/sanity/queries-genshin";
import { Metadata } from "next";
import { getCharacter } from "../../_utils";
import { PostContent } from "./_components";

interface ParamsProps {
  params: {
    slug: string;
    lang: "en" | "id";
  };
}

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const slug = params.slug;
  const post = await getCharacter(slug)

  type CharacterMetadata =  Pick<GenshinImpact.Character, "characterName" | "description" | "element" | "rarity" | "weapon" | "image">

  const character: CharacterMetadata = {
      characterName: post[0].characterName,
      description: post[0].description,
      element: post[0].element,
      rarity: post[0].rarity,
      weapon: post[0].weapon,
      image: post[0].image,
    };

  return {
    title: character.characterName + " - Genshin Impact",
    openGraph: {
      title: character.characterName,
      description: character.description,
      siteName: "GameLingo Tools",
      images: [
        {
          url: character.image.portrait,
          width: 800,
          height: 600,
        },
      ],
      type: "website",
    },
    robots: { index: true },
    authors: { name: "Admin", url: baseUrl },
    keywords: [
      character.characterName,
      character.element,
      character.weapon,
      `${character.rarity} stars`,
      "Genshin Impact",
    ],
  };
}


export default async function DetailCharacter({ params }: ParamsProps) {
  const slug = params.slug;
  const data = await getCharacter(slug);

  return <PostContent data={data[0]} />;
}
