import prisma from "@/lib/prisma/prisma";

async function getPost() {
  const post = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return post;
}

export default async function Test() {
  const post = await getPost();
  console.log({ post });
  return (
    <div>
      <h1>Feed</h1>
    </div>
  );
}
