import { Post } from "@/models/General/Post";
import { MetadataRoute } from "next";

const baseUrl = "https://gamelingo-tools.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPost = (await Post.find()) as General.PostDocument[];
  return [
    ...allPost.map((post) => ({
      url: `${baseUrl}/${post.game.name.toLowerCase().replaceAll(" ", "-")}/${post.game.topic.toLowerCase()}/${post.content}`,
      lastModified: new Date(),
    })),
  ];
}
