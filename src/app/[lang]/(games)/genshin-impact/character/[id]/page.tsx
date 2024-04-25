import PostGenshinImpact from "@/components/Game/GenshinImpact/Post";
import { baseUrl } from "@/lib/Data";
import GeneralPost, { Post } from "@/models/General/Post";
import GenshinCharacter from "@/models/GenshinImpact/Character";
import { redirect } from "@/navigation";
import { Route } from "next";
import { Metadata } from "next";

interface ParamsProps {
  params: {
    id: string;
    lang: "en" | "id";
  };
}

type Language= ParamsProps["params"]["lang"]; 

interface PostResult{
  data: General.PostDocument,
  post: GenshinImpact.Character
}

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const postData = await getPost(params.id);
  const {data, post} = postData;


  const langData = post[params.lang as Language];

  if(!langData) throw new Error("Terjadi kesalahan saat penentuan bahasa");
  if(!data._id) throw new Error("ID tidak ditemukan");

  const character: GenshinImpact.CharacterInfo = {
    name: data.title,
    desc: langData.description,
    element: langData.element,
    rarity: langData.rarity,
    weapon: langData.weapon,
    id: data._id,
    image: post.image.cover,
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
    authors: { name: data.author, url: baseUrl },
    keywords: [
      character.name,
      character.element,
      character.weapon,
      `${character.rarity} stars`,
      "Genshin Impact",
    ],
  };
}

async function getPost(param: string): Promise<PostResult> {
  const data = await GeneralPost.findOne({ content: param.replaceAll("%20", " ") }) as unknown as General.PostDocument;


  if (!data) {
    throw new Error("Postingan tidak ditemukan.");
  }

  const post = await GenshinCharacter.findOne({name:data.title}) as unknown as GenshinImpact.Character;

  const result:PostResult = {
    data,
    post
  }

  return result;
}

export default async function DetailCharacter({ params }: ParamsProps) {
  const {post, data:metadata} = await getPost(params.id)
  const data = post[params.lang];

  if(!data) throw new Error("Data tidak ditemukan");

  return <PostGenshinImpact data={data} generalInfo={post} category="Character" />;
}
