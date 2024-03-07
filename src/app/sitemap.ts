import { baseUrl } from "@/lib/Data";
import { Post } from "@/models/General/Post";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPost = (await Post.find()) as General.PostDocument[];
  const getUrl = (post: General.PostDocument): string => {
    if (post.game.name === "Evertale" && post.game.topic === "Character") return `${baseUrl}/evertale/chars/${post.content}`;
    else if (post.game.name === "Evertale" && post.game.topic === "Weapon") return `${baseUrl}/evertale/weapons/${post.content}`;

    return baseUrl;
  };
  return [
    ...allPost.map((post) => ({
      url: getUrl(post),
      lastModified: new Date(),
    })),
  ];
}
